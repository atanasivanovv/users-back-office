import { FC, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { updateUser } from "../../store/usersSlice";
import { User } from "../../types";
import { AppDispatch } from "../../store";

interface UserFormProps {
  user: User;
  onCancel: () => void;
  isSubmitting: boolean;
}

const UserForm: FC<UserFormProps> = ({ user, onCancel, isSubmitting }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<User>(user); // Ensure correct typing

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
      return;
    }

    if (name in formData) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 mt-2">
      <div>
        <span className="font-bold">Username:</span>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Username"
          required
        />
      </div>

      <div>
        <span className="font-bold">Email:</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          placeholder="Email"
          required
        />
      </div>

      <div>
        <span className="font-bold">Street:</span>
        <input
          type="text"
          name="street"
          value={formData.address.street}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          placeholder="Street"
          required
        />
      </div>

      <div>
        <span className="font-bold">Suite:</span>
        <input
          type="text"
          name="suite"
          value={formData.address.suite}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          placeholder="Suite"
          required
        />
      </div>

      <div>
        <span className="font-bold">City:</span>
        <input
          type="text"
          name="city"
          value={formData.address.city}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          placeholder="City"
          required
        />
      </div>

      <div>
        <span className="font-bold">Zipcode:</span>
        <input
          type="text"
          name="zipcode"
          value={formData.address.zipcode}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          placeholder="Zipcode"
          required
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={onCancel} size="large">
          Cancel
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={handleSubmit}
          loading={isSubmitting}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
