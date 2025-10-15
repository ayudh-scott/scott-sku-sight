import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, Calendar } from "lucide-react";

const forecastData = [
  { sku: "SKU-A101", product: "Classic Cotton Shirt", currentStock: 145, nextMonth: 180, confidence: 85 },
  { sku: "SKU-B203", product: "Denim Jeans", currentStock: 89, nextMonth: 110, confidence: 78 },
  { sku: "SKU-C145", product: "Sports Sneakers", currentStock: 23, nextMonth: 95, confidence: 92 },
  { sku: "SKU-D078", product: "Casual T-Shirt", currentStock: 234, nextMonth: 265, confidence: 88 },
  { sku: "SKU-E234", product: "Leather Jacket", currentStock: 12, nextMonth: 45, confidence: 75 },
];

const comparisonData = [
  { month: "May", actual: 156, forecast: 150 },
  { month: "Jun", actual: 189, forecast: 185 },
  { month: "Jul", actual: 178, forecast: 190 },
  { month: "Aug", actual: 205, forecast: 200 },
  { month: "Sep", actual: 198, forecast: 210 },
  { month: "Oct", actual: 225, forecast: 220 },
  { month: "Nov", actual: 0, forecast: 240 },
];

export default function Forecast() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Sales Forecast</h1>
        <p className="text-muted-foreground">AI-driven predictions for inventory planning</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-border-soft">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Month Forecast</p>
              <p className="text-2xl font-bold text-foreground">695 units</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border-soft">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary-light/10">
              <Calendar className="h-6 w-6 text-primary-light" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Forecast Period</p>
              <p className="text-2xl font-bold text-foreground">November 2025</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border-soft">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Confidence</p>
              <p className="text-2xl font-bold text-foreground">84%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="forecast" className="space-y-6">
        <TabsList className="bg-background-light border border-border">
          <TabsTrigger value="forecast" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            View Forecast
          </TabsTrigger>
          <TabsTrigger value="comparison" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Forecast vs Actual
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-6">
          <Card className="border-border-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Forecasted Demand - Next Month</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-background-light">
                    <TableHead className="text-foreground font-semibold">SKU</TableHead>
                    <TableHead className="text-foreground font-semibold">Product</TableHead>
                    <TableHead className="text-foreground font-semibold">Current Stock</TableHead>
                    <TableHead className="text-foreground font-semibold">Forecasted Demand</TableHead>
                    <TableHead className="text-foreground font-semibold">Required Purchase</TableHead>
                    <TableHead className="text-foreground font-semibold">Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forecastData.map((item) => {
                    const requiredPurchase = Math.max(0, item.nextMonth - item.currentStock);
                    return (
                      <TableRow key={item.sku} className="border-border hover:bg-background-light">
                        <TableCell className="font-medium text-foreground">{item.sku}</TableCell>
                        <TableCell className="text-foreground">{item.product}</TableCell>
                        <TableCell className="text-foreground">{item.currentStock}</TableCell>
                        <TableCell className="font-semibold text-primary">{item.nextMonth}</TableCell>
                        <TableCell className={requiredPurchase > 0 ? "font-semibold text-primary-alert" : "text-muted-foreground"}>
                          {requiredPurchase > 0 ? `+${requiredPurchase}` : "Sufficient"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-background-light rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${item.confidence}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{item.confidence}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card className="border-border-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Forecast Accuracy - Historical Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-subtle))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 6 }}
                    name="Actual Sales"
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="hsl(var(--primary-light))"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ fill: "hsl(var(--primary-light))", r: 6 }}
                    name="Forecasted Sales"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
