import { getDashboardContext } from "@/lib/dashboard-context";
import { prisma } from "@/lib/prisma";
import { Topbar } from "@/components/dashboard/topbar";
import { ReviewsExplorer } from "@/components/dashboard/reviews-explorer";
import type { SourceType } from "@prisma/client";

export default async function ReviewsPage() {
  const ctx = await getDashboardContext();
  const reviews = await prisma.review.findMany({
    where: { orgId: ctx.org.id },
    orderBy: { publishedAt: "desc" },
    take: 500,
  });

  const sources = [...new Set(reviews.map((r) => r.source))] as SourceType[];

  return (
    <>
      <Topbar title="Reseñas" userEmail={ctx.email} />
      <main className="flex-1 p-6">
        {reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            Aún no hay reseñas. Conecta una fuente o importa un CSV para empezar.
          </div>
        ) : (
          <ReviewsExplorer reviews={reviews} sources={sources} />
        )}
      </main>
    </>
  );
}
