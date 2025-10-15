import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Package } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockSKUs = [
  {
    sku: "SKU-A101",
    class: "Premium",
    color: "Blue",
    size: "L",
    productName: "Classic Cotton Shirt",
    brand: "StyleCo",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=100&h=100&fit=crop",
  },
  {
    sku: "SKU-B203",
    class: "Standard",
    color: "Black",
    size: "M",
    productName: "Denim Jeans",
    brand: "DenimPro",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop",
  },
  {
    sku: "SKU-C145",
    class: "Premium",
    color: "White",
    size: "XL",
    productName: "Sports Sneakers",
    brand: "ActiveWear",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop",
  },
  {
    sku: "SKU-D078",
    class: "Standard",
    color: "Red",
    size: "S",
    productName: "Casual T-Shirt",
    brand: "StyleCo",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
  },
  {
    sku: "SKU-E234",
    class: "Premium",
    color: "Brown",
    size: "L",
    productName: "Leather Jacket",
    brand: "LuxeWear",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop",
  },
];

export default function SKUMaster() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSKUs = mockSKUs.filter((sku) =>
    Object.values(sku).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">SKU Master</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add New SKU
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="p-4 border-border-soft">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by SKU, name, brand, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-border"
            />
          </div>
        </div>
      </Card>

      {/* SKU Table */}
      <Card className="border-border-soft">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-background-light">
              <TableHead className="text-foreground font-semibold">Image</TableHead>
              <TableHead className="text-foreground font-semibold">SKU</TableHead>
              <TableHead className="text-foreground font-semibold">Product Name</TableHead>
              <TableHead className="text-foreground font-semibold">Brand</TableHead>
              <TableHead className="text-foreground font-semibold">Class</TableHead>
              <TableHead className="text-foreground font-semibold">Color</TableHead>
              <TableHead className="text-foreground font-semibold">Size</TableHead>
              <TableHead className="text-foreground font-semibold">Category</TableHead>
              <TableHead className="text-foreground font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSKUs.map((sku) => (
              <TableRow key={sku.sku} className="border-border hover:bg-background-light">
                <TableCell>
                  <img
                    src={sku.image}
                    alt={sku.productName}
                    className="h-12 w-12 rounded object-cover border border-border"
                  />
                </TableCell>
                <TableCell className="font-medium text-foreground">{sku.sku}</TableCell>
                <TableCell className="text-foreground">{sku.productName}</TableCell>
                <TableCell className="text-foreground">{sku.brand}</TableCell>
                <TableCell>
                  <Badge
                    variant={sku.class === "Premium" ? "default" : "secondary"}
                    className={
                      sku.class === "Premium"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }
                  >
                    {sku.class}
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground">{sku.color}</TableCell>
                <TableCell className="text-foreground">{sku.size}</TableCell>
                <TableCell className="text-foreground">{sku.category}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredSKUs.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No SKUs found matching your search</p>
        </div>
      )}
    </div>
  );
}
