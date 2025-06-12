// RecipeTemplate.ts - Handles DOM rendering and UI management
import { RecipeItem } from '../model/RecipeItem';
import { RecipeCollection } from '../model/RecipeCollection';

export class RecipeTemplate {
  private recipeCollection: RecipeCollection;
  private currentFilter: 'all' | 'favorites' = 'all';
  private currentSearchTerm: string = '';

  constructor(recipeCollection: RecipeCollection) {
    this.recipeCollection = recipeCollection;
    this.initializeEventListeners();
    this.render();
  }

  // Initialize all event listeners
  private initializeEventListeners(): void {
    this.setupFormSubmission();
    this.setupSearchFunctionality();
    this.setupFilterButtons();
    this.setupUtilityButtons();
  }

  // Setup form submission for adding new recipes
  private setupFormSubmission(): void {
    const form = document.getElementById('recipe-form') as HTMLFormElement;
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddRecipe();
    });
  }

  // Setup search functionality
  private setupSearchFunctionality(): void {
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (!searchInput) return;

    let searchTimeout: number;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = window.setTimeout(() => {
        this.currentSearchTerm = (e.target as HTMLInputElement).value;
        this.renderRecipeList();
      }, 300);
    });

    const clearSearchBtn = document.getElementById('clear-search');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        this.currentSearchTerm = '';
        this.renderRecipeList();
      });
    }
  }

  // Setup filter buttons
  private setupFilterButtons(): void {
    const showAllBtn = document.getElementById('show-all');
    const showFavoritesBtn = document.getElementById('show-favorites');

    if (showAllBtn) {
      showAllBtn.addEventListener('click', () => {
        this.currentFilter = 'all';
        this.updateFilterButtons();
        this.renderRecipeList();
      });
    }

    if (showFavoritesBtn) {
      showFavoritesBtn.addEventListener('click', () => {
        this.currentFilter = 'favorites';
        this.updateFilterButtons();
        this.renderRecipeList();
      });
    }
  }

  // Setup utility buttons
  private setupUtilityButtons(): void {
    const addSampleBtn = document.getElementById('add-sample-recipes');
    const clearAllBtn = document.getElementById('clear-all-recipes');
    const exportBtn = document.getElementById('export-recipes');

    if (addSampleBtn) {
      addSampleBtn.addEventListener('click', () => {
        this.recipeCollection.addSampleRecipes();
        this.render();
        this.showNotification('Sample recipes added successfully!', 'success');
      });
    }

    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all recipes? This action cannot be undone.')) {
          this.recipeCollection.clearAll();
          this.render();
          this.showNotification('All recipes have been deleted.', 'info');
        }
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.exportRecipes();
      });
    }
  }

  // Handle adding new recipe from form
  private handleAddRecipe(): void {
    const titleInput = document.getElementById('recipe-title') as HTMLInputElement;
    const ingredientsInput = document.getElementById('recipe-ingredients') as HTMLTextAreaElement;
    const instructionsInput = document.getElementById('recipe-instructions') as HTMLTextAreaElement;

    if (!titleInput || !ingredientsInput || !instructionsInput) {
      this.showNotification('Form elements not found!', 'error');
      return;
    }

    const title = titleInput.value.trim();
    const ingredientsText = ingredientsInput.value.trim();
    const instructions = instructionsInput.value.trim();

    if (!title || !ingredientsText || !instructions) {
      this.showNotification('Please fill in all fields.', 'error');
      return;
    }

    // Parse ingredients (split by newlines and filter empty lines)
    const ingredients = ingredientsText
      .split('\n')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0);

    if (ingredients.length === 0) {
      this.showNotification('Please add at least one ingredient.', 'error');
      return;
    }

    try {
      const newRecipe = RecipeItem.createValidatedRecipe(title, ingredients, instructions);
      this.recipeCollection.addRecipe(newRecipe);
      
      // Clear form
      titleInput.value = '';
      ingredientsInput.value = '';
      instructionsInput.value = '';
      
      this.render();
      this.showNotification('Recipe added successfully!', 'success');
    } catch (error) {
      this.showNotification(error instanceof Error ? error.message : 'Failed to add recipe', 'error');
    }
  }

  // Get filtered recipes based on current filter and search
  private getFilteredRecipes(): RecipeItem[] {
    let recipes: RecipeItem[];
    
    if (this.currentFilter === 'favorites') {
      recipes = this.recipeCollection.getFavoriteRecipes();
    } else {
      recipes = this.recipeCollection.getAllRecipes();
    }

    if (this.currentSearchTerm) {
      recipes = recipes.filter(recipe => recipe.matchesSearch(this.currentSearchTerm));
    }

    return recipes;
  }

  // Update filter button states
  private updateFilterButtons(): void {
    const showAllBtn = document.getElementById('show-all');
    const showFavoritesBtn = document.getElementById('show-favorites');

    if (showAllBtn && showFavoritesBtn) {
      showAllBtn.classList.toggle('active', this.currentFilter === 'all');
      showFavoritesBtn.classList.toggle('active', this.currentFilter === 'favorites');
    }
  }

  // Render the entire application
  public render(): void {
    this.renderStats();
    this.renderRecipeList();
    this.updateFilterButtons();
  }

  // Render statistics
  private renderStats(): void {
    const stats = this.recipeCollection.getStatistics();
    
    const totalCountElement = document.getElementById('total-recipes-count');
    const favoriteCountElement = document.getElementById('favorite-recipes-count');

    if (totalCountElement) {
      totalCountElement.textContent = stats.totalRecipes.toString();
    }

    if (favoriteCountElement) {
      favoriteCountElement.textContent = stats.favoriteRecipes.toString();
    }
  }

  // Render recipe list
  private renderRecipeList(): void {
    const recipeListContainer = document.getElementById('recipe-list');
    if (!recipeListContainer) return;

    const recipes = this.getFilteredRecipes();

    if (recipes.length === 0) {
      recipeListContainer.innerHTML = this.renderEmptyState();
      return;
    }

    recipeListContainer.innerHTML = recipes
      .map(recipe => this.renderRecipeCard(recipe))
      .join('');

    // Add event listeners to recipe cards
    this.attachRecipeCardListeners();
  }

  // Render empty state
  private renderEmptyState(): string {
    const message = this.currentFilter === 'favorites' 
      ? 'No favorite recipes found.' 
      : this.currentSearchTerm 
        ? `No recipes found for "${this.currentSearchTerm}".`
        : 'No recipes yet. Add your first recipe above!';

    return `
      <div class="empty-state">
        <div class="empty-icon">🍽️</div>
        <h3>No Recipes Found</h3>
        <p>${message}</p>
        ${this.recipeCollection.getRecipeCount() === 0 ? 
          '<button id="add-sample-recipes-empty" class="btn btn-primary">Add Sample Recipes</button>' : 
          ''
        }
      </div>
    `;
  }

  // Render individual recipe card
  private renderRecipeCard(recipe: RecipeItem): string {
    const favoriteIcon = recipe.isFavorite ? '⭐' : '☆';
    const favoriteClass = recipe.isFavorite ? 'favorite' : '';
    
    return `
      <div class="recipe-card ${favoriteClass}" data-recipe-id="${recipe.id}">
        <div class="recipe-header">
          <h3 class="recipe-title">${this.escapeHtml(recipe.title)}</h3>
          <button class="favorite-btn" data-recipe-id="${recipe.id}" title="Toggle favorite">
            ${favoriteIcon}
          </button>
        </div>
        
        <div class="recipe-body">
          <div class="recipe-meta">
            <span class="ingredient-count">${recipe.ingredients.length} ingredients</span>
            <span class="created-date">${this.formatDate(recipe.createdAt)}</span>
          </div>
          
          <div class="recipe-content">
            <div class="ingredients-section">
              <h4>Ingredients:</h4>
              <ul class="ingredients-list">
                ${recipe.ingredients.map(ingredient => 
                  `<li>${this.escapeHtml(ingredient)}</li>`
                ).join('')}
              </ul>
            </div>
            
            <div class="instructions-section">
              <h4>Instructions:</h4>
              <p class="instructions-text">${this.escapeHtml(recipe.instructions)}</p>
            </div>
          </div>
        </div>
        
        <div class="recipe-actions">
          <button class="btn btn-secondary view-btn" data-recipe-id="${recipe.id}">
            View Details
          </button>
          <button class="btn btn-danger delete-btn" data-recipe-id="${recipe.id}">
            Delete
          </button>
        </div>
      </div>
    `;
  }

  // Attach event listeners to recipe cards
  private attachRecipeCardListeners(): void {
    // Favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const recipeId = (e.target as HTMLElement).dataset.recipeId;
        if (recipeId) {
          this.recipeCollection.toggleFavorite(recipeId);
          this.render();
          this.showNotification('Recipe favorite status updated!', 'success');
        }
      });
    });

    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const recipeId = (e.target as HTMLElement).dataset.recipeId;
        if (recipeId && confirm('Are you sure you want to delete this recipe?')) {
          const recipe = this.recipeCollection.getRecipeById(recipeId);
          const recipeName = recipe ? recipe.title : 'Recipe';
          
          if (this.recipeCollection.removeRecipe(recipeId)) {
            this.render();
            this.showNotification(`"${recipeName}" has been deleted.`, 'info');
          }
        }
      });
    });

    // View details buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const recipeId = (e.target as HTMLElement).dataset.recipeId;
        if (recipeId) {
          this.showRecipeDetails(recipeId);
        }
      });
    });

    // Add sample recipes button in empty state
    const addSampleEmptyBtn = document.getElementById('add-sample-recipes-empty');
    if (addSampleEmptyBtn) {
      addSampleEmptyBtn.addEventListener('click', () => {
        this.recipeCollection.addSampleRecipes();
        this.render();
        this.showNotification('Sample recipes added successfully!', 'success');
      });
    }
  }

  // Show recipe details in modal or expanded view
  private showRecipeDetails(recipeId: string): void {
    const recipe = this.recipeCollection.getRecipeById(recipeId);
    if (!recipe) return;

    const modal = this.createModal(`
      <div class="recipe-details">
        <h2>${this.escapeHtml(recipe.title)} ${recipe.isFavorite ? '⭐' : ''}</h2>
        
        <div class="recipe-meta-details">
          <p><strong>Created:</strong> ${this.formatDate(recipe.createdAt)}</p>
          <p><strong>Recipe ID:</strong> ${recipe.id}</p>
          <p><strong>Ingredients Count:</strong> ${recipe.ingredients.length}</p>
        </div>
        
        <div class="ingredients-detail">
          <h3>Ingredients:</h3>
          <div class="formatted-ingredients">
            ${recipe.getFormattedIngredients().split('\n').map(line => 
              `<div class="ingredient-line">${this.escapeHtml(line)}</div>`
            ).join('')}
          </div>
        </div>
        
        <div class="instructions-detail">
          <h3>Instructions:</h3>
          <div class="instructions-content">
            ${this.escapeHtml(recipe.instructions).split('\n').map(paragraph => 
              `<p>${paragraph}</p>`
            ).join('')}
          </div>
        </div>
        
        <div class="recipe-actions-modal">
          <button class="btn btn-primary toggle-favorite-modal" data-recipe-id="${recipe.id}">
            ${recipe.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          <button class="btn btn-secondary close-modal">Close</button>
        </div>
      </div>
    `);

    // Add event listeners for modal actions
    const toggleFavoriteBtn = modal.querySelector('.toggle-favorite-modal');
    if (toggleFavoriteBtn) {
      toggleFavoriteBtn.addEventListener('click', () => {
        this.recipeCollection.toggleFavorite(recipeId);
        this.render();
        this.closeModal();
        this.showNotification('Recipe favorite status updated!', 'success');
      });
    }
  }

  // Export recipes to downloadable JSON file
  private exportRecipes(): void {
    try {
      const jsonData = this.recipeCollection.exportToJSON();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `recipe-book-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      this.showNotification('Recipes exported successfully!', 'success');
    } catch (error) {
      this.showNotification('Failed to export recipes.', 'error');
    }
  }

  // Create modal for detailed views
  private createModal(content: string): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        ${content}
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    // Close modal on close button click
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeModal();
      });
    }

    // Close modal on Escape key
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.closeModal();
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);

    return modal;
  }

  // Close modal
  private closeModal(): void {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      document.body.removeChild(modal);
    }
  }

  // Show notification messages
  private showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);

    // Remove on click
    notification.addEventListener('click', () => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    });
  }

  // Utility function to escape HTML
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Utility function to format dates
  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}