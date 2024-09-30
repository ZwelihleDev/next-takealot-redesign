import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function OrdersPage() {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders frrom your store</CardDescription>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  <p className="font-medium">John Doe</p>
                  <p className="hidden md:flex text-sm text-muted-foreground">
                    johndoe123@gmail.com
                  </p>
                </TableCell>
                <TableCell>Sale</TableCell>
                <TableCell>Sucessful</TableCell>
                <TableCell>2024-09-09</TableCell>
                <TableCell className="text-right">R 4500</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
