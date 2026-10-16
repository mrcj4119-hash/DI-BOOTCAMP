import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [
    { id: 1, title: 'The Haunting of Hill House', author: 'Shirley Jackson', genre: 'Horror' },
    { id: 2, title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'Fantasy' },
    { id: 3, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction' },
    { id: 4, title: 'Mexican Gothic', author: 'Silvia Moreno-Garcia', genre: 'Horror' },
    { id: 5, title: 'A Wizard of Earthsea', author: 'Ursula K. Le Guin', genre: 'Fantasy' },
    { id: 6, title: 'Kindred', author: 'Octavia E. Butler', genre: 'Science Fiction' },
    { id: 7, title: 'The Shining', author: 'Stephen King', genre: 'Horror' },
    { id: 8, title: 'The Fifth Season', author: 'N. K. Jemisin', genre: 'Fantasy' },
    { id: 9, title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', genre: 'Science Fiction' },
  ],
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
})

export default booksSlice.reducer
