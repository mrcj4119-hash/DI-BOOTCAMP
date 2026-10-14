import AddProduct from './components/AddProduct.jsx'
import InventoryList from './components/InventoryList.jsx'
import './App.css'

function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Stockroom home">
          <span className="brand-mark" aria-hidden="true">
            s
          </span>
          stockroom
        </a>
        <span className="topbar-note">
          Thoughtful goods, accounted for.
        </span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">YOUR SHOP, AT A GLANCE</p>
          <h1 id="page-title">
            Keep good
            <br />
            things <span>in stock.</span>
          </h1>
          <p className="intro-copy">
            A little order for the things you love to sell. Keep your shelves
            counted, current, and ready for what’s next.
          </p>
        </div>
        <div className="shelf-art" aria-hidden="true">
          <span className="shelf-sun" />
          <span className="shelf-box shelf-box-one" />
          <span className="shelf-box shelf-box-two" />
          <span className="shelf-box shelf-box-three" />
          <span className="shelf-line shelf-line-one" />
          <span className="shelf-line shelf-line-two" />
        </div>
      </section>

      <div className="dashboard">
        <AddProduct />
        <InventoryList />
      </div>

      <footer className="page-footer">
        <span>Good things, counted carefully.</span>
        <span>WEEK 9 · DAY 3</span>
      </footer>
    </main>
  )
}

export default App
