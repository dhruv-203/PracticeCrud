"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function LinksContainer() {
  const pathname = usePathname();
  return (
    <div className="link-container w-full p-4 flex flex-row md:flex-col">
      <Link
        href="/"
        className={clsx(
          "h-10 grow flex items-center text-base justify-center  rounded-md font-semibold",
          { "text-blue-600": pathname === "/" }
        )}
      >
        View Invoices
      </Link>
      <Link
        href="/add"
        className={clsx(
          "h-10 flex grow items-center text-base justify-center  rounded-md font-semibold",
          { "text-blue-600": pathname === "/add" }
        )}
      >
        Add Invoices
      </Link>
    </div>
  );
}
