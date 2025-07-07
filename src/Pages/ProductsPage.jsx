import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Card from "../components/Card/Card";

export default function ProductsPage() {
  const searchApi = "http://localhost:3000/products/search";
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = (searchTerm = "") => {
    axios
      .get(searchApi, { params: { search: searchTerm } })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Errore fetch prodotti:", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProducts(search);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn" id="btn-search">
            <img
              src="/assets/img/buttons/btn-search.png"
              alt="Search"
              id="search-icon"
            />
          </button>
        </form>

        <Link to="/">
          <button className="btn btn-icons">Vai alla HomePage</button>
        </Link>
      </div>
      <h2>Prodotti dalla A alla Z</h2>
      {products &&
        products.map((product) => {
          return (
            <Card
              key={product.id}
              title="Nome della sezione"
              bottomMessage="Don't shut down your
                            monitor!"
              linkTo={`/products/${product.id}`}
            >
              {product && (
                <div className="flex featured-container">
                  <div className="featured-info">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <h4>
                      {product.promotion_price > 0 &&
                      product.promotion_price < product.price ? (
                        <>
                          {product.price}€
                          <span>{product.promotion_price}€</span>
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
                            -
                            {(product.price - product.promotion_price).toFixed(
                              2
                            )}
                            €
                          </p>
                        )}
                      <img
                        src={product.thumbnail_url}
                        alt="Product Headphone"
                        id="featured-product-image"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
    </>
  );
}
