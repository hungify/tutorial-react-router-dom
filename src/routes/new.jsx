import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
  useSubmit,
  useFetcher,
} from 'react-router-dom';
import { createContact, updateContact } from '../contacts';
import { useForm } from 'react-hook-form';

export async function newContactAction({ request, params }) {
  console.log('🚀 :: file: new.jsx:13 :: request:', request);
  const formData = await request.formData();
  const contact = Object.fromEntries(formData);
  console.log('contact', contact);
  // const updates = Object.fromEntries(formData);
  // await updateContact(contact.id, updates);
  // return redirect(`/contacts/${contact.id}`);
  return null;
}

export default function NewContact() {
  const contact = useLoaderData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = useSubmit();

  const onSubmit = async (data, evt) => {
    submit(evt.currentTarget, {
      method: 'POST',
      action: 'contacts/new',
    });
  };

  return (
    <Form
      action="/contacts/new"
      method="post"
      id="contact-form"
      onSubmit={handleSubmit(onSubmit)}
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
              {...register('first', {
                required: 'This field is required',
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
              {...register('last', {
                required: 'This field is required',
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
            {...register('twitter', {
              required: 'This field is required',
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
            {...register('avatar', {
              required: 'This field is required',
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
            {...register('notes', {
              required: 'This field is required',
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
    </Form>
  );
}
