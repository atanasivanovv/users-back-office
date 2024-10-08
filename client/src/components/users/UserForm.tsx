import { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "antd";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser } from "../../store/usersSlice";

import { User } from "../../types";
import { AppDispatch, RootState } from "../../store";
import { ErrorMessage } from "../error";

type UserFormData = Pick<User, "username" | "email" | "address">;

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

interface UserFormProps {
  user: User;
  onCancel: () => void;
}

const UserForm: FC<UserFormProps> = ({ user, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { updateStatus, updateError } = useSelector(
    (state: RootState) => state.users,
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: user,
  });

  const onSubmit: SubmitHandler<UserFormData> = useCallback(
    async (data) => {
      try {
        const updatedUser = {
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
    },
    [dispatch, onCancel, user],
  );

  const isLoading = useMemo(() => updateStatus === "loading", [updateStatus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <span className="font-bold">Username:</span>
          <input
            {...register("username")}
            type="text"
            className="w-full p-2 border rounded mt-1"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
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
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="justify-start">
          <ErrorMessage message={updateError} />
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel} size="large">
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={isLoading}
            disabled={!isDirty || isLoading}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
