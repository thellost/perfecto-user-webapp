import {ListingDashboard }from "@/components/Dashboard/ListingDashboard/Dashboard";
import { Sidebar } from "@/components/Sidebar/Sidebar";
export default function Home() {
  return (
    <main className="gap-4 p-4 flex ">
      <Sidebar />
      <ListingDashboard />
    </main>
  );
}
