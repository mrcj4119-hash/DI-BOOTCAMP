import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  calculateTotalPrice,
  selectCartItems,
  selectProductsWithCartQuantity,
} from '../features/cart/cartSelectors.js'
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from '../features/cart/cartSlice.js'
import '../App.css'

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function ShoppingCart() {
  const dispatch = useDispatch()
  const products = useSelector(selectProductsWithCartQuantity)
  const cartItems = useSelector(selectCartItems)
  const totalPrice = useSelector(calculateTotalPrice)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleAddToCart = useCallback((productId) => {
    dispatch(addToCart(productId))
  }, [dispatch])

  const handleUpdateQuantity = useCallback((productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }))
  }, [dispatch])

  const handleRemoveFromCart = useCallback((productId) => {
    dispatch(removeFromCart(productId))
  }, [dispatch])

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Fieldwork home">
          <span className="brand-mark" aria-hidden="true">f.</span>
          fieldwork
        </a>
        <a className="cart-link" href="#cart" aria-label={`Shopping cart, ${cartCount} items`}>
          <span aria-hidden="true">Bag</span>
          <span className="cart-count">{cartCount}</span>
        </a>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">WEEK 9 · DAY 5 · REDUX PERFORMANCE</p>
          <h1 id="page-title">
            Everyday things,
            <br />
            made <span>thoughtful.</span>
          </h1>
          <p className="intro-description">
            Useful objects for slower mornings, good work, and all the little
            moments in between.
          </p>
        </div>
        <div className="intro-stamp" aria-hidden="true">
          <span>GOOD THINGS</span>
          <strong>Made to<br />be kept.</strong>
        </div>
      </section>

      <div className="shop-layout">
        <section className="products-section" aria-labelledby="products-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE FIELDWORK EDIT</p>
              <h2 id="products-heading">Objects for everyday</h2>
            </div>
            <span className="product-count">{products.length} considered goods</span>
          </div>

          <ul className="product-grid">
            {products.map((product, index) => (
              <li className="product-card" key={product.id}>
                <div className={`product-art art-${product.color}`} aria-hidden="true">
                  <span className="art-index">0{index + 1}</span>
                  <span className="product-symbol">
                    {product.color === 'clay' ? '◒' : product.color === 'linen' ? '⌑' : product.color === 'sage' ? '▤' : '◉'}
                  </span>
                  <span className="art-caption">FIELDWORK / STUDIO</span>
                  {product.quantityInCart > 0 && (
                    <span className="added-badge">In bag · {product.quantityInCart}</span>
                  )}
                </div>
                <div className="product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <strong className="product-price">{money.format(product.price)}</strong>
                </div>
                <button
                  className="add-button"
                  onClick={() => handleAddToCart(product.id)}
                  type="button"
                >
                  <span>Add to bag</span>
                  <span aria-hidden="true">+</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <aside className="cart-panel" id="cart" aria-labelledby="cart-heading">
          <div className="cart-heading">
            <div>
              <p className="eyebrow">YOUR SELECTION</p>
              <h2 id="cart-heading">Shopping bag</h2>
            </div>
            <span className="bag-total">{cartCount}</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-icon" aria-hidden="true">⌑</span>
              <p>Your bag is taking a little break.</p>
              <span>Add something thoughtful to get started.</span>
            </div>
          ) : (
            <ul className="cart-items">
              {cartItems.map((item) => {
                const product = products.find((availableProduct) => availableProduct.id === item.productId)

                if (!product) return null

                return (
                  <li className="cart-item" key={item.productId}>
                    <span className={`cart-item-swatch swatch-${product.color}`} aria-hidden="true">
                      ✳
                    </span>
                    <div className="cart-item-info">
                      <h3>{product.name}</h3>
                      <span>{money.format(product.price)}</span>
                      <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
                        <button
                          aria-label={`Decrease quantity of ${product.name}`}
                          disabled={item.quantity === 1}
                          onClick={() => handleUpdateQuantity(product.id, item.quantity - 1)}
                          type="button"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => handleUpdateQuantity(product.id, item.quantity + 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-end">
                      <strong>{money.format(product.price * item.quantity)}</strong>
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveFromCart(product.id)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          <div className="cart-summary">
            <div className="subtotal">
              <span>Subtotal</span>
              <strong>{money.format(totalPrice)}</strong>
            </div>
            <p>Shipping and taxes calculated at checkout.</p>
            <button className="checkout-button" disabled={cartItems.length === 0} type="button">
              Continue to checkout <span aria-hidden="true">→</span>
            </button>
            <span className="secure-note"><span aria-hidden="true">✳</span> Thoughtfully packed, always.</span>
          </div>
        </aside>
      </div>

      <footer className="page-footer">
        <span>Thoughtful goods for the everyday.</span>
        <span>Redux Toolkit · Memoized cart selectors</span>
      </footer>
    </main>
  )
}

export default ShoppingCart
