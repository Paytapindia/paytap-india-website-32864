import { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextType {
  isContactFormOpen: boolean;
  openContactForm: () => void;
  closeContactForm: () => void;
  setContactFormOpen: (open: boolean) => void;
  isDashboardOpen: boolean;
  openDashboard: () => void;
  closeDashboard: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const openContactForm = () => setIsContactFormOpen(true);
  const closeContactForm = () => setIsContactFormOpen(false);
  const setContactFormOpen = (open: boolean) => setIsContactFormOpen(open);

  const openDashboard = () => setIsDashboardOpen(true);
  const closeDashboard = () => setIsDashboardOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isContactFormOpen,
        openContactForm,
        closeContactForm,
        setContactFormOpen,
        isDashboardOpen,
        openDashboard,
        closeDashboard,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};