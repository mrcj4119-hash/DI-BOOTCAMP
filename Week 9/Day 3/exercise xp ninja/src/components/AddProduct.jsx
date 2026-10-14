import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../features/inventory/inventorySlice.js'

const initialForm = {
  name: '',
  category: '',
  price: '',
  quantity: '',
}

function AddProduct() {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const name = form.name.trim()
    const category = form.category.trim()
    const price = Number(form.price)
    const quantity = Number(form.quantity)

    if (!name || !category || form.price === '' || form.quantity === '') {
      setError('Complete each field to add a product.')
      return
    }

    if (!Number.isFinite(price) || price < 0 || !Number.isInteger(quantity) || quantity < 0) {
      setError('Enter a valid price and a whole-number quantity of zero or more.')
      return
    }

    dispatch(
      addProduct({
        id: crypto.randomUUID(),
        name,
        category,
        price,
        quantity,
      }),
    )
    setForm(initialForm)
    setError('')
  }

  return (
    <section className="add-card" aria-labelledby="add-heading">
      <div className="section-heading">
        <span className="section-icon add-icon" aria-hidden="true">
          +
        </span>
        <div>
          <p className="eyebrow">GROW YOUR SHELVES</p>
          <h2 id="add-heading">Add a product</h2>
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit} noValidate>
        <div className="field field-wide">
          <label htmlFor="product-name">Product name</label>
          <input
            id="product-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Linen journal"
            maxLength={80}
          />
        </div>
        <div className="field">
          <label htmlFor="product-category">Category</label>
          <input
            id="product-category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Stationery"
            maxLength={40}
          />
        </div>
        <div className="field">
          <label htmlFor="product-price">Price</label>
          <div className="input-with-prefix">
            <span aria-hidden="true">$</span>
            <input
              id="product-price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="product-quantity">Starting stock</label>
          <input
            id="product-quantity"
            name="quantity"
            type="number"
            min="0"
            step="1"
            value={form.quantity}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="add-button" type="submit">
          Add to inventory <span aria-hidden="true">↗</span>
        </button>
      </form>
    </section>
  )
}

export default AddProduct
