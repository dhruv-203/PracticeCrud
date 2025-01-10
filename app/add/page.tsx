import CreateForm from "@/app/ui/create-form";
export default function ADD() {
  return (
    <div className="md:w-3/4 w-full mx-auto h-screen">
      <h1 className="w-full text-3xl font-bold text-center py-8">
        Add Invoice
      </h1>
      <CreateForm />
    </div>
  );
}
