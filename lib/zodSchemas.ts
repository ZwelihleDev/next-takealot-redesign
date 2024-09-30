import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  brand: z.string(),
  description: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  price: z.number().min(1),
  rating: z.number().min(1).max(5),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum([
    "home",
    "tech",
    "laptops",
    "phones",
    "desktops",
    "monitors",
    "music",
    "headphones",
  ]),
  isFeatured: z.boolean().optional(),
});

// billboards
export const billboardSchema = z.object({
  title: z.string(),
  imageString: z.string(),
});
