import { useEffect, useState, useCallback } from "react";
import { adminFetch, adminPost, exportToCSV } from "@/lib/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, FileText, X, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { generateInvoice, InvoiceData } from "@/lib/generateInvoice";

const PLAN_MAP: Record<number, { name: string; vehicles: number; unitPrice: number }> = {
  999:  { name: 'Starter', vehicles: 1, unitPrice: 847 },
  1600: { name: 'Business Basic', vehicles: 2, unitPrice: 1356 },
  3749: { name: 'Business Pro', vehicles: 5, unitPrice: 3177 },
  6999: { name: 'Corporate', vehicles: 10, unitPrice: 5932 },
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const limit = 20;

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { limit: String(limit), offset: String(page * limit) };
      if (search) params.search = search;
      if (statusFilter !== 'all') params.status = statusFilter;
      const res = await adminFetch<{ data: any[]; count: number }>('orders', params);
      setOrders(res.data);
      setCount(res.count);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [search, statusFilter, page]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleExportCSV = async () => {
    const res = await adminFetch<{ data: any[] }>('orders', { limit: '1000', offset: '0' });
    exportToCSV(res.data, `paytap-orders-${format(new Date(), 'yyyy-MM-dd')}`);
  };

  const handleDownloadInvoice = async (order: any) => {
    const plan = PLAN_MAP[Number(order.amount)] || { name: 'Custom', vehicles: order.quantity, unitPrice: Math.round(Number(order.amount) / 1.18) };
    const subtotal = plan.unitPrice;
    const total = Number(order.amount);
    const gstAmount = total - subtotal;

    const invoiceData: InvoiceData = {
      txnid: order.txnid,
      name: order.name || 'Customer',
      address: order.address || '',
      city: order.city || '',
      state: order.state || 'Karnataka',
      pincode: order.pincode || '',
      phone: order.phone || '',
      email: order.email || '',
      pan: order.pan || undefined,
      gst: order.gst || undefined,
      companyName: order.company_name || undefined,
      productType: order.product_type as 'sticker' | 'card',
      planName: plan.name,
      vehicleCount: plan.vehicles,
      quantity: order.quantity,
      unitPrice: subtotal,
      subtotal,
      gstAmount,
      total,
    };
    await generateInvoice(invoiceData);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await adminPost({ action: 'update-order-status', orderId, status: newStatus });
      fetchOrders();
    } catch (e) { console.error(e); }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await adminPost({ action: 'delete-order', orderId });
      setSelectedOrder(null);
      fetchOrders();
    } catch (e) { console.error(e); }
  };

  const totalPages = Math.ceil(count / limit);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-foreground">Orders</h2>
        <Button variant="outline" size="sm" onClick={handleExportCSV}>
          <Download className="h-4 w-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone, or txnid..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
          className="border border-input rounded-md px-3 py-2 text-sm bg-background"
        >
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
              ) : orders.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No orders found.</TableCell></TableRow>
              ) : orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">{order.txnid?.slice(0, 12)}</TableCell>
                  <TableCell className="font-medium">{order.name || '—'}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{order.email || '—'}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{order.phone || '—'}</TableCell>
                  <TableCell>₹{Number(order.amount).toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <select
                      value={order.payment_status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border-none cursor-pointer ${
                        order.payment_status === 'success' ? 'bg-green-100 text-green-800' :
                        order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="pending">pending</option>
                      <option value="success">success</option>
                    </select>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-xs">{format(new Date(order.created_at), 'MMM d, yyyy')}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteOrder(order.id)} className="text-destructive hover:text-destructive">
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

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{count} total orders</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>Previous</Button>
            <span className="text-sm text-muted-foreground flex items-center px-2">{page + 1} / {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}>Next</Button>
          </div>
        </div>
      )}

      {/* Order Detail Panel */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-md bg-card border-l border-border h-full overflow-y-auto p-6 animate-in slide-in-from-right">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Order Details</h3>
              <button onClick={() => setSelectedOrder(null)}><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4 text-sm">
              <div><span className="text-muted-foreground">Transaction ID:</span> <span className="font-mono text-foreground">{selectedOrder.txnid}</span></div>
              <div><span className="text-muted-foreground">Customer:</span> <span className="text-foreground">{selectedOrder.name || '—'}</span></div>
              <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{selectedOrder.email || '—'}</span></div>
              <div><span className="text-muted-foreground">Phone:</span> <span className="text-foreground">{selectedOrder.phone || '—'}</span></div>
              <div><span className="text-muted-foreground">Amount:</span> <span className="text-foreground font-medium">₹{Number(selectedOrder.amount).toLocaleString('en-IN')}</span></div>
              <div className="flex items-center gap-2"><span className="text-muted-foreground">Status:</span>
                <select
                  value={selectedOrder.payment_status}
                  onChange={(e) => { handleStatusChange(selectedOrder.id, e.target.value); setSelectedOrder({ ...selectedOrder, payment_status: e.target.value }); }}
                  className={`px-2 py-0.5 rounded text-xs font-medium cursor-pointer ${
                    selectedOrder.payment_status === 'success' ? 'bg-green-100 text-green-800' :
                    selectedOrder.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  <option value="pending">pending</option>
                  <option value="success">success</option>
                </select>
              </div>
              <div><span className="text-muted-foreground">Product:</span> <span className="text-foreground">{selectedOrder.product_type}</span></div>
              <div><span className="text-muted-foreground">Account Type:</span> <span className="text-foreground">{selectedOrder.account_type || '—'}</span></div>
              {selectedOrder.address && <div><span className="text-muted-foreground">Address:</span> <span className="text-foreground">{selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}</span></div>}
              {selectedOrder.company_name && <div><span className="text-muted-foreground">Company:</span> <span className="text-foreground">{selectedOrder.company_name}</span></div>}
              {selectedOrder.gst && <div><span className="text-muted-foreground">GST:</span> <span className="text-foreground">{selectedOrder.gst}</span></div>}
              {selectedOrder.pan && <div><span className="text-muted-foreground">PAN:</span> <span className="text-foreground">{selectedOrder.pan}</span></div>}
              <div><span className="text-muted-foreground">Date:</span> <span className="text-foreground">{format(new Date(selectedOrder.created_at), 'PPpp')}</span></div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button className="flex-1" onClick={() => handleDownloadInvoice(selectedOrder)}>
                <Download className="h-4 w-4 mr-2" /> Download Invoice
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteOrder(selectedOrder.id)}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
