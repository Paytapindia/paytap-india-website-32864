import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Users, Megaphone, IndianRupee, Clock } from "lucide-react";
import { format } from "date-fns";

interface Stats {
  totalOrders: number;
  totalLeads: number;
  totalCorporate: number;
  totalRevenue: number;
  recentOrders: any[];
  recentLeads: any[];
}

const DashboardOverview = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch<Stats>('stats')
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  if (!stats) return <p className="text-muted-foreground">Failed to load stats.</p>;

  const metrics = [
    { label: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "text-blue-600" },
    { label: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: "text-green-600" },
    { label: "Total Leads", value: stats.totalLeads, icon: Megaphone, color: "text-orange-600" },
    { label: "Corporate Users", value: stats.totalCorporate, icon: Users, color: "text-purple-600" },
  ];

  // Combine recent activity
  const activity = [
    ...stats.recentOrders.map(o => ({ type: 'order' as const, name: o.name || 'Guest', detail: `₹${o.amount}`, date: o.created_at })),
    ...stats.recentLeads.map(l => ({ type: 'lead' as const, name: l.name || l.phone, detail: l.source || 'website', date: l.created_at })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{m.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{m.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-muted ${m.color}`}>
                  <m.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activity.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent activity.</p>
          ) : (
            <div className="space-y-3">
              {activity.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.type === 'order' ? 'bg-blue-500' : 'bg-orange-500'}`} />
                  <span className="font-medium text-foreground">{item.name}</span>
                  <span className="text-muted-foreground">
                    {item.type === 'order' ? `placed order ${item.detail}` : `new lead from ${item.detail}`}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
                    {format(new Date(item.date), 'MMM d, HH:mm')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
