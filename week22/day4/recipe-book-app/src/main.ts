// main.ts - Application bootstrap and initialization
import './style.css';
import { RecipeCollection } from './model/RecipeCollection';
import { RecipeTemplate } from './templates/RecipeTemplate';

// Application class to manage the entire recipe book application
class RecipeBookApp {
  private recipeCollection: RecipeCollection;
  private recipeTemplate!: RecipeTemplate;

  constructor() {
    this.recipeCollection = new RecipeCollection();
    this.initializeApp();
  }

  // Initialize the application
  private initializeApp(): void {
    this.setupDOM();
    this.recipeTemplate = new RecipeTemplate(this.recipeCollection);
    this.setupGlobalEventListeners();
    this.displayWelcomeMessage();
  }

  // Setup the DOM structure
  private setupDOM(): void {
    const app = document.querySelector<HTMLDivElement>('#app')!;
    
    app.innerHTML = `
      <div class="recipe-book-container">
        <!-- Header Section -->
        <header class="app-header">
          <h1>🍳 Recipe Book</h1>
          <p>Organize, save, and discover your favorite recipes</p>
        </header>

        <!-- Statistics Section -->
        <section class="stats-section">
          <div class="stat-card">
            <div class="stat-number" id="total-recipes-count">0</div>
            <div class="stat-label">Total Recipes</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" id="favorite-recipes-count">0</div>
            <div class="stat-label">Favorites</div>
          </div>
        </section>

        <!-- Add Recipe Section -->
        <section class="add-recipe-section">
          <h2>Add New Recipe</h2>
          <form id="recipe-form" class="recipe-form">
            <div class="form-group">
              <label for="recipe-title">Recipe Title *</label>
              <input 
                type="text" 
                id="recipe-title" 
                name="title" 
                placeholder="Enter recipe title..." 
                required
                maxlength="100"
              >
            </div>
            
            <div class="form-group">
              <label for="recipe-ingredients">Ingredients * (one per line)</label>
              <textarea 
                id="recipe-ingredients" 
                name="ingredients" 
                placeholder="Enter ingredients, one per line...&#10;Example:&#10;2 cups flour&#10;1 cup sugar&#10;3 eggs"
                required
                rows="6"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="recipe-instructions">Instructions *</label>
              <textarea 
                id="recipe-instructions" 
                name="instructions" 
                placeholder="Enter cooking instructions..."
                required
                rows="6"
              ></textarea>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">
                <span class="btn-icon">➕</span>
                Add Recipe
              </button>
              <button type="reset" class="btn btn-secondary">
                <span class="btn-icon">🔄</span>
                Clear Form
              </button>
            </div>
          </form>
        </section>

        <!-- Search and Filter Section -->
        <section class="search-filter-section">
          <div class="search-container">
            <div class="search-input-container">
              <input 
                type="text" 
                id="search-input" 
                placeholder="Search recipes by title, ingredients, or instructions..."
                class="search-input"
              >
              <button id="clear-search" class="clear-search-btn" title="Clear search">
                ✕
              </button>
            </div>
          </div>
          
          <div class="filter-container">
            <button id="show-all" class="filter-btn active">
              <span class="btn-icon">📖</span>
              All Recipes
            </button>
            <button id="show-favorites" class="filter-btn">
              <span class="btn-icon">⭐</span>
              Favorites Only
            </button>
          </div>
        </section>

        <!-- Recipe List Section -->
        <section class="recipe-list-section">
          <div class="section-header">
            <h2>Your Recipe Collection</h2>
            <div class="utility-actions">
              <button id="add-sample-recipes" class="btn btn-outline">
                <span class="btn-icon">🎲</span>
                Add Sample Recipes
              </button>
              <button id="export-recipes" class="btn btn-outline">
                <span class="btn-icon">📥</span>
                Export Recipes
              </button>
              <button id="clear-all-recipes" class="btn btn-danger-outline">
                <span class="btn-icon">🗑️</span>
                Clear All
              </button>
            </div>
          </div>
          
          <div id="recipe-list" class="recipe-list">
            <!-- Recipes will be rendered here by RecipeTemplate -->
          </div>
        </section>

        <!-- Footer Section -->
        <footer class="app-footer">
          <div class="footer-content">
            <p>Recipe Book App - Built with TypeScript & Vite</p>
            <p class="footer-features">
              🔍 Search & Filter | ⭐ Favorites | 💾 Local Storage | 📥 Export/Import
            </p>
          </div>
        </footer>
      </div>
    `;
  }

