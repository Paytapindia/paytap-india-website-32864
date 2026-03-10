import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Users, Megaphone, BarChart3, LogOut, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DashboardOverview from "@/pages/admin/DashboardOverview";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminLeads from "@/pages/admin/AdminLeads";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";

const navItems = [
  { label: "Overview", path: "/admin-dashboard", icon: LayoutDashboard },
  { label: "Orders", path: "/admin-dashboard/orders", icon: ShoppingCart },
  { label: "Leads", path: "/admin-dashboard/leads", icon: Megaphone },
  { label: "Users", path: "/admin-dashboard/users", icon: Users },
  { label: "Analytics", path: "/admin-dashboard/analytics", icon: BarChart3 },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  const isActive = (path: string) => {
    if (path === '/admin-dashboard') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 z-50 md:z-auto h-screen w-64 bg-card border-r border-border flex flex-col transition-transform md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-border">
          <h1 className="text-lg font-bold text-foreground">PayTap Admin</h1>
          <p className="text-xs text-muted-foreground">Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur border-b border-border px-4 md:px-6 h-14 flex items-center">
          <button className="md:hidden mr-3" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="text-sm font-medium text-muted-foreground">
            {navItems.find(n => isActive(n.path))?.label || 'Dashboard'}
          </span>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
