import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "antd";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser } from "../../store/usersSlice";

import { User } from "../../types";
import { AppDispatch, RootState } from "../../store";

interface UserFormProps {
  user: User;
  onCancel: () => void;
}

interface UserFormData {
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.object().shape({
    street: yup.string().required("Street is required"),
    suite: yup.string().required("Suite is required"),
    city: yup.string().required("City is required"),
    zipcode: yup.string().required("Zipcode is required"),
  }),
});

const UserForm: React.FC<UserFormProps> = ({ user, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const updateStatus = useSelector(
    (state: RootState) => state.users.updateStatus,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: user,
  });

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      const updatedUser: User = {
        ...user,
        ...data,
        address: {
          ...user.address,
          ...data.address,
        },
      };
      await dispatch(updateUser(updatedUser)).unwrap();
      onCancel();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 mt-2">
      <div>
        <span className="font-bold">Username:</span>
        <input
          {...register("username")}
          type="text"
          className="w-full p-2 border rounded mt-2"
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      <div>
        <span className="font-bold">Email:</span>
        <input
          {...register("email")}
          type="email"
          className="w-full p-2 border rounded mt-1"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <span className="font-bold">Street:</span>
        <input
          {...register("address.street")}
          type="text"
          className="w-full p-2 border rounded mt-1"
          placeholder="Street"
        />
        {errors.address?.street && (
          <p className="text-red-500 text-sm mt-1">
            {errors.address.street.message}
          </p>
        )}
      </div>

      <div>
        <span className="font-bold">Suite:</span>
        <input
          {...register("address.suite")}
          type="text"
          className="w-full p-2 border rounded mt-1"
          placeholder="Suite"
        />
        {errors.address?.suite && (
          <p className="text-red-500 text-sm mt-1">
            {errors.address.suite.message}
          </p>
        )}
      </div>

      <div>
        <span className="font-bold">City:</span>
        <input
          {...register("address.city")}
          type="text"
          className="w-full p-2 border rounded mt-1"
          placeholder="City"
        />
        {errors.address?.city && (
          <p className="text-red-500 text-sm mt-1">
            {errors.address.city.message}
          </p>
        )}
      </div>

      <div>
        <span className="font-bold">Zipcode:</span>
        <input
          {...register("address.zipcode")}
          type="text"
          className="w-full p-2 border rounded mt-1"
          placeholder="Zipcode"
        />
        {errors.address?.zipcode && (
          <p className="text-red-500 text-sm mt-1">
            {errors.address.zipcode.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={onCancel} size="large">
          Cancel
        </Button>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={updateStatus === "loading"}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
