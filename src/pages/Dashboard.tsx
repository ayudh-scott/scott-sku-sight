import { Package, AlertTriangle, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const metrics = [
  { title: "Total SKUs", value: "1,248", icon: Package, trend: "+12% from last month" },
  { title: "Low Stock Items", value: "23", icon: AlertTriangle, trend: "Requires attention", alert: true },
  { title: "Forecasted Sales", value: "₹45.2L", icon: TrendingUp, trend: "Next month projection" },
  { title: "Current Inventory Value", value: "₹85.6L", icon: DollarSign, trend: "+8% from last month" },
];

const topSellingData = [
  { name: "SKU-A101", sales: 450 },
  { name: "SKU-B203", sales: 380 },
  { name: "SKU-C145", sales: 320 },
  { name: "SKU-D078", sales: 290 },
  { name: "SKU-E234", sales: 260 },
];

const monthlySalesData = [
  { month: "Jan", sales: 42000, forecast: 43000 },
  { month: "Feb", sales: 45000, forecast: 44500 },
  { month: "Mar", sales: 48000, forecast: 47000 },
  { month: "Apr", sales: 51000, forecast: 50000 },
  { month: "May", sales: 49000, forecast: 51500 },
  { month: "Jun", sales: 52000, forecast: 52500 },
];

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your inventory and sales performance</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="border-border-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-5 w-5 ${metric.alert ? "text-primary-alert" : "text-primary"}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className={`text-xs mt-1 ${metric.alert ? "text-primary-alert" : "text-muted-foreground"}`}>
                {metric.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling SKUs */}
        <Card className="border-border-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Top Selling SKUs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topSellingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-subtle))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Sales Trend */}
        <Card className="border-border-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Monthly Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySalesData}>
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
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  name="Actual Sales"
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="hsl(var(--primary-light))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(var(--primary-light))", r: 4 }}
                  name="Forecast"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
