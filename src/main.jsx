import { createRoot } from "react-dom/client";
/* import "bootstrap/dist/css/bootstrap.min.css"; */
import * as bootstrap from "bootstrap";
import "./assets/css/index.css";
import "./assets/css/cardContent.css";
import "./assets/css/cardContentGallery.css";
import "./assets/css/cardTabs.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
