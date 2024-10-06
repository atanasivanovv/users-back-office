import { FC, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/usersSlice";
import { User } from "../../types";
import { AppDispatch } from "../../store";

interface UserFormProps {
  user: User;
  onCancel: () => void;
}

const UserForm: FC<UserFormProps> = ({ user, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState(user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 mt-2">
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Username"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="street"
        value={formData.address.street}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Street"
        required
      />
      <input
        type="text"
        name="suite"
        value={formData.address.suite}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Suite"
        required
      />
      <input
        type="text"
        name="city"
        value={formData.address.city}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="City"
        required
      />
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="submit"
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 px-4 py-2 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
