import { UserIcon } from "@heroicons/react/24/outline";
import CounterWithArrows from "./CounterWithArrows";
import { UseCountReturn } from "@/app/features/flights/hooks/useCount";
import { useState } from "react";

export default function PassengersAmount({
  adultsCounter,
  childrenCounter,
  eldersCounter,
}: {
  adultsCounter: UseCountReturn;
  childrenCounter: UseCountReturn;
  eldersCounter: UseCountReturn;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <div
        className="flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => setVisible(!visible)}
      >
        <UserIcon className="h-6 w-6 text-blue-300 self-end" />
        <span className="font-medium text-gray-600 transition border-b-2 border-transparent hover:border-blue-300 delay-50">
          {adultsCounter.count} Adults, {childrenCounter.count} Children,{" "}
          {eldersCounter.count} Elders
        </span>
      </div>
      <div
        className={
          visible
            ? "block absolute ml-6 w-[14rem] z-10 bg-white rounded-md shadow-lg py-2 px-2"
            : "hidden"
        }
      >
        <CounterWithArrows
          label="Adults"
          count={adultsCounter.count}
          increment={adultsCounter.increment}
          decrement={adultsCounter.decrement}
          defaultValue={1}
        />
        <CounterWithArrows
          label="Children"
          count={childrenCounter.count}
          increment={childrenCounter.increment}
          decrement={childrenCounter.decrement}
        />
        <CounterWithArrows
          label="Elders"
          count={eldersCounter.count}
          increment={eldersCounter.increment}
          decrement={eldersCounter.decrement}
        />
      </div>
    </div>
  );
}
