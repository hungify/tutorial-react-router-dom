import Contact, { contactAction, contactLoader } from ".";
import ErrorPage from "../../error-page";
import EditContact, { editContactAction } from "./edit";
import Index from "./index";
import NewContact, { newContactAction } from "./new";
import { destroyAction } from "./destroy";

export const contactsRoutes = {
  errorElement: <ErrorPage />,
  children: [
    { index: true, element: <Index /> },
    {
      path: "contacts/:contactId",
      element: <Contact />,
      loader: contactLoader,
      action: contactAction,
    },
    {
      path: "contacts/:contactId",
      element: <Contact />,
    },
    {
      path: "contacts/:contactId/edit",
      element: <EditContact />,
      loader: contactLoader,
      action: editContactAction,
    },
    {
      path: "contacts/new",
      element: <NewContact />,
      action: newContactAction,
    },
    {
      path: "contacts/:contactId/destroy",
      action: destroyAction,
      errorElement: <div>Oops! There was an error.</div>,
    },
  ],
};
