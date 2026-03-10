import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { format, subDays, startOfDay } from "date-fns";

const COLORS = ['hsl(219, 96%, 14%)', 'hsl(346, 92%, 55%)', '#f59e0b', '#10b981', '#8b5cf6'];

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [ordersByDay, setOrdersByDay] = useState<any[]>([]);
  const [leadsBySource, setLeadsBySource] = useState<any[]>([]);
  const [revenueByDay, setRevenueByDay] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminFetch<{ orders: any[]; leads: any[] }>('analytics');

        // Orders by day
        const dayMap: Record<string, { orders: number; revenue: number }> = {};
        for (let i = 29; i >= 0; i--) {
          const key = format(subDays(new Date(), i), 'MMM d');
          dayMap[key] = { orders: 0, revenue: 0 };
        }
        data.orders.forEach((o: any) => {
          const key = format(new Date(o.created_at), 'MMM d');
          if (dayMap[key]) {
            dayMap[key].orders++;
            if (o.payment_status === 'success') dayMap[key].revenue += Number(o.amount);
          }
        });
        const dailyData = Object.entries(dayMap).map(([date, vals]) => ({ date, ...vals }));
        setOrdersByDay(dailyData);
        setRevenueByDay(dailyData);

        // Leads by source
        const sourceMap: Record<string, number> = {};
        data.leads.forEach((l: any) => {
          const src = l.source || 'unknown';
          sourceMap[src] = (sourceMap[src] || 0) + 1;
        });
        setLeadsBySource(Object.entries(sourceMap).map(([name, value]) => ({ name, value })));
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Orders (Last 30 Days)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ordersByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 11%, 90%)" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={4} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="orders" fill="hsl(219, 96%, 14%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Revenue Trend (₹)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 11%, 90%)" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={4} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(val: number) => [`₹${val.toLocaleString('en-IN')}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(346, 92%, 55%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Leads by Source</CardTitle></CardHeader>
          <CardContent>
            {leadsBySource.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No lead data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={leadsBySource} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                    {leadsBySource.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
