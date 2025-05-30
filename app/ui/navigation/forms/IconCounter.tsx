import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface IconCounterProps {
  label?: string;
  increment: () => void;
  decrement: () => void;
  count: number;
  defaultValue?: number;
}

export default function IconCounter({
  label,
  increment,
  decrement,
  count,
  defaultValue = 0,
}: IconCounterProps) {
  return (
    <div className="flex flex-row justify-between gap-2 ">
      <div className="flex flex-row">
        <p className="font-bold text-gray-800">{label}</p>
      </div>
      <div className="flex flex-row items-center ">
        <a className="cursor-pointer" onClick={decrement}>
          <ChevronLeftIcon className="h-5 w-5 text-blue-400" />
        </a>
        <input
          defaultValue={defaultValue}
          value={count}
          className="text-center font-medium text-gray-400 webkit-appearance-none w-6"
          disabled
        />
        <a className="cursor-pointer" onClick={increment}>
          <ChevronRightIcon className="h-5 w-5 text-blue-400" />
        </a>
      </div>
    </div>
  );
}
