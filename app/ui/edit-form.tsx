"use client";
import { State, updateInvoice } from "@/app/lib/actions";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { Invoice } from "../lib/types";
export default function EditForm({ invoice }: { invoice: Invoice }) {
  const initialState: State = {
    message: null,
    errors: {},
    dbError: null,
  };
  const router = useRouter();
  // const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const updateInvoiceWithId = async (
    prevState: State | undefined,
    formData: FormData
  ) => {
    const data = await updateInvoice(invoice.id, prevState, formData);
    if (data?.dbError) {
      toast.error(data.dbError);
    }
    if (data?.message) {
      router.back();
    }
    return data as State;
  };

  // const [state, formAction, isPending] = useActionState(updateInvoice,
  //   initialState
  // );
  const [state, formAction, isPending] = useActionState(
    updateInvoiceWithId,
    initialState
  );

  return (
    <form action={formAction} className="md:w-3/4 w-full md:mx-auto">
      <div className="rounded-md space-y-3 p-4 md:p-6 w-full">
        {/* customer name */}
        <div className="w-full min-w-[250px]">
          <label
            htmlFor="CustomerName"
            className="block text-sm font-medium text-gray-700"
          >
            Customer Name
          </label>
          <div className="mt-1 flex rounded-md shadow-sm w-full">
            <input
              type="text"
              name="CustomerName"
              id="CustomerName"
              className="block w-full rounded-md border-0 outline-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Customer Name"
              required
              aria-describedby="name"
              defaultValue={invoice.name}
            />
          </div>
          <div id="name" aria-atomic="true" aria-live="polite">
            {state &&
              state.errors?.customerName &&
              state.errors?.customerName.map((error, index) => (
                <p key={index} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* customer email */}
        <div className="w-full min-w-[250px]">
          <label
            htmlFor="CustomerEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Customer Email
          </label>
          <div className="mt-1 flex rounded-md shadow-sm w-full">
            <input
              type="email"
              name="CustomerEmail"
              id="CustomerEmail"
              className="block w-full rounded-md border-0 outline-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Customer Email"
              required
              aria-describedby="email"
              defaultValue={invoice.email}
            />
          </div>
          <div id="email" aria-atomic="true" aria-live="polite">
            {state &&
              state.errors?.customerEmail &&
              state.errors?.customerEmail.map((error, index) => (
                <p key={index} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* customer phone */}
        <div className="w-full min-w-[250px]">
          <label
            htmlFor="CustomerPhone"
            className="block text-sm font-medium text-gray-700"
          >
            Customer Phone
          </label>
          <div className="mt-1 flex rounded-md shadow-sm w-full">
            <input
              type="number"
              name="CustomerPhone"
              id="CustomerPhone"
              className="block w-full rounded-md border-0 outline-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Customer Phone"
              required
              aria-describedby="phone"
              defaultValue={invoice.phone}
            />
          </div>
          <div id="phone" aria-atomic="true" aria-live="polite">
            {state &&
              state.errors?.customerPhone &&
              state.errors?.customerPhone.map((error, index) => (
                <p key={index} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Amount */}
        <div className="w-full min-w-[250px]">
          <label
            htmlFor="Amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <div className="mt-1 flex rounded-md shadow-sm w-full">
            <input
              type="number"
              name="Amount"
              id="Amount"
              className="block w-full rounded-md border-0 outline-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Amount"
              required
              aria-describedby="amount"
              defaultValue={invoice.amount}
            />
          </div>
          <div id="amount" aria-atomic="true" aria-live="polite">
            {state &&
              state.errors?.amount &&
              state.errors?.amount.map((error, index) => (
                <p key={index} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <fieldset>
          <legend className="mb-2 text-gray-700 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-300 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer focus:ring-0 border-gray-300 bg-gray-100  checked:accent-blue-600"
                  aria-describedby="status"
                  defaultChecked={invoice.status === "pending"}
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5  px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 checked:accent-blue-600 focus:ring-0 "
                  aria-describedby="status"
                  defaultChecked={invoice.status === "paid"}
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5  px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Paid
                </label>
                <div id="status" aria-atomic="true" aria-live="polite">
                  {state &&
                    state.errors?.status &&
                    state.errors?.status.map((error, index) => (
                      <p key={index} className="mt-2 text-sm text-red-500">
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        {/* Submit */}
        <div className="w-full flex items-center justify-center min-w-[250px]">
          <button
            type="submit"
            className={clsx(
              "w-1/2 rounded-md bg-blue-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
              {
                "bg-blue-200": isPending,
              }
            )}
            disabled={isPending}
          >
            Create Invoice
          </button>
        </div>
      </div>
    </form>
  );
}
