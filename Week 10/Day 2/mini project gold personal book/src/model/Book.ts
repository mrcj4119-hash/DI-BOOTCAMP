export interface Book {
  id: string
  title: string
  author: string
  category: string
  description: string
  addedAt: string
  isRead: boolean
  progress: number
}

export type BookInput = Pick<Book, 'title' | 'author' | 'category' | 'description'> &
  Partial<Pick<Book, 'id' | 'addedAt' | 'isRead' | 'progress'>>

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export class BookItem implements Book {
  private readonly data: Book

  constructor(input: BookInput) {
    const title = input.title.trim()
    const author = input.author.trim()
    const category = input.category.trim()
    if (!title || !author || !category) {
      throw new Error('A book needs a title, author, and category.')
    }

    const progress = input.progress ?? (input.isRead ? 100 : 0)
    if (!Number.isFinite(progress) || progress < 0 || progress > 100) {
      throw new Error('Reading progress must be between 0 and 100.')
    }

    this.data = {
      id: input.id ?? crypto.randomUUID(),
      title,
      author,
      category,
      description: input.description.trim(),
      addedAt: input.addedAt ?? new Date().toISOString(),
      isRead: input.isRead ?? progress === 100,
      progress,
    }
  }

  get id(): string {
    return this.data.id
  }

  get title(): string {
    return this.data.title
  }

  get author(): string {
    return this.data.author
  }

  get category(): string {
    return this.data.category
  }

  get description(): string {
    return this.data.description
  }

  get addedAt(): string {
    return this.data.addedAt
  }

  get isRead(): boolean {
    return this.data.isRead
  }

  get progress(): number {
    return this.data.progress
  }

  serialize(): Book {
    return { ...this.data }
  }

  static deserialize(value: unknown): BookItem {
    if (!isRecord(value)) {
      throw new Error('Each imported book must be an object.')
    }

    const { id, title, author, category, description, addedAt, isRead, progress } = value
    if (
      typeof id !== 'string' ||
      typeof title !== 'string' ||
      typeof author !== 'string' ||
      typeof category !== 'string' ||
      typeof description !== 'string' ||
      typeof addedAt !== 'string' ||
      typeof isRead !== 'boolean' ||
      typeof progress !== 'number'
    ) {
      throw new Error('An imported book is missing required fields.')
    }

    return new BookItem({
      id,
      title,
      author,
      category,
      description,
      addedAt,
      isRead,
      progress,
    })
  }
}
