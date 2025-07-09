import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

import Card from "../components/Card/Card";
import Toast from "../components/ui/Toast";
import { CartContext } from "../context/CartContext";

export default function ProductsPage() {
  const searchApi = "http://localhost:3000/products/search";
  const brandsApi = "http://localhost:3000/brands";
  const categoriesApi = "http://localhost:3000/categories";

  const { addToCart } = useContext(CartContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showToast, setShowToast] = useState(false);

  // Stati controllati del form
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  const handleQuantityChange = (productId, value) => {
    const qty = Math.max(1, parseInt(value));
    setQuantities((prev) => ({ ...prev, [productId]: qty }));
  };

  const handleAddToCart = (product, quantity = 1) => {
    const price =
      product.promotion_price > 0 ? product.promotion_price : product.price;

    addToCart({
      id: product.id,
      name: product.name,
      thumbnail: product.thumbnail_url,
      price: price, // già scontato
      price_original: product.price, // <-- AGGIUNTO ORA
      quantity,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const fetchProducts = () => {
    axios
      .get(searchApi, {
        params: {
          search: searchParams.get("search") || "",
          brand: searchParams.get("brand") || "",
          category: searchParams.get("category") || "",
          minPrice: searchParams.get("minPrice") || "",
          maxPrice: searchParams.get("maxPrice") || "",
          sort: searchParams.get("sort") || "",
        },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Errore fetch prodotti:", err));
  };

  const fetchFilters = () => {
    axios.get(brandsApi).then((res) => setBrands(res.data));
    axios.get(categoriesApi).then((res) => setCategories(res.data));
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = {};
    if (search) params.search = search;
    if (brand) params.brand = brand;
    if (category) params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (sort) params.sort = sort;

    setSearchParams(params);
  };

  return (
    <div>
      {showToast && (
        <Toast
          message="Prodotto aggiunto al carrello!"
          onClose={() => setShowToast(false)}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Tutti i brand</option>
          {brands.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Tutte le categorie</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Prezzo minimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prezzo massimo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Ordina per...</option>
          <option value="price_asc">Prezzo crescente</option>
          <option value="price_desc">Prezzo decrescente</option>
          <option value="recent">Ultimi arrivi</option>
        </select>

        <button type="submit" className="btn" id="btn-search">
          Cerca
        </button>
      </form>

      <Link to="/">
        <button className="btn btn-icons">Vai alla HomePage</button>
      </Link>

      <h2>Prodotti trovati</h2>

      {products.length > 0 ? (
        products.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            bottomMessage="Don't shut down your monitor!"
          >
            <div className="flex featured-container">
              <div className="featured-info">
                <p>{product.description}</p>
                <h4>
                  {product.promotion_price > 0 &&
                  product.promotion_price < product.price ? (
                    <>
                      {product.price}€<span>{product.promotion_price}€</span>
                    </>
                  ) : (
                    <>{product.price}€</>
                  )}
                </h4>

                <Link to={`/products/${product.slug}`} className="btn-detail">
                  Scopri di più →
                </Link>

                <div className="cart-controls">
                  <input
                    type="number"
                    min="1"
                    value={quantities[product.id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                  />
                  <button
                    className="btn btn-cart"
                    onClick={() =>
                      handleAddToCart(product, quantities[product.id] || 1)
                    }
                  >
                    Aggiungi al carrello
                  </button>
                </div>
              </div>

              <div className="featured-image">
                <div className="featured-image-content flex">
                  {product.promotion_price > 0 &&
                    product.promotion_price < product.price && (
                      <p>
                        -{(product.price - product.promotion_price).toFixed(2)}€
                      </p>
                    )}
                  <img
                    src={product.thumbnail_url}
                    alt={product.name}
                    id="featured-product-image"
                  />
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <p>Nessun prodotto trovato.</p>
      )}
    </div>
  );
}
