"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  price: z.coerce.number().min(1),
});

const createMenu = async (data: any) => {
  const res = await fetch("http://127.0.0.1:8000/api/menu/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to create menu");
  }

  return res.json();
};

type FormData = z.infer<typeof formSchema>;

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  function onSubmit(values: FormData) {
    setLoading(true);
    setFormData({ name: values.name, price: Number(values.price) });
    console.log(formData);
    createMenu(formData)
      .then(() => {
        router.replace("/?action=create");
      })
      .catch(() => {
        setError("An error has occurred");
        setLoading(false);
      });
  }

  const onFinish = (e: FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)(e);
  };

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={onFinish} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input required placeholder="Lasagna" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" required placeholder="$ 5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <FormDescription className="text-[#ff0000]">{error}</FormDescription>
        )}
        <Button
          disabled={loading}
          className="bg-[#008000] text-white hover:bg-[#00bb00] hover:text-green-100"
          type="submit"
          onClick={() => {
            form.trigger(["name", "price"]);
            const nameState = form.getFieldState("name");
            const priceState = form.getFieldState("price");
            if (nameState.invalid || priceState.invalid) {
              return;
            }
            const name = form.getValues("name");
            const price = Number(form.getValues("price"));
            setFormData({ ...formData, name: name, price: price });
          }}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default Page;
