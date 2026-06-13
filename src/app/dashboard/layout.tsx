import { getDashboardContext } from "@/lib/dashboard-context";
import { Sidebar } from "@/components/dashboard/sidebar";
import { PLANS } from "@/lib/plans";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await getDashboardContext();
  const planLabel = PLANS[ctx.org.plan].name;

  return (
    <div className="flex min-h-screen">
      <Sidebar planLabel={planLabel} />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
