import { supabase } from "@/app/lib/supabase";
import { FilterOptions, Invoice, SortOptions } from "@/app/lib/types";
import Dropdown from "@/app/ui/dropdown";
import InvoiceCard from "@/app/ui/InvoiceCard";
import { PostgrestError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
// import { Invoice } from "@/app/lib/types";
export default async function Home(props: {
  searchParams: Promise<{
    filter: string;
    sort: string;
  }>;
}) {
  const filterOptions = [
    {
      textDisplay: "All",
      value: "all",
    },
    {
      textDisplay: "Pending",
      value: "pending",
    },
    {
      textDisplay: "Paid",
      value: "paid",
    },
  ];

  const sortOptions = [
    {
      textDisplay: "Newest",
      value: "DateDesc",
    },
    {
      textDisplay: "Oldest",
      value: "DateAsc",
    },
    {
      textDisplay: "Low to High Amount",
      value: "AmountAsc",
    },
    {
      textDisplay: "High to Low Amount",
      value: "AmountDesc",
    },
  ];

  const searchParams = await props.searchParams;
  if (!searchParams.filter && !searchParams.sort) {
    redirect("/?filter=all&sort=DateAsc");
  }

  if (
    !Object.values(FilterOptions).includes(searchParams.filter as FilterOptions)
  ) {
    redirect("/?filter=all&sort=DateAsc");
  }

  if (!Object.values(SortOptions).includes(searchParams.sort as SortOptions)) {
    redirect("/?filter=all&sort=DateAsc");
  }

  let error: PostgrestError | null = null;

  const getInvoices = async (
    filter: FilterOptions,
    sortField: string,
    sortOrder: string
  ) => {
    if (filter === "all") {
      const { data, error: dbError } = await supabase
        .from("invoices")
        .select("*")
        .order(sortField, { ascending: sortOrder === "asc" });
      error = dbError;
      return data as Invoice[];
    } else {
      const { data, error: dbError } = await supabase
        .from("invoices")
        .select("*")
        .eq("status", filter)
        .order(sortField, { ascending: sortOrder === "asc" });
      error = dbError;
      return data as Invoice[];
    }
  };

  let data: Invoice[] = [];

  // setup a switch case to handle the different sorting options
  switch (searchParams.sort) {
    case "DateAsc":
      data = await getInvoices(
        searchParams.filter as FilterOptions,
        "created_at",
        "asc"
      );
      break;
    case "DateDesc":
      data = await getInvoices(
        searchParams.filter as FilterOptions,
        "created_at",
        "desc"
      );
      break;
    case "AmountAsc":
      data = await getInvoices(
        searchParams.filter as FilterOptions,
        "amount",
        "asc"
      );
      break;
    case "AmountDesc":
      data = await getInvoices(
        searchParams.filter as FilterOptions,
        "amount",
        "desc"
      );
      break;
  }

  // const { data, error } = await supabase.from("invoices").select("*");

  if (error) {
    throw new Error((error as PostgrestError).message);
  }

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col lg:flex-row items-center  justify-center p-3 lg:justify-around">
        <h1 className=" text-3xl font-bold px-4 text-center py-4">Invoices</h1>
        <div className="flex items-center justify-center grow gap-3 p-2">
          <div className="text-base lg:text-lg font-semibold text-black ">
            Filters:
          </div>
          <Dropdown
            dropName="filter"
            className="px-2 py-4"
            selectOptions={filterOptions}
          />
        </div>
        <div className="flex items-center justify-center grow gap-3 p-2">
          <div className="text-base lg:text-lg font-semibold text-black ">
            Sort:
          </div>
          <Dropdown
            dropName="sort"
            className="px-2 py-4"
            selectOptions={sortOptions}
          />
        </div>
      </div>

      <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-4 p-4">
        {data &&
          (data as Invoice[]).map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
      </div>
    </div>
  );
}
