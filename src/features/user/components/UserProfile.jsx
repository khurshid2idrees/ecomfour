import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { updateUser } from "../userAPI";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  // We will add payment section when we work on backend.

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
    setValue("street", address.street);
  };

  const handleAdd = (address) => {
    const newUser = { ...user, addresses: [...user.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  return (
    <>
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Name: {user.name ? user.name : "New User"}
            </h1>
            <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
              Email address : {user.email}
            </h3>
            {user.role === "admin" && (
              <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                role : {user.role}
              </h3>
            )}
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <button
              onClick={(e) => {
                setShowAddAddressForm(true);
                setSelectedEditIndex(-1);
              }}
              type="submit"
              className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Address
            </button>

            {showAddAddressForm ? (
              <form
                className="bg-white px-5 py-12 mt-12"
                noValidate
                onSubmit={handleSubmit((data) => {
                  handleAdd(data);
                  reset();
                })}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl   font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "name is required",
                            })}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                            })}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            type="tel"
                            {...register("phone", {
                              required: "phone is required",
                            })}
                            id="phone"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "street is required",
                            })}
                            id="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "city is required",
                            })}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "state is required",
                            })}
                            id="region"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", {
                              required: "pinCode is required",
                            })}
                            id="pinCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Existing Addresses
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from Existing addresses
                    </p>
                    <ul role="list">
                      {user &&
                        user.addresses.map((address, index) => (
                          <li
                            key={index}
                            className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-400"
                          >
                            <div className="flex min-w-0 gap-x-4">
                              {/* <input
                              onChange={handleAddress}
                              name="address"
                              type="radio"
                              value={index}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            /> */}
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                  {address.name}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {address.street}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {address.pinCode}
                                </p>
                              </div>
                            </div>

                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm leading-6 text-gray-900">
                                Phone: {address.phone}
                              </p>
                              <p className="text-sm leading-6 text-gray-500">
                                {address.city}
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </form>
            ) : null}
            <p className="mt-0.5 text-sm text-gray-500">
              Your Addresses :
              {user.addresses.map((address, index) => (
                <div>
                  {selectedEditIndex === index ? (
                    <form
                      className="bg-white px-5 py-12 mt-12"
                      noValidate
                      onSubmit={handleSubmit((data) => {
                        handleEdit(data, index);
                        reset();
                      })}
                    >
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-2xl   font-semibold leading-7 text-gray-900">
                            Personal Information
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Use a permanent address where you can receive mail.
                          </p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("name", {
                                    required: "name is required",
                                  })}
                                  id="name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  {...register("email", {
                                    required: "email is required",
                                  })}
                                  type="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Phone
                              </label>
                              <div className="mt-2">
                                <input
                                  type="tel"
                                  {...register("phone", {
                                    required: "phone is required",
                                  })}
                                  id="phone"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="street-address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("street", {
                                    required: "street is required",
                                  })}
                                  id="street"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("city", {
                                    required: "city is required",
                                  })}
                                  id="city"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="region"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("state", {
                                    required: "state is required",
                                  })}
                                  id="region"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="postal-code"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("pinCode", {
                                    required: "pinCode is required",
                                  })}
                                  id="pinCode"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            onClick={(e) => setSelectedEditIndex(-1)}
                            type="submit"
                            className="rounded-md  px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </button>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Existing Addresses
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Choose from Existing addresses
                          </p>
                          <ul role="list">
                            {user &&
                              user.addresses.map((address, index) => (
                                <li
                                  key={index}
                                  className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-400"
                                >
                                  <div className="flex min-w-0 gap-x-4">
                                    {/* <input
                              onChange={handleAddress}
                              name="address"
                              type="radio"
                              value={index}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            /> */}
                                    <div className="min-w-0 flex-auto">
                                      <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {address.name}
                                      </p>
                                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {address.street}
                                      </p>
                                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {address.pinCode}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">
                                      Phone: {address.phone}
                                    </p>
                                    <p className="text-sm leading-6 text-gray-500">
                                      {address.city}
                                    </p>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </form>
                  ) : null}

                  <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-400">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address?.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address?.street}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address?.pinCode}
                        </p>
                      </div>
                    </div>

                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <button
                        onClick={(e) => handleEditForm(index)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>

                      <button
                        onClick={(e) => handleRemove(e, index)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
