import { ModalPublicProvider } from "@/components/providers/modal-public-provider";
import { Navbar } from "./_components/Navbar";
import { ModalPrivateProvider } from "@/components/providers/modal-private-provider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <ModalPublicProvider />
      <ModalPrivateProvider />
      {children}
    </div>
  );
};

export default DashboardLayout;
