import RecipeCollection from './model/RecipeCollection'
import RecipeItem from './model/RecipeItem'
import RecipeTemplate from './templates/RecipeTemplate'
import './style.css'

function getElement<T extends HTMLElement>(
  id: string,
  constructor: { new (...args: never[]): T },
): T {
  const element = document.getElementById(id)

  if (!(element instanceof constructor)) {
    throw new Error(`Expected #${id} to be a ${constructor.name}.`)
  }

  return element
}

const form = getElement('recipeEntryForm', HTMLFormElement)
const titleInput = getElement('recipeTitle', HTMLInputElement)
const ingredientsInput = getElement('ingredients', HTMLTextAreaElement)
const instructionsInput = getElement('instructions', HTMLTextAreaElement)
const recipeContainer = getElement('recipeContainer', HTMLDivElement)
const clearRecipesButton = getElement('clearRecipesButton', HTMLButtonElement)
const appMessage = getElement('appMessage', HTMLParagraphElement)

const collection = new RecipeCollection(window.localStorage)
const template = new RecipeTemplate(recipeContainer, {
  onToggleFavorite: (id) => runCollectionAction(() => collection.toggleFavorite(id)),
  onDelete: (id) => runCollectionAction(() => collection.removeRecipe(id)),
})

function showMessage(message: string, isError = false): void {
  appMessage.textContent = message
  appMessage.classList.toggle('message-error', isError)
}

function renderRecipes(): void {
  template.render(collection.getRecipes())
}

function runCollectionAction(action: () => void): void {
  try {
    action()
    renderRecipes()
    showMessage('')
  } catch (error) {
    showMessage(
      error instanceof Error ? error.message : 'The recipe book could not be updated.',
      true,
    )
  }
}

try {
  collection.loadFromLocalStorage()
} catch (error) {
  showMessage(
    error instanceof Error ? error.message : 'Saved recipes could not be loaded.',
    true,
  )
}
renderRecipes()

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const title = titleInput.value.trim()
  const ingredients = ingredientsInput.value
    .split(/\r?\n/)
    .map((ingredient) => ingredient.trim())
    .filter(Boolean)
  const instructions = instructionsInput.value.trim()

  if (!title || ingredients.length === 0 || !instructions) {
    showMessage('Add a title, at least one ingredient, and instructions.', true)
    return
  }

  runCollectionAction(() => {
    collection.addRecipe(new RecipeItem({ title, ingredients, instructions }))
    form.reset()
    showMessage('Recipe added to your book.')
  })
})

clearRecipesButton.addEventListener('click', () => {
  if (collection.getRecipes().length === 0) {
    showMessage('Your recipe book is already empty.')
    return
  }

  runCollectionAction(() => {
    collection.clearRecipes()
    showMessage('All recipes cleared.')
  })
})
