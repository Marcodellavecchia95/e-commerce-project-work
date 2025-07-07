import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card/Card";

export default function ProductsPage() {
  const searchApi = "http://localhost:3000/products/search";
  const brandsApi = "http://localhost:3000/brands";
  const categoriesApi = "http://localhost:3000/categories";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch prodotti
  const fetchProducts = () => {
    axios
      .get(searchApi, {
        params: {
          search,
          brand,
          category,
          minPrice,
          maxPrice,
          sort,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Errore fetch prodotti:", err);
      });
  };

  // Fetch filtri
  const fetchFilters = () => {
    axios.get(brandsApi).then((res) => setBrands(res.data));
    axios.get(categoriesApi).then((res) => setCategories(res.data));
  };

  useEffect(() => {
    fetchFilters();
    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cerca prodotto..."
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

        <button type="submit">Cerca</button>
      </form>

      <Link to="/">
        <button className="btn btn-icons">Vai alla HomePage</button>
      </Link>

      <h2>Prodotti trovati</h2>

      {products.map((product) => (
        <Card
          key={product.id}
          title="Nome della sezione"
          bottomMessage="Don't shut down your monitor!"
          linkTo={`/products/${product.id}`}
        >
          <div className="flex featured-container">
            <div className="featured-info">
              <h1>{product.name}</h1>
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
              <Link to={`/products/${product.id}`} className="btn-detail">
                Scopri di più →
              </Link>
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
      ))}
    </>
  );
}
