import RecipeItem from '../model/RecipeItem'

interface RecipeTemplateActions {
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
}

export default class RecipeTemplate {
  constructor(
    private readonly container: HTMLElement,
    private readonly actions: RecipeTemplateActions,
  ) {
    this.container.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) {
        return
      }

      const button = event.target.closest<HTMLButtonElement>('button[data-action]')
      const id = button?.dataset.recipeId
      const action = button?.dataset.action

      if (!id) {
        return
      }

      if (action === 'favorite') {
        this.actions.onToggleFavorite(id)
      } else if (action === 'delete') {
        this.actions.onDelete(id)
      }
    })
  }

  render(recipes: RecipeItem[]): void {
    const fragment = document.createDocumentFragment()

    if (recipes.length === 0) {
      const emptyState = document.createElement('p')
      emptyState.className = 'empty-state'
      emptyState.textContent = 'Your recipe book is ready for its first favorite.'
      fragment.append(emptyState)
    } else {
      for (const recipe of recipes) {
        fragment.append(this.createRecipeCard(recipe))
      }
    }

    this.container.replaceChildren(fragment)
  }

  private createRecipeCard(recipe: RecipeItem): HTMLElement {
    const card = document.createElement('article')
    card.className = 'recipe-card'
    card.dataset.favorite = String(recipe.isFavorite)

    const topLine = document.createElement('div')
    topLine.className = 'recipe-card-topline'

    const category = document.createElement('span')
    category.className = 'recipe-label'
    category.textContent = recipe.isFavorite ? 'A favorite' : 'From your kitchen'

    const title = document.createElement('h3')
    title.className = 'recipe-title'
    title.textContent = recipe.title

    const details = document.createElement('details')
    details.className = 'recipe-details'

    const summary = document.createElement('summary')
    summary.textContent = 'Ingredients & instructions'

    const ingredientsHeading = document.createElement('h4')
    ingredientsHeading.textContent = 'Ingredients'

    const ingredientsList = document.createElement('ul')
    ingredientsList.className = 'ingredient-list'
    for (const ingredient of recipe.ingredients) {
      const item = document.createElement('li')
      item.textContent = ingredient
      ingredientsList.append(item)
    }

    const instructionsHeading = document.createElement('h4')
    instructionsHeading.textContent = 'Instructions'

    const instructions = document.createElement('p')
    instructions.className = 'recipe-instructions'
    instructions.textContent = recipe.instructions

    details.append(summary, ingredientsHeading, ingredientsList, instructionsHeading, instructions)

    const actions = document.createElement('div')
    actions.className = 'recipe-actions'

    const favoriteButton = document.createElement('button')
    favoriteButton.type = 'button'
    favoriteButton.className = 'button button-favorite'
    favoriteButton.dataset.action = 'favorite'
    favoriteButton.dataset.recipeId = recipe.id
    favoriteButton.setAttribute('aria-pressed', String(recipe.isFavorite))
    favoriteButton.textContent = recipe.isFavorite ? '♥ Favorite' : '♡ Add favorite'

    const deleteButton = document.createElement('button')
    deleteButton.type = 'button'
    deleteButton.className = 'button button-delete'
    deleteButton.dataset.action = 'delete'
    deleteButton.dataset.recipeId = recipe.id
    deleteButton.textContent = 'Delete'

    topLine.append(category)
    card.append(topLine, title, details)
    actions.append(favoriteButton, deleteButton)
    card.append(actions)

    return card
  }
}
