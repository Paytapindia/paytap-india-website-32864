import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { verifyAdmin } from "@/lib/adminApi";

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin-login', { replace: true });
        return;
      }
      const isAdmin = await verifyAdmin();
      if (!isAdmin) {
        await supabase.auth.signOut();
        navigate('/admin-login', { replace: true });
        return;
      }
      setAuthorized(true);
      setLoading(false);
    };
    check();
  }, [navigate]);

  if (loading || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminGuard;
