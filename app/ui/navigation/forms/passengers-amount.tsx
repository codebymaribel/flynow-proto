import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import IconCounter from "./IconCounter";
import { UseCountReturn } from "@/app/hooks/useCount";

export default function PassengersAmount({
  adultsCounter,
  childrenCounter,
  eldersCounter,
}: {
  adultsCounter: UseCountReturn;
  childrenCounter: UseCountReturn;
  eldersCounter: UseCountReturn;
}) {
  return (
    <Menu>
      <MenuButton className="flex flex-row items-center gap-2">
        <UserIcon className="h-5 w-5 text-gray-400" />
        <span className="font-medium text-gray-800">
          {adultsCounter.count + childrenCounter.count + eldersCounter.count}
        </span>
      </MenuButton>
      <MenuItems
        transition
        className="absolute z-10 w-48 bg-white rounded-md shadow-lg py-2 px-2"
      >
        <IconCounter
          IconComponent={UserIcon}
          label="Adults"
          count={adultsCounter.count}
          increment={adultsCounter.increment}
          decrement={adultsCounter.decrement}
          changeCount={adultsCounter.changeCount}
          defaultValue={1}
        />
        <IconCounter
          IconComponent={UserIcon}
          label="Children"
          count={childrenCounter.count}
          increment={childrenCounter.increment}
          decrement={childrenCounter.decrement}
          changeCount={childrenCounter.changeCount}
        />
        <IconCounter
          IconComponent={UserIcon}
          label="Elders"
          count={eldersCounter.count}
          increment={eldersCounter.increment}
          decrement={eldersCounter.decrement}
          changeCount={eldersCounter.changeCount}
        />
      </MenuItems>
    </Menu>
  );
}
