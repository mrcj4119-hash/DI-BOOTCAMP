import { v4 as uuidv4 } from 'uuid'

export interface RecipeItemData {
  id?: string
  title: string
  ingredients: string[]
  instructions: string
  isFavorite?: boolean
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export default class RecipeItem {
  readonly id: string
  readonly title: string
  readonly ingredients: string[]
  readonly instructions: string
  readonly isFavorite: boolean

  constructor({
    id = uuidv4(),
    title,
    ingredients,
    instructions,
    isFavorite = false,
  }: RecipeItemData) {
    this.id = id
    this.title = title
    this.ingredients = [...ingredients]
    this.instructions = instructions
    this.isFavorite = isFavorite
  }

  static fromJSON(value: unknown): RecipeItem {
    if (!isRecord(value)) {
      throw new Error('A saved recipe must be an object.')
    }

    const { id, title, ingredients, instructions, isFavorite } = value
    if (
      typeof id !== 'string' ||
      typeof title !== 'string' ||
      !Array.isArray(ingredients) ||
      !ingredients.every((ingredient): ingredient is string => typeof ingredient === 'string') ||
      typeof instructions !== 'string' ||
      typeof isFavorite !== 'boolean'
    ) {
      throw new Error('A saved recipe has missing or invalid fields.')
    }

    return new RecipeItem({ id, title, ingredients, instructions, isFavorite })
  }
}
