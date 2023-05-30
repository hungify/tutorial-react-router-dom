import Contact, { contactAction, contactLoader } from ".";
import ErrorPage from "../../error-page";
import EditContact, { editContactAction } from "./edit";
import Index from "./index";
import NewContact, { newContactAction } from "./new";
import { destroyAction } from "./destroy";
import { Outlet } from "react-router-dom";

export const contactsRoutes = {
  errorElement: <ErrorPage />,
  path: "contacts",
  element: <Outlet />,
  children: [
    { index: true, element: <Index /> },
    {
      path: ":contactId",
      element: <Contact />,
      loader: contactLoader,
      action: contactAction,
    },
    {
      path: ":contactId/edit",
      element: <EditContact />,
      loader: contactLoader,
      action: editContactAction,
    },
    {
      path: "destroy",
      action: destroyAction,
      errorElement: <div>Oops! There was an error.</div>,
    },
    {
      path: "new",
      element: <NewContact />,
      action: newContactAction,
    },
  ],
};
