import { useDispatch } from 'react-redux'
import { removeProduct } from '../features/inventory/inventorySlice.js'

function RemoveProduct({ product }) {
  const dispatch = useDispatch()

  return (
    <button
      className="remove-button"
      type="button"
      aria-label={`Remove ${product.name}`}
      onClick={() => dispatch(removeProduct(product.id))}
    >
      Remove
    </button>
  )
}

export default RemoveProduct
