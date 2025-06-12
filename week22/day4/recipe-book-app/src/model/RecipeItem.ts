// RecipeItem.ts - Class representing a single recipe
import { v4 as uuidv4 } from 'uuid';

export interface IRecipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
  createdAt: Date;
}

export class RecipeItem implements IRecipe {
  public readonly id: string;
  public title: string;
  public ingredients: string[];
  public instructions: string;
  public isFavorite: boolean;
  public readonly createdAt: Date;

  constructor(
    title: string,
    ingredients: string[],
    instructions: string,
    isFavorite: boolean = false,
    id?: string,
    createdAt?: Date
  ) {
    this.id = id || uuidv4();
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.isFavorite = isFavorite;
    this.createdAt = createdAt || new Date();
  }

  // Toggle favorite status
  public toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  // Update recipe title
  public updateTitle(newTitle: string): void {
    if (newTitle.trim().length > 0) {
      this.title = newTitle.trim();
    } else {
      throw new Error('Recipe title cannot be empty');
    }
  }

  // Update ingredients list
  public updateIngredients(newIngredients: string[]): void {
    if (newIngredients.length > 0) {
      this.ingredients = newIngredients.filter(ingredient => ingredient.trim().length > 0);
    } else {
      throw new Error('Recipe must have at least one ingredient');
    }
  }

  // Update cooking instructions
  public updateInstructions(newInstructions: string): void {
    if (newInstructions.trim().length > 0) {
      this.instructions = newInstructions.trim();
    } else {
      throw new Error('Recipe instructions cannot be empty');
    }
  }

  // Get formatted ingredients as string
  public getFormattedIngredients(): string {
    return this.ingredients.map((ingredient, index) => 
      `${index + 1}. ${ingredient}`
    ).join('\n');
  }

  // Check if recipe matches search term
  public matchesSearch(searchTerm: string): boolean {
    const term = searchTerm.toLowerCase().trim();
    if (term === '') return true;
    
    return (
      this.title.toLowerCase().includes(term) ||
      this.instructions.toLowerCase().includes(term) ||
      this.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(term)
      )
    );
  }

  // Get recipe summary for display
  public getSummary(): string {
    const ingredientCount = this.ingredients.length;
    const instructionLength = this.instructions.length;
    const favoriteStatus = this.isFavorite ? '⭐' : '';
    
    return `${favoriteStatus} ${this.title} - ${ingredientCount} ingredients, ${instructionLength} chars instructions`;
  }

  // Convert to plain object for JSON serialization
  public toJSON(): object {
    return {
      id: this.id,
      title: this.title,
      ingredients: this.ingredients,
      instructions: this.instructions,
      isFavorite: this.isFavorite,
      createdAt: this.createdAt.toISOString()
    };
  }

  // Create RecipeItem from plain object
  public static fromJSON(data: any): RecipeItem {
    if (!data.id || !data.title || !data.ingredients || !data.instructions) {
      throw new Error('Invalid recipe data for deserialization');
    }

    return new RecipeItem(
      data.title,
      data.ingredients,
      data.instructions,
      data.isFavorite || false,
      data.id,
      data.createdAt ? new Date(data.createdAt) : new Date()
    );
  }

  // Validate recipe data
  public static validateRecipeData(title: string, ingredients: string[], instructions: string): boolean {
    return (
      title.trim().length > 0 &&
      ingredients.length > 0 &&
      ingredients.every(ingredient => ingredient.trim().length > 0) &&
      instructions.trim().length > 0
    );
  }

  // Create recipe with validation
  public static createValidatedRecipe(
    title: string, 
    ingredients: string[], 
    instructions: string
  ): RecipeItem {
    if (!this.validateRecipeData(title, ingredients, instructions)) {
      throw new Error('Invalid recipe data: title, ingredients, and instructions are required');
    }

    const cleanedIngredients = ingredients
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0);

    return new RecipeItem(title.trim(), cleanedIngredients, instructions.trim());
  }
}