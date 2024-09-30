"use client";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeftIcon, XIcon } from "lucide-react";
import Link from "next/link";

import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { editProduct } from "@/lib/actions";

import { useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { type $Enums } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { productSchema } from "@/lib/zodSchemas";
import { SubmitButton } from "@/components/ui/submit-button";
import { UploadDropzone } from "@/lib/uploadthing";
import { categories } from "@/lib/categories";


interface editFormProps {
  data: {
    id: string;
    name: string;
    brand: string;
    description: string;
    status: $Enums.ProductStatus;
    price: number;
    rating: number;
    images: string[];
    category: $Enums.Category;
    isFeatured: boolean;
  };
}

export default function EditForm({ data }: editFormProps) {

  const [images, setImages] = useState<string[]>(data.images);
  const [lastResult, action] = useFormState(editProduct, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type="hidden" name="productId" value={data.id} />
      <div className="flex items-center gap-4">
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href={"/dashboard/products"}>
            <ChevronLeftIcon className="w-4 h-4" />
          </Link>
        </Button>

        <Heading size={"sm"} tracking={"tight"} fontWeight={"bold"}>
          Edit Product
        </Heading>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Update your product to your inventory</CardDescription>
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
                defaultValue={data.name}
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
                defaultValue={data.brand}
              />
              <p className="text-rose-500">{fields.brand.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                placeholder="Product Description..."
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={data.description}
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
                defaultValue={data.price}
              />
              <p className="text-rose-500">{fields.price.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Featured</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultChecked={data.isFeatured}
              />
              <p className="text-rose-500">{fields.isFeatured.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={data.status}
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
                defaultValue={data.category}
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
                defaultValue={data.rating}
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
          <SubmitButton text="Edit Product"/>
        </CardFooter>
      </Card>
    </form>
  )
}
