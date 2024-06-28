import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductList from "../pages/ProductList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
    ],
  },
]);
