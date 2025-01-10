"use client";
import { deleteInvoice } from "@/app/lib/actions";
import { Invoice } from "@/app/lib/types";
import Link from "next/link";
import { toast } from "react-toastify";
function InvoiceCard({ invoice }: { invoice: Invoice }) {
  return (
    <div className="p-4 bg-white rounded-md shadow-md min-w-[280px] grow space-y-4">
      {/* customer name */}
      <div className="w-full p-2">
        <div className="text-sm text-gray-700">Customer Name</div>
        <div className="text-base font-medium text-gray-900 px-2 py-4">
          {invoice.name}
        </div>
      </div>
      {/* customer email */}
      <div className="w-full p-2">
        <div className="text-sm text-gray-700">Customer Email</div>
        <div className="text-base font-medium text-gray-900 px-2 py-4">
          {invoice.email}
        </div>
      </div>
      <div className="w-full p-2 flex items-center justify-center gap-3">
        {/* customer phone */}
        <div className="grow p-2">
          <div className="text-sm text-gray-700">Customer Phone</div>
          <div className="text-base font-medium text-gray-900 px-2 py-4">
            {invoice.phone}
          </div>
        </div>
        {/* Date */}
        <div className="grow p-2">
          <div className="text-sm text-gray-700">Date</div>
          <div className="text-base font-medium text-gray-900 px-2 py-4">
            {/* Convert the timestamp to DD/MM/YYYY format */}
            {new Date(invoice.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="w-full p-2 flex items-center justify-center gap-3">
        {/* Amount */}
        <div className="grow p-2">
          <div className="text-sm text-gray-700">Amount</div>
          <div className="text-base font-medium text-gray-900 px-2 py-4">
            {invoice.amount}
          </div>
        </div>
        {/* Status */}
        <div className="grow p-2">
          <div className="text-sm text-gray-700">Status</div>
          <div className="text-base font-medium text-gray-900 px-2 py-4">
            {invoice.status}
          </div>
        </div>
      </div>
      <div className="w-full p-2 flex items-center justify-center gap-3">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md grow"
          onClick={async () => {
            const { message } = await deleteInvoice(invoice.id);
            if (message.includes("successfully")) {
              toast.success(message);
            } else {
              toast.error(message);
            }
          }}
        >
          Delete
        </button>
        <Link
          className="bg-blue-600 text-white text-center px-4 py-2 rounded-md grow"
          href={`/edit/${invoice.id}`}
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

export default InvoiceCard;
