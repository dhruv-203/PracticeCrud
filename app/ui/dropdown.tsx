"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
function Dropdown({
  selectOptions,
  className,
  dropName,
}: {
  selectOptions: {
    textDisplay: string;
    value: string;
  }[];
  className?: string;
  dropName: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const generateUrl = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(dropName, value);
    return `${pathname}?${params.toString()}`;
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    router.push(generateUrl(value));
  };

  return (
    <div className={`relative ${className ?? ""}`}>
      <select
        className="block w-full rounded-md outline-0 p-4 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
        name={dropName}
        id={dropName}
        onChange={handleChange}
        defaultValue={searchParams.get(dropName) ?? ""}
      >
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.textDisplay}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
