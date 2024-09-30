import React from 'react'
import { unstable_noStore as noStore } from "next/cache";

export default function DashboardPage() {
  noStore();
  return (
    <div>DashboardPage</div>
  )
}
