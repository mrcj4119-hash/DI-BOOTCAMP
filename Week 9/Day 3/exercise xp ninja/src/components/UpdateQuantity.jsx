import { useDispatch } from 'react-redux'
import { updateQuantity } from '../features/inventory/inventorySlice.js'

function UpdateQuantity({ product }) {
  const dispatch = useDispatch()

  function setQuantity(quantity) {
    dispatch(updateQuantity({ id: product.id, quantity }))
  }

  return (
    <div className="quantity-control" aria-label={`Stock quantity for ${product.name}`}>
      <button
        className="quantity-button"
        type="button"
        aria-label={`Decrease ${product.name} quantity`}
        disabled={product.quantity === 0}
        onClick={() => setQuantity(product.quantity - 1)}
      >
        −
      </button>
      <span className="quantity-value" aria-live="polite">
        {product.quantity}
      </span>
      <button
        className="quantity-button"
        type="button"
        aria-label={`Increase ${product.name} quantity`}
        onClick={() => setQuantity(product.quantity + 1)}
      >
        +
      </button>
    </div>
  )
}

export default UpdateQuantity
