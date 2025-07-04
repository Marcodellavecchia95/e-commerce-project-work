import { Link } from "react-router";

export default function ProductsPage() {
  return (
    <div>
      <h1>Questa è la products invece?, funziona?</h1>
      <Link to="/">
        <button className="btn btn-icons">Vai alla HomePage</button>
      </Link>
    </div>
  );
}
