"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MenuItem, { MenuItemProps } from "@/components/MenuItem";
import Image from "next/image";
import loadingGif from "/public/__Iphone-spinner-1.gif";
import { Button } from "@/components/ui/button";

const deleteMenu = async (id: number) => {
  const res = await fetch(`http://127.0.0.1:8000/api/menus/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to retrieve menu");
  }
  return Promise.resolve();
};

const getData = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/menus/");
  if (!res.ok) {
    throw new Error("Failed to retrieve menu");
  }
  return res.json();
};

type DisplaySuccess = {
  show: boolean;
  type: string;
};

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
  const router = useRouter();
  const params = useSearchParams();

  const [displaySuccess, setDisplaySuccess] = useState<DisplaySuccess>({
    show: false,
    type: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setMenuItems(data);
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const action = params.get("action") || "";
    if (action) {
      setDisplaySuccess({
        show: true,
        type: action,
      });
      router.replace("/");
    }
  }, [params, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (displaySuccess.show) {
        setDisplaySuccess({
          show: false,
          type: "",
        });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [displaySuccess.show]);

  const handleDelete = async (id: number) => {
    try {
      await deleteMenu(id);
      setMenuItems((prev) =>
        prev.filter((item: MenuItemProps) => item.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        className="bg-[#008000] hover:bg-[#00b100] text-white"
        onClick={() => router.push("/add")}
      >
        Add
      </Button>
      {displaySuccess.show && (
        <p className="text-[#008000]">
          {displaySuccess.type === "add" ? "Added a" : "Modified a"} menu item.
        </p>
      )}
      {menuItems ? (
        menuItems.map((item: MenuItemProps) => (
          <MenuItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            onEdit={() => router.push(`/update/${item.id}`)}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <Image
          src={loadingGif}
          alt="Loading"
          width={100}
          height={100}
          className="mx-auto"
        />
      )}
    </div>
  );
}
