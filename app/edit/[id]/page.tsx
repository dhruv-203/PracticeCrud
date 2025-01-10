import { getInvoiceById } from "@/app/lib/actions";
import { Invoice } from "@/app/lib/types";
import EditForm from "@/app/ui/edit-form";

async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { data } = await getInvoiceById(params.id);
  return (
    <div className="md:w-3/4 w-full mx-auto h-screen">
      <h1 className="w-full text-3xl font-bold text-center py-8">
        Add Invoice
      </h1>
      <EditForm invoice={data["0"] as Invoice} />
    </div>
  );
}

export default Page;
