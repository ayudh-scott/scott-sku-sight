import { AlertTriangle, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockInventory = [
  {
    sku: "SKU-A101",
    productName: "Classic Cotton Shirt",
    brand: "StyleCo",
    currentStock: 145,
    minStock: 50,
    location: "Warehouse A - Section 2",
    lastUpdated: "2025-10-14",
  },
  {
    sku: "SKU-B203",
    productName: "Denim Jeans",
    brand: "DenimPro",
    currentStock: 89,
    minStock: 75,
    location: "Warehouse B - Section 1",
    lastUpdated: "2025-10-14",
  },
  {
    sku: "SKU-C145",
    productName: "Sports Sneakers",
    brand: "ActiveWear",
    currentStock: 23,
    minStock: 40,
    location: "Warehouse A - Section 5",
    lastUpdated: "2025-10-13",
  },
  {
    sku: "SKU-D078",
    productName: "Casual T-Shirt",
    brand: "StyleCo",
    currentStock: 234,
    minStock: 100,
    location: "Warehouse A - Section 3",
    lastUpdated: "2025-10-14",
  },
  {
    sku: "SKU-E234",
    productName: "Leather Jacket",
    brand: "LuxeWear",
    currentStock: 12,
    minStock: 25,
    location: "Warehouse B - Section 4",
    lastUpdated: "2025-10-12",
  },
];

export default function Inventory() {
  const getStockStatus = (current: number, min: number) => {
    const percentage = (current / min) * 100;
    if (percentage <= 50) return { status: "Critical", color: "text-primary-alert bg-primary-alert/10" };
    if (percentage <= 100) return { status: "Low", color: "text-primary bg-primary/10" };
    return { status: "Good", color: "text-green-600 bg-green-50" };
  };

  const lowStockItems = mockInventory.filter(
    (item) => item.currentStock <= item.minStock
  ).length;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Inventory</h1>
        <p className="text-muted-foreground">Monitor stock levels across all warehouses</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-border-soft">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-bold text-foreground">
                {mockInventory.reduce((sum, item) => sum + item.currentStock, 0)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border-soft">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary-alert/10">
              <AlertTriangle className="h-6 w-6 text-primary-alert" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Low Stock SKUs</p>
              <p className="text-2xl font-bold text-primary-alert">{lowStockItems}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border-soft">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-100">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Healthy Stock</p>
              <p className="text-2xl font-bold text-foreground">
                {mockInventory.length - lowStockItems}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="border-border-soft">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-background-light">
              <TableHead className="text-foreground font-semibold">SKU</TableHead>
              <TableHead className="text-foreground font-semibold">Product Name</TableHead>
              <TableHead className="text-foreground font-semibold">Brand</TableHead>
              <TableHead className="text-foreground font-semibold">Current Stock</TableHead>
              <TableHead className="text-foreground font-semibold">Min Stock</TableHead>
              <TableHead className="text-foreground font-semibold">Status</TableHead>
              <TableHead className="text-foreground font-semibold">Location</TableHead>
              <TableHead className="text-foreground font-semibold">Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInventory.map((item) => {
              const stockStatus = getStockStatus(item.currentStock, item.minStock);
              return (
                <TableRow key={item.sku} className="border-border hover:bg-background-light">
                  <TableCell className="font-medium text-foreground">{item.sku}</TableCell>
                  <TableCell className="text-foreground">{item.productName}</TableCell>
                  <TableCell className="text-foreground">{item.brand}</TableCell>
                  <TableCell className="text-foreground font-semibold">
                    {item.currentStock}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.minStock}</TableCell>
                  <TableCell>
                    <Badge className={stockStatus.color}>
                      {item.currentStock <= item.minStock && (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                      {stockStatus.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{item.location}</TableCell>
                  <TableCell className="text-muted-foreground">{item.lastUpdated}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
