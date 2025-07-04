import { Link } from "react-router";

export default function ProductsPage() {
  return (
    <div>
      <form>
        <input type="text" placeholder="Search..." name="search" />
        <button type="submit" className="btn" id="btn-search">
          <img
            src="src/assets/img/buttons/btn-search.png"
            alt="Search"
            id="search-icon"
          />
        </button>
      </form>

      <h1>Questa è la products invece?, funziona?</h1>
      <Link to="/">
        <button className="btn btn-icons">Vai alla HomePage</button>
      </Link>
    </div>
  );
}
