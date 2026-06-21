import { redirect } from "next/navigation";
import { getDashboardContext } from "@/lib/dashboard-context";
import { prisma } from "@/lib/prisma";
import { OnboardingWizard } from "@/components/dashboard/onboarding-wizard";

export default async function OnboardingPage() {
  const ctx = await getDashboardContext();

  // Si ya tiene fuentes conectadas, el onboarding está hecho → dashboard
  const sourceCount = await prisma.reviewSource.count({
    where: { orgId: ctx.org.id },
  });
  if (sourceCount > 0) redirect("/dashboard");

  return (
    <OnboardingWizard
      userName={ctx.name ?? ""}
      orgName={ctx.org.name}
    />
  );
}
