// eslint-disable-next-line object-curly-newline
import {
  AdminOrders,
  AdminOrdersSingle,
  Categories,
  HomePage,
  ProductAdd,
  ProductList
} from "@pages/index";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  { path: "/admin/products", element: <ProductList /> },
  { path: "/admin/products/add", element: <ProductAdd /> },
  { path: "/admin/categories", element: <Categories /> },
  { path: "/admin/orders", element: <AdminOrders /> },
  { path: "/admin/orders/:id", element: <AdminOrdersSingle /> }
]);
