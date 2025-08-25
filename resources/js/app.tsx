import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";
import ShopFormPage from "../js/Pages/ShopFormPage";

const container = document.getElementById("app");
if (!container) throw new Error("#app not found");
const root = createRoot(container);
root.render(
    <StrictMode>
        <ShopFormPage />
    </StrictMode>
);
