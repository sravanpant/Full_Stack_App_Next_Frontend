"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const createMenu = async (data: any) => {
  const res = await fetch("http://127.0.0.1:8000/api/menu/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create menu");
  }

  return res.json();
};

type FormData = {
  name: string;
  price: string;
};

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({ name: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish = (e: Event) => {
    e.preventDefault();
    setLoading(true);
    createMenu(formData)
      .then(() => {
        router.replace("/?action=create");
      })
      .catch(() => {
        setError("An error has occurred");
        setLoading(false);
      });
  };

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return <div>page</div>;
};

export default Page;
