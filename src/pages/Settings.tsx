import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockBrands = [
  { id: 1, name: "StyleCo", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop" },
  { id: 2, name: "DenimPro", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop" },
  { id: 3, name: "ActiveWear", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop" },
  { id: 4, name: "LuxeWear", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop" },
];

export default function Settings() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage brands and system preferences</p>
      </div>

      {/* Brand Management */}
      <Card className="border-border-soft">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Brand Management</CardTitle>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Add Brand
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-background-light">
                <TableHead className="text-foreground font-semibold">Brand Image</TableHead>
                <TableHead className="text-foreground font-semibold">Brand Name</TableHead>
                <TableHead className="text-foreground font-semibold">ID</TableHead>
                <TableHead className="text-foreground font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBrands.map((brand) => (
                <TableRow key={brand.id} className="border-border hover:bg-background-light">
                  <TableCell>
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="h-12 w-12 rounded object-cover border border-border"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{brand.name}</TableCell>
                  <TableCell className="text-muted-foreground">{brand.id}</TableCell>
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
        </CardContent>
      </Card>

      {/* User Profile */}
      <Card className="border-border-soft">
        <CardHeader>
          <CardTitle className="text-foreground">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Name</Label>
              <Input id="name" placeholder="Your name" defaultValue="Inventory Manager" className="border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" defaultValue="manager@scottims.com" className="border-border" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-foreground">Role</Label>
            <Input id="role" placeholder="Your role" defaultValue="Inventory Manager" className="border-border" disabled />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
