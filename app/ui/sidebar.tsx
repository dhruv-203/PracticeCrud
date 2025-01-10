import LinksContainer from "@/app/ui/links-container";

export default function Sidebar() {
  return (
    <div className="flex md:flex-col w-full flex-col sm:flex-row gap-4 p-4">
      <div className="text-3xl  w-full text-center mx-auto py-7 px-2 font-bold">
        Crud Application
      </div>
      <LinksContainer />
    </div>
  );
}
