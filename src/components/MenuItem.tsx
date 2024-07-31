// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Edit, Trash2 } from "lucide-react";

// export type MenuItemProps = {
//   id: number;
//   name: string;
//   price: number;
//   onEdit: () => void;
//   onDelete: (id: number) => void;
// };

// const MenuItem = ({ id, name, price, onEdit, onDelete }: MenuItemProps) => {
//   return (
//     <div className="border border-gray-300 p-2.5 my-2.5 rounded-md shadow-md flex justify-between items-center bg-white">
//       <div className="flex flex-col">
//         <span className="text-lg font-semibold">{name}</span>
//         <span className="text-gray-700">₹ {price.toFixed(2)}</span>
//       </div>
//       <div className="flex gap-2.5">
//         <Button className="bg-[#ffca28] hover:bg-yellow-500" onClick={onEdit}>
//           <Edit className="text-white h-4 w-4 " />
//         </Button>
//         <Button
//           className="bg-[#f44336] hover:bg-red-700 text-[#fff]"
//           onClick={() => {
//             onDelete(id);
//           }}
//         >
//           <Trash2 className="text-white h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default MenuItem;

import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

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
        <span className="text-gray-700">₹ {price.toFixed(2)}</span>
      </div>
      <div className="flex gap-2.5">
        <Button className="bg-[#ffca28] hover:bg-yellow-500" onClick={onEdit}>
          <Edit className="text-white h-4 w-4" />
        </Button>
        <Button
          className="bg-[#f44336] hover:bg-red-700 text-[#fff]"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="text-white h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;
