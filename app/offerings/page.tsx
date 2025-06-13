import { UserOfferingsDashboard } from "@/components/Dashboard/UserOfferingDashboard/Dashboard";
import { Sidebar } from "@/components/Sidebar/Sidebar";
export default function Offerings() {
  return (
    <main className="gap-4 p-4 flex ">
      <Sidebar />
      <UserOfferingsDashboard />
    </main>
  );
}