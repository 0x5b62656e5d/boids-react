import { createRoot } from "react-dom/client";
import "./index.css";
import SimulateBoids from "./SimulateBoids";

createRoot(document.getElementById("root")!).render(
	<div className="container">
		<SimulateBoids />
	</div>
);
