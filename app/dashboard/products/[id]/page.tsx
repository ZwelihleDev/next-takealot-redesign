

import EditForm from '@/components/dashboard/edit-form';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import React from 'react'
import { unstable_noStore as noStore } from "next/cache";

async function getProductData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })
  
  if (!data) {
    return notFound();
  }

  return data;
};
export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {

  noStore();

  const data = await getProductData(params.id)
  return (
    <div>

      <EditForm data={data}/>
    </div>
  )
}
