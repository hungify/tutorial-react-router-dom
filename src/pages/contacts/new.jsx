import { useForm } from "react-hook-form";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { createContact } from "../../contacts";

export async function newContactAction({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const newContact = await createContact(data);
  return redirect(`/contacts/${newContact.id}`);
}

export default function NewContact() {
  const navigate = useNavigate();
  const actionData = useActionData();
  const submit = useSubmit();

  const {
    trigger,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: actionData?.defaultValues,
    defaultErrors: actionData?.errors,
  });

  const onSubmit = async (e) => {
    const isValid = await trigger();
    e.preventDefault();
    if (isValid) {
      const values = getValues();
      submit(values, {
        action: "/contacts/new",
        method: "post",
      });
    }
  };

  return (
    <form
      // action="/contacts/new"
      // method="post"
      id="contact-form"
      onSubmit={(e) => onSubmit(e)}
    >
      <div>
        <span>Name</span>
        <div className="group-item">
          <div>
            <input
              placeholder="First"
              aria-label="First name"
              type="text"
              name="first"
              {...register("first", {
                required: "This field is required",
              })}
            />
            {errors.first && (
              <p role="alert" className="error">
                {errors.first?.message}
              </p>
            )}
          </div>
          <div>
            <input
              placeholder="Last"
              aria-label="Last name"
              type="text"
              name="last"
              {...register("last", {
                required: "This field is required",
              })}
            />
            {errors.last && (
              <p role="alert" className="error">
                {errors.last?.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
        <label>
          <span>Twitter</span>
        </label>
        <div>
          <input
            type="text"
            name="twitter"
            placeholder="@jack"
            {...register("twitter", {
              required: "This field is required",
            })}
          />
          {errors.twitter && (
            <p role="alert" className="error">
              {errors.twitter?.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label>
          <span>Avatar URL</span>
        </label>
        <div>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            {...register("avatar", {
              required: "This field is required",
            })}
          />
          {errors.avatar && (
            <p role="alert" className="error">
              {errors.avatar?.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label>
          <span>Notes</span>
        </label>
        <div>
          <textarea
            name="notes"
            {...register("notes", {
              required: "This field is required",
            })}
          />
          {errors.notes && (
            <p role="alert" className="error">
              {errors.notes?.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
