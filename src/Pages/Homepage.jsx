import { Link } from "react-router";
import Card from "../components/card/Card";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Homepage() {
  const recentProductsApi = "http://localhost:3000/products/recent";
  const bestSellerProductsApi = "http://localhost:3000/products/best-sellers";
  const [recentProducts, setRecentProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  const fetchRecentProducts = () => {
    axios.get(recentProductsApi).then((res) => {
      setRecentProducts(res.data);
      console.log(res.data);
    });
  };

  const fetchBestSellerProducts = () => {
    axios.get(bestSellerProductsApi).then((res) => {
      setBestSellerProducts(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    fetchRecentProducts();
    fetchBestSellerProducts();
  }, []);

  return (
    <main>
      {/* MAIN */}
      <div className="container">
        <header>
          <div>
            <h3>REPUBLIC OF RETRO©</h3>
            <h1>WHERE YOUR</h1>
            <h1>NERDY BUILDS</h1>
            <h1>
              <span>(should)</span> COME FROM
            </h1>

            <Link to="/products" className="flex" id="header-explore">
              <img
                src="src/assets/img/folders/folder-search.png"
                alt="Folder Search"
              />
              <p>EXPLORE</p>
            </Link>
          </div>
          <div>
            <img
              src="src/assets/img/logos/logo-ror.png"
              alt="Logo"
              id="header-logo"
            />
          </div>
        </header>
      </div>
      {/* CARD FEATURED/HOT THIS MONTH */}
      <Card
        title="Nome della sezione"
        bottomMessage="Don't shut down your monitor!"
      >
        {recentProducts[0] && (
          <div className="flex featured-container">
            <div className="featured-info">
              <h1>{recentProducts[0].name}</h1>
              <p>{recentProducts[0].description}</p>
              <h4>
                {recentProducts[0].price}{" "}
                <span> {recentProducts[0].promotion_price}</span>
              </h4>
            </div>
            <div className="featured-image">
              <div className="featured-image-content flex">
                <p>-50.00€</p>
                <img
                  src={recentProducts[0].thumbnail_url}
                  alt="Product Headphone"
                  id="featured-product-image"
                />
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="container">
        <section>
          <h2>Più Recenti</h2>
          {recentProducts[0] &&
            recentProducts.map((bestSellerProduct) => {
              return (
                <Card
                  title="Nome della sezione"
                  bottomMessage="Don't shut down your
                  monitor!"
                >
                  {bestSellerProduct && (
                    <div className="flex featured-container">
                      <div className="featured-info">
                        <h1>{bestSellerProduct.name}</h1>
                        <p>{bestSellerProduct.description}</p>
                        <h4>
                          {bestSellerProduct.promotion_price > 0 &&
                          bestSellerProduct.promotion_price <
                            bestSellerProduct.price ? (
                            <>
                              {bestSellerProduct.price}€
                              <span>{bestSellerProduct.promotion_price}€</span>
                            </>
                          ) : (
                            <>{bestSellerProduct.price}€</>
                          )}
                        </h4>
                      </div>
                      <div className="featured-image">
                        <div className="featured-image-content flex">
                          {bestSellerProduct.promotion_price > 0 &&
                            bestSellerProduct.promotion_price <
                              bestSellerProduct.price && (
                              <p>
                                -
                                {(
                                  bestSellerProduct.price -
                                  bestSellerProduct.promotion_price
                                ).toFixed(2)}
                                €
                              </p>
                            )}
                          <img
                            src={bestSellerProduct.thumbnail_url}
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
        </section>
        <section>
          <h2>Più Venduti</h2>
          {bestSellerProducts[0] &&
            bestSellerProducts.map((bestSellerProduct) => {
              return (
                <Card
                  title="Nome della sezione"
                  bottomMessage="Don't shut down your
                  monitor!"
                >
                  {bestSellerProduct && (
                    <div className="flex featured-container">
                      <div className="featured-info">
                        <h1>{bestSellerProduct.name}</h1>
                        <p>{bestSellerProduct.description}</p>
                        <h4>
                          {bestSellerProduct.promotion_price > 0 &&
                          bestSellerProduct.promotion_price <
                            bestSellerProduct.price ? (
                            <>
                              {bestSellerProduct.price}€
                              <span>{bestSellerProduct.promotion_price}€</span>
                            </>
                          ) : (
                            <>{bestSellerProduct.price}€</>
                          )}
                        </h4>
                      </div>
                      <div className="featured-image">
                        <div className="featured-image-content flex">
                          {bestSellerProduct.promotion_price > 0 &&
                            bestSellerProduct.promotion_price <
                              bestSellerProduct.price && (
                              <p>
                                -
                                {(
                                  bestSellerProduct.price -
                                  bestSellerProduct.promotion_price
                                ).toFixed(2)}
                                €
                              </p>
                            )}
                          <img
                            src={bestSellerProduct.thumbnail_url}
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
        </section>
      </div>
    </main>
  );
}
