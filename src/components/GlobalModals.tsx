import { useModal } from "@/contexts/ModalContext";
import DashboardModal from "./DashboardModal";

const GlobalModals = () => {
  const { isDashboardOpen, closeDashboard } = useModal();

  return (
    <DashboardModal 
      open={isDashboardOpen} 
      onOpenChange={(open) => !open && closeDashboard()} 
    />
  );
};

export default GlobalModals;
