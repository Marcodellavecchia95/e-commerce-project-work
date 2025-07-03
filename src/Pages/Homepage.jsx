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
      console.log(res);
    });
  };

  useEffect(() => {
    fetchRecentProducts();
    fetchBestSellerProducts();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Homepage</h1>
        <div className="row">
          <div className="col-6 ">
            <h3>Più recenti</h3>
            {recentProducts.map((recentProduct) => {
              return (
                <div className="card" key={recentProduct.id}>
                  <img
                    src={recentProduct.thumbnail_url}
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recentProduct.name}</h5>
                    <p className="card-text">{recentProduct.description}</p>
                    <a href="#" className="btn btn-primary">
                      Dettagli Prodotto
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-6">
            <h3>Più venduti</h3>
            {bestSellerProducts.map((bestSellerProduct) => {
              return (
                <div className="card" key={bestSellerProduct.id}>
                  <img
                    src={bestSellerProduct.thumbnail_url}
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title">{bestSellerProduct.name}</h5>
                    <p className="card-text">{bestSellerProduct.description}</p>
                    <a href="#" className="btn btn-primary">
                      Dettagli Prodotto
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
