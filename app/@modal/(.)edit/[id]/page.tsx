import { getInvoiceById } from "@/app/lib/actions";
import { Invoice } from "@/app/lib/types";
import EditForm from "@/app/ui/edit-form";
import Modal from "@/app/ui/modal";

async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { data } = await getInvoiceById(params.id);
  return (
    <Modal>
      <EditForm invoice={data["0"] as Invoice} />
    </Modal>
  );
}

export default Page;
