import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductList from "../pages/ProductList";
import ProductView from "../pages/ProductView";
import ProductEdit from "../pages/ProductEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/product/view/:productId",
        element: <ProductView />,
      },
      {
        path: "/product/edit/:productId",
        element: <ProductEdit />,
      },
    ],
  },
]);
