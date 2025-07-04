import { Link } from "react-router";
import Card from "../components/card/Card";

export default function Homepage() {
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
        <div className="flex featured-container">
          <div className="featured-info">
            <h3>MARCA</h3>
            <h1>NOME PRODOTTO LUNGO</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              maxime iste inventore, laudantium quaerat ipsum sed libero est
              quis, tempora laboriosam distinctio voluptatem dolorum beatae
              tenetur doloremque eveniet, eum dicta.
            </p>
            <h4>
              000€ <span> 111€</span>
            </h4>
          </div>
          <div className="featured-image">
            <div className="featured-image-content flex">
              <p>-20%</p>
              <img
                src="src/assets/img/products/product-headphone.png"
                alt="Product Headphone"
                id="featured-product-image"
              />
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
