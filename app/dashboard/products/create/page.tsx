"use client"


import React, { useState } from "react";
import Image from "next/image";
import { createProduct } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeftIcon, XIcon } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/lib/categories";
import { UploadDropzone } from "@/lib/uploadthing";
import { SubmitButton } from "@/components/ui/submit-button";

export default function CreateProductPage() {
  // upload thing state
  const [images, setImages] = useState<string[]>([]);
  // conform
  const [lastResult, action] = useFormState(createProduct, undefined);
  const [form, fields] = useForm({
    lastResult,
    // client side validation
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: productSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
  });
    // detele image

    const handleDeleteImage = (index: number) => {
      setImages(images.filter((_, i) => i !== index));
    };
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-4">
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href={"/dashboard/products"}>
            <ChevronLeftIcon className="w-4 h-4" />
          </Link>
        </Button>

        <Heading size={"sm"} tracking={"tight"} fontWeight={"bold"}>
          New Product
        </Heading>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Add a new product to your inventory</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                className="w-full"
                placeholder="Product Name"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
              />
              <p className="text-rose-500">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Brand</Label>
              <Input
                type="text"
                placeholder="Product Brand"
                key={fields.brand.key}
                name={fields.brand.name}
                defaultValue={fields.brand.initialValue}
              />
              <p className="text-rose-500">{fields.brand.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                placeholder="Product Description..."
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
              />
              <p className="text-rose-500">{fields.description.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Input
                placeholder="Product Price"
                type="number"
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={fields.price.initialValue}
              />
              <p className="text-rose-500">{fields.price.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Featured</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultValue={fields.isFeatured.initialValue}
              />
              <p className="text-rose-500">{fields.isFeatured.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={fields.status.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Product Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-rose-500">{fields.status.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={fields.category.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Product Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-rose-500">{fields.category.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Rating</Label>
              <Input
                placeholder="Product Rating"
                type="number"
                key={fields.rating.key}
                name={fields.rating.name}
                defaultValue={fields.rating.initialValue}
              />
              <p className="text-rose-500">{fields.rating.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                defaultValue={fields.images.initialValue as any}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={image}
                        alt="Product Image"
                        className="w-full h-full object-cover rounded-lg border"
                      />

                      <button
                        onClick={() => handleDeleteImage(index)}
                        type="button"
                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                />
              )}

              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <SubmitButton text="Create Product"/>
        </CardFooter>
      </Card>
    </form>
  )
}
