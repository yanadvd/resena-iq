import { getDashboardContext } from "@/lib/dashboard-context";
import { prisma } from "@/lib/prisma";
import { canAddSource } from "@/lib/usage";
import { PLANS } from "@/lib/plans";
import { Topbar } from "@/components/dashboard/topbar";
import { SourcesManager } from "@/components/dashboard/sources-manager";

export default async function SourcesPage() {
  const ctx = await getDashboardContext();
  const [sources, canAdd] = await Promise.all([
    prisma.reviewSource.findMany({
      where: { orgId: ctx.org.id },
      orderBy: { createdAt: "desc" },
    }),
    canAddSource(ctx.org.id, ctx.org.plan),
  ]);

  return (
    <>
      <Topbar title="Fuentes de reseñas" userEmail={ctx.email} />
      <main className="flex-1 p-6">
        <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
          Conecta las plataformas donde recibes reseñas. La automatización
          recopilará nuevas reseñas periódicamente y las analizará con IA.
        </p>
        <SourcesManager
          sources={sources}
          canAddMore={canAdd}
          planName={PLANS[ctx.org.plan].name}
        />
      </main>
    </>
  );
}