  // Setup global event listeners
  private setupGlobalEventListeners(): void {
    // Form reset handler
    const form = document.getElementById('recipe-form') as HTMLFormElement;
    if (form) {
      form.addEventListener('reset', () => {
        setTimeout(() => {
          this.showNotification('Form cleared!', 'info');
        }, 100);
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Ctrl/Cmd + N to focus new recipe title
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        const titleInput = document.getElementById('recipe-title') as HTMLInputElement;
        if (titleInput) {
          titleInput.focus();
        }
      }
    });

    // File import functionality (drag and drop)
    this.setupFileImport();

    // Window unload warning if there are unsaved changes
    window.addEventListener('beforeunload', (e) => {
      const form = document.getElementById('recipe-form') as HTMLFormElement;
      if (form && this.hasUnsavedChanges(form)) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    });
  }

  // Setup file import via drag and drop
  private setupFileImport(): void {
    const app = document.querySelector('#app')!;

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      app.addEventListener(eventName, this.preventDefaults, false);
      document.body.addEventListener(eventName, this.preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
      app.addEventListener(eventName, () => {
        app.classList.add('drag-highlight');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      app.addEventListener(eventName, () => {
        app.classList.remove('drag-highlight');
      }, false);
    });

    // Handle dropped files
    app.addEventListener('drop', (e) => {
      const dt = (e as DragEvent).dataTransfer;
      const files = dt?.files;

      if (files && files.length > 0) {
        this.handleFileImport(files[0]);
      }
    }, false);
  }

  // Prevent default drag behaviors
  private preventDefaults(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }

  // Handle file import
  private handleFileImport(file: File): void {
    if (file.type !== 'application/json') {
      this.showNotification('Please drop a JSON file.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonString = e.target?.result as string;
        const result = this.recipeCollection.importFromJSON(jsonString);
        
        if (result.success) {
          this.recipeTemplate.render();
          this.showNotification(
            `Successfully imported ${result.importedCount} recipe(s)!`, 
            'success'
          );
          
          if (result.errors.length > 0) {
            console.warn('Import warnings:', result.errors);
          }
        } else {
          this.showNotification(
            `Import failed: ${result.errors.join(', ')}`, 
            'error'
          );
        }
      } catch (error) {
        this.showNotification('Failed to read file.', 'error');
      }
    };

    reader.readAsText(file);
  }

  // Check if form has unsaved changes
  private hasUnsavedChanges(form: HTMLFormElement): boolean {
    const formData = new FormData(form);
    for (const [, value] of formData.entries()) {
      if (value.toString().trim().length > 0) {
        return true;
      }
    }
    return false;
  }

  // Show notification (delegated to RecipeTemplate for consistency)
  private showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    // Create a temporary notification since RecipeTemplate's method is private
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);

    notification.addEventListener('click', () => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    });
  }

  // Display welcome message for first-time users
  private displayWelcomeMessage(): void {
    if (this.recipeCollection.getRecipeCount() === 0) {
      setTimeout(() => {
        this.showNotification(
          'Welcome to Recipe Book! Add your first recipe or try some sample recipes.', 
          'info'
        );
      }, 1000);
    }
  }

  // Public method to get recipe collection (for debugging)
  public getRecipeCollection(): RecipeCollection {
    return this.recipeCollection;
  }

  // Public method to get recipe template (for debugging)
  public getRecipeTemplate(): RecipeTemplate {
    return this.recipeTemplate;
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new RecipeBookApp();
  
  // Make app available globally for debugging in development
  if (import.meta.env.DEV) {
    (window as any).recipeBookApp = app;
    console.log('Recipe Book App initialized! Access via window.recipeBookApp for debugging.');
  }
});

// Export for potential external usage
export { RecipeBookApp };
