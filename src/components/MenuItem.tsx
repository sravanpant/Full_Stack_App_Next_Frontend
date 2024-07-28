import React from "react";
import { Button } from "@/components/ui/button";

export type MenuItemProps = {
  id: number;
  name: string;
  price: number;
  onEdit: () => void;
  onDelete: (id: number) => void;
};

const MenuItem = ({ id, name, price, onEdit, onDelete }: MenuItemProps) => {
  return (
    <div className="border border-gray-300 p-2.5 my-2.5 rounded-md shadow-md flex justify-between items-center bg-white">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{name}</span>
        <span className="text-gray-700">{price.toFixed(2)}</span>
      </div>
      <div className="flex gap-2.5">
        <Button className="bg-[#ffca28] text-[#333]" onClick={onEdit}>
          Edit
        </Button>
        <Button
          className="bg-[#f44336] text-[#fff]"
          onClick={() => {
            onDelete(id);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;
