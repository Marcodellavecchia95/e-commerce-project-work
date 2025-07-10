import Card from "../components/Card/Card";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="container not-found-container">
      <Card title="Error" bottomMessage="Error: pagina non trovata!">
        <div className="not-found-container-content">
          <div className="not-found-content">
            <img src="/assets/img/buttons/btn-exit.png" alt="Not button" />
            <p>Error: 404 Page not found</p>
          </div>
          <Link to={"/"}>
            <button className="btn btn-hover" id="not-found-button">
              {" "}
              Torna alla Homepage
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
