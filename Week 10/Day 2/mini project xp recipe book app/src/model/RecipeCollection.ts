import RecipeItem from './RecipeItem'

const STORAGE_KEY = 'gather-recipe-book-v1'

export default class RecipeCollection {
  private recipes: RecipeItem[] = []

  constructor(private readonly storage: Storage) {}

  getRecipes(): RecipeItem[] {
    return [...this.recipes]
  }

  loadFromLocalStorage(): RecipeItem[] {
    const serializedRecipes = this.storage.getItem(STORAGE_KEY)

    if (serializedRecipes === null) {
      this.recipes = []
      return this.getRecipes()
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(serializedRecipes)
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error)
      throw new Error(`Saved recipes could not be parsed: ${detail}`)
    }

    if (!Array.isArray(parsed)) {
      throw new Error('Saved recipes must be a list.')
    }

    try {
      this.recipes = parsed.map((recipe) => RecipeItem.fromJSON(recipe))
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error)
      throw new Error(`Saved recipes are invalid: ${detail}`)
    }

    return this.getRecipes()
  }

  addRecipe(recipe: RecipeItem): void {
    const nextRecipes = [...this.recipes, recipe]
    this.save(nextRecipes)
    this.recipes = nextRecipes
  }

  removeRecipe(id: string): void {
    const nextRecipes = this.recipes.filter((recipe) => recipe.id !== id)
    if (nextRecipes.length === this.recipes.length) {
      return
    }

    this.save(nextRecipes)
    this.recipes = nextRecipes
  }

  toggleFavorite(id: string): void {
    const recipeExists = this.recipes.some((recipe) => recipe.id === id)
    if (!recipeExists) {
      return
    }

    const nextRecipes = this.recipes.map(
      (recipe) =>
        new RecipeItem({
          id: recipe.id,
          title: recipe.title,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          isFavorite: recipe.id === id ? !recipe.isFavorite : recipe.isFavorite,
        }),
    )
    this.save(nextRecipes)
    this.recipes = nextRecipes
  }

  clearRecipes(): void {
    this.save([])
    this.recipes = []
  }

  private save(recipes: RecipeItem[]): void {
    this.storage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  }
}
