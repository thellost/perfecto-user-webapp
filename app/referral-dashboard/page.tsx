import {ReferralDashboard}from "@/components/Dashboard/ReferralDashboard/Dashboard";
import { Sidebar } from "@/components/Sidebar/Sidebar";
export default function Home() {
  return (
    <main className="gap-4 p-4 flex ">
      <Sidebar />
      <ReferralDashboard />
    </main>
  );
}
