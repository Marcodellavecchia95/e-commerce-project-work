import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card/Card";

export default function ProductsPage() {
  const searchApi = "http://localhost:3000/products/search";
  const brandsApi = "http://localhost:3000/brands";
  const categoriesApi = "http://localhost:3000/categories";

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  // 🧠 Stato inizializzato con valori dalla URL
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  // 🔍 Fetch prodotti in base ai parametri URL
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

  // 📦 Fetch brand e categorie
  const fetchFilters = () => {
    axios.get(brandsApi).then((res) => setBrands(res.data));
    axios.get(categoriesApi).then((res) => setCategories(res.data));
  };

  // 🧠 Inizializzazione
  useEffect(() => {
    fetchFilters();
    fetchProducts();
  }, []);

  // 🔁 Reazione a URL aggiornata
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 🔗 Aggiorna URL + dati al submit
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          name="search"
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
            title="Nome della sezione"
            bottomMessage="Don't shut down your monitor!"
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
        ))
      ) : (
        <p>Nessun prodotto trovato.</p>
      )}
    </div>
  );
}
