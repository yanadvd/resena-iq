import { getDashboardContext } from "@/lib/dashboard-context";
import { planHasFeature } from "@/lib/plans";
import { Topbar } from "@/components/dashboard/topbar";
import { SubscriptionPanel } from "@/components/dashboard/subscription-panel";
import { SettingsForm } from "@/components/dashboard/settings-form";

export default async function SettingsPage() {
  const ctx = await getDashboardContext();
  const org = ctx.org;

  return (
    <>
      <Topbar title="Suscripción y ajustes" userEmail={ctx.email} />
      <main className="flex-1 space-y-10 p-6">
        <section>
          <h2 className="mb-4 font-display text-lg font-semibold">Suscripción</h2>
          <SubscriptionPanel
            plan={org.plan}
            status={org.subscriptionStatus}
            currentPeriodEnd={org.currentPeriodEnd?.toISOString() ?? null}
            hasCustomer={Boolean(org.stripeCustomerId)}
          />
        </section>

        <section>
          <h2 className="mb-4 font-display text-lg font-semibold">Negocio y alertas</h2>
          <SettingsForm
            initial={{
              name: org.name,
              industry: org.industry ?? "",
              website: org.website ?? "",
              alertEmail: org.alertEmail ?? ctx.email ?? "",
              alertsEnabled: org.alertsEnabled,
              alertRatingThreshold: org.alertRatingThreshold,
            }}
            canCustomAlerts={planHasFeature(org.plan, "customAlerts")}
          />
        </section>
      </main>
    </>
  );
}
