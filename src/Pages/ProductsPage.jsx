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
  const [promoOnly, setPromoOnly] = useState(false);

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
      price: price,
      price_original: product.price,
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
          promo: searchParams.get("promo") || "",
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

  useEffect(() => {
    setPromoOnly(searchParams.get("promo") === "true");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = {};
    if (search) params.search = search;
    if (brand) params.brand = brand;
    if (category) params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (sort) params.sort = sort;
    if (promoOnly) params.promo = "true";

    setSearchParams(params);
  };

  return (
    <div className="container">
      <form id="form-search" onSubmit={handleSubmit}>
        <div className="form-top">
          <input
            id="search"
            type="text"
            placeholder="Cerca"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">Tutti i brand</option>
            {brands.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            id="categorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Tutte le categorie</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            id="minPrice"
            type="number"
            placeholder="Prezzo minimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            id=""
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
        </div>

        <div className="form-bottom">
          <label>
            <input
              id="promoOnly"
              type="checkbox"
              checked={promoOnly}
              onChange={(e) => setPromoOnly(e.target.checked)}
            />
            Solo prodotti in promozione
          </label>

          <button type="submit" className="btn btn-hover" id="btn-search">
            Cerca
          </button>
        </div>
      </form>
      <h2 className="found-products">Prodotti trovati</h2>
      {products.length > 0 &&
        products.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            bottomMessage="Ricordati di caricare la batteria del tuo laptop!"
          >
            <div className="flex featured-container">
              <div className="featured-info">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <hr />

                <div className="original-price-block">
                  <p>Prezzo originale:</p>
                  <h4>{product.price}€</h4>
                </div>

                {product.promotion_price > 0 &&
                  product.promotion_price < product.price && (
                    <div className="promotion-price-block">
                      <p>Prezzo promozionale:</p>
                      <h4>{product.promotion_price}€</h4>
                    </div>
                  )}

                <hr />

                <Link to={`/products/${product.slug}`}>
                  <button className="btn btn-hover">
                    <img
                      src="/assets/img/folders/folder-search.png"
                      alt="Folder open"
                    />
                    Scopri di più
                  </button>
                </Link>

                <div className="cart-controls">
                  <label htmlFor="qty" className="xp-label">
                    Quantità:
                  </label>
                  <input
                    id="qty"
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
        ))}
      : (<p>Nessun prodotto trovato.</p>)
    </div>
  );
}
