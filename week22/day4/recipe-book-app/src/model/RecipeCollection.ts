// RecipeCollection.ts - Class managing all recipes
import { RecipeItem } from './RecipeItem';

export class RecipeCollection {
  private recipes: RecipeItem[] = [];
  private readonly STORAGE_KEY = 'recipe-book-collection';

  constructor() {
    this.loadFromStorage();
  }

  // Add new recipe to collection
  public addRecipe(recipe: RecipeItem): void {
    this.recipes.push(recipe);
    this.saveToStorage();
  }

  // Remove recipe by ID
  public removeRecipe(id: string): boolean {
    const initialLength = this.recipes.length;
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    
    if (this.recipes.length < initialLength) {
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Toggle favorite status of recipe by ID
  public toggleFavorite(id: string): boolean {
    const recipe = this.recipes.find(recipe => recipe.id === id);
    if (recipe) {
      recipe.toggleFavorite();
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Get all recipes
  public getAllRecipes(): RecipeItem[] {
    return [...this.recipes];
  }

  // Get recipe by ID
  public getRecipeById(id: string): RecipeItem | undefined {
    return this.recipes.find(recipe => recipe.id === id);
  }

  // Get favorite recipes only
  public getFavoriteRecipes(): RecipeItem[] {
    return this.recipes.filter(recipe => recipe.isFavorite);
  }

  // Search recipes by term
  public searchRecipes(searchTerm: string): RecipeItem[] {
    if (!searchTerm.trim()) {
      return this.getAllRecipes();
    }
    
    return this.recipes.filter(recipe => recipe.matchesSearch(searchTerm));
  }

  // Get total count of recipes
  public getRecipeCount(): number {
    return this.recipes.length;
  }

  // Get count of favorite recipes
  public getFavoriteCount(): number {
    return this.recipes.filter(recipe => recipe.isFavorite).length;
  }

  // Clear all recipes
  public clearAll(): void {
    this.recipes = [];
    this.saveToStorage();
  }

  // Update existing recipe
  public updateRecipe(id: string, updatedData: Partial<Pick<RecipeItem, 'title' | 'ingredients' | 'instructions'>>): boolean {
    const recipe = this.recipes.find(recipe => recipe.id === id);
    if (!recipe) {
      return false;
    }

    try {
      if (updatedData.title !== undefined) {
        recipe.updateTitle(updatedData.title);
      }
      if (updatedData.ingredients !== undefined) {
        recipe.updateIngredients(updatedData.ingredients);
      }
      if (updatedData.instructions !== undefined) {
        recipe.updateInstructions(updatedData.instructions);
      }
      
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error('Failed to update recipe:', error);
      return false;
    }
  }

  // Sort recipes by different criteria
  public sortRecipes(sortBy: 'title' | 'createdAt' | 'favorite', ascending: boolean = true): RecipeItem[] {
    const sorted = [...this.recipes].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'createdAt':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'favorite':
          comparison = (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
          break;
        default:
          return 0;
      }
      
      return ascending ? comparison : -comparison;
    });
    
    return sorted;
  }

  // Get recipe statistics
  public getStatistics(): {
    totalRecipes: number;
    favoriteRecipes: number;
    averageIngredientsPerRecipe: number;
    totalIngredients: number;
    mostRecentRecipe: RecipeItem | null;
    oldestRecipe: RecipeItem | null;
  } {
    const totalRecipes = this.recipes.length;
    const favoriteRecipes = this.getFavoriteCount();
    const totalIngredients = this.recipes.reduce((sum, recipe) => sum + recipe.ingredients.length, 0);
    const averageIngredientsPerRecipe = totalRecipes > 0 ? Math.round((totalIngredients / totalRecipes) * 10) / 10 : 0;
    
    const sortedByDate = this.sortRecipes('createdAt', false);
    const mostRecentRecipe = sortedByDate.length > 0 ? sortedByDate[0] : null;
    const oldestRecipe = sortedByDate.length > 0 ? sortedByDate[sortedByDate.length - 1] : null;

    return {
      totalRecipes,
      favoriteRecipes,
      averageIngredientsPerRecipe,
      totalIngredients,
      mostRecentRecipe,
      oldestRecipe
    };
  }

  // Export recipes to JSON string
  public exportToJSON(): string {
    const exportData = {
      exportDate: new Date().toISOString(),
      recipeCount: this.recipes.length,
      recipes: this.recipes.map(recipe => recipe.toJSON())
    };
    
    return JSON.stringify(exportData, null, 2);
  }

  // Import recipes from JSON string
  public importFromJSON(jsonString: string): { success: boolean; importedCount: number; errors: string[] } {
    const result = {
      success: false,
      importedCount: 0,
      errors: [] as string[]
    };

    try {
      const data = JSON.parse(jsonString);
      
      if (!data.recipes || !Array.isArray(data.recipes)) {
        result.errors.push('Invalid JSON format: recipes array not found');
        return result;
      }

      const importedRecipes: RecipeItem[] = [];
      
      for (let i = 0; i < data.recipes.length; i++) {
        try {
          const recipe = RecipeItem.fromJSON(data.recipes[i]);
          importedRecipes.push(recipe);
          result.importedCount++;
        } catch (error) {
          result.errors.push(`Recipe ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      // Add successfully imported recipes to collection
      importedRecipes.forEach(recipe => this.recipes.push(recipe));
      this.saveToStorage();
      
      result.success = result.importedCount > 0;
      
    } catch (error) {
      result.errors.push(`JSON parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  // Save recipes to localStorage
  private saveToStorage(): void {
    try {
      const data = this.recipes.map(recipe => recipe.toJSON());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save recipes to localStorage:', error);
    }
  }

  // Load recipes from localStorage
  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const recipeData = JSON.parse(data);
        if (Array.isArray(recipeData)) {
          this.recipes = recipeData
            .map(item => {
              try {
                return RecipeItem.fromJSON(item);
              } catch (error) {
                console.warn('Failed to load recipe from storage:', error);
                return null;
              }
            })
            .filter((recipe): recipe is RecipeItem => recipe !== null);
        }
      }
    } catch (error) {
      console.error('Failed to load recipes from localStorage:', error);
      this.recipes = [];
    }
  }

  // Create sample recipes for demonstration
  public addSampleRecipes(): void {
    const sampleRecipes = [
      RecipeItem.createValidatedRecipe(
        'Classic Chocolate Chip Cookies',
        [
          '2 1/4 cups all-purpose flour',
          '1 tsp baking soda',
          '1 tsp salt',
          '1 cup butter, softened',
          '3/4 cup granulated sugar',
          '3/4 cup brown sugar',
          '2 large eggs',
          '2 tsp vanilla extract',
          '2 cups chocolate chips'
        ],
        'Preheat oven to 375°F. Mix dry ingredients in a bowl. In another bowl, cream butter and sugars. Add eggs and vanilla. Combine wet and dry ingredients, fold in chocolate chips. Drop spoonfuls on baking sheet. Bake 9-11 minutes until golden brown.'
      ),
      RecipeItem.createValidatedRecipe(
        'Simple Pasta Carbonara',
        [
          '400g spaghetti',
          '200g pancetta or bacon',
          '4 large eggs',
          '100g Pecorino Romano cheese, grated',
          '2 cloves garlic',
          'Black pepper',
          'Salt'
        ],
        'Cook pasta according to package directions. Fry pancetta until crispy. Whisk eggs with cheese and black pepper. Drain pasta, reserving pasta water. Toss hot pasta with pancetta, remove from heat. Add egg mixture, tossing quickly. Add pasta water if needed. Serve immediately.'
      ),
      RecipeItem.createValidatedRecipe(
        'Fresh Garden Salad',
        [
          '4 cups mixed greens',
          '1 cucumber, sliced',
          '2 tomatoes, chopped',
          '1/2 red onion, thinly sliced',
          '1/4 cup olive oil',
          '2 tbsp balsamic vinegar',
          'Salt and pepper to taste',
          '1/4 cup feta cheese (optional)'
        ],
        'Wash and dry all vegetables. Combine greens, cucumber, tomatoes, and onion in a large bowl. Whisk together olive oil, balsamic vinegar, salt, and pepper. Drizzle dressing over salad and toss. Top with feta cheese if desired. Serve immediately.'
      )
    ];

    sampleRecipes.forEach(recipe => {
      if (Math.random() > 0.5) {
        recipe.toggleFavorite();
      }
    });

    sampleRecipes.forEach(recipe => this.addRecipe(recipe));
  }
}