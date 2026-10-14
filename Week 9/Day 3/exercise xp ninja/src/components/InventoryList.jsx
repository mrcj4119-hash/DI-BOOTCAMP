import { useSelector } from 'react-redux'
import RemoveProduct from './RemoveProduct.jsx'
import UpdateQuantity from './UpdateQuantity.jsx'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function InventoryList() {
  const products = useSelector((state) => state.inventory.products)
  const totalUnits = products.reduce((total, product) => total + product.quantity, 0)

  return (
    <section className="inventory-card" aria-labelledby="inventory-heading">
      <div className="inventory-heading">
        <div>
          <p className="eyebrow">WHAT’S ON THE SHELVES</p>
          <h2 id="inventory-heading">Your inventory</h2>
        </div>
        <div className="inventory-summary" aria-live="polite">
          <span>{products.length} products</span>
          <i aria-hidden="true" />
          <span>{totalUnits} units</span>
        </div>
      </div>

      {products.length > 0 ? (
        <>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">In stock</th>
                  <th scope="col">
                    <span className="visually-hidden">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-name">
                        <span className="product-dot" aria-hidden="true" />
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="category-tag">{product.category}</span>
                    </td>
                    <td className="price-cell">{currency.format(product.price)}</td>
                    <td>
                      <div className="stock-cell">
                        <UpdateQuantity product={product} />
                        {product.quantity === 0 ? (
                          <span className="stock-status out-of-stock">Out</span>
                        ) : product.quantity <= 5 ? (
                          <span className="stock-status low-stock">Low</span>
                        ) : (
                          <span className="stock-status in-stock">Good</span>
                        )}
                      </div>
                    </td>
                    <td className="action-cell">
                      <RemoveProduct product={product} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-note">
            Use the + and − controls to adjust stock. Low stock is 5 units or fewer.
          </p>
        </>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">
            ◌
          </span>
          <h3>Your shelves are ready.</h3>
          <p>Add a product above to start keeping track of your stock.</p>
        </div>
      )}
    </section>
  )
}

export default InventoryList
