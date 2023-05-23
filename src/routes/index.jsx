import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page";
import Root, { rootAction, rootLoader } from "../pages/root";
import { contactsRoutes } from "../pages/contacts/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [contactsRoutes],
  },
]);

export default router;
