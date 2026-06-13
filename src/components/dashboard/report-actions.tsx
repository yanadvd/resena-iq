"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, FileSpreadsheet, RefreshCw, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReportActions({
  canPdf,
  canCsv,
}: {
  canPdf: boolean;
  canCsv: boolean;
}) {
  const router = useRouter();
  const [regenerating, setRegenerating] = useState(false);

  async function regenerate() {
    setRegenerating(true);
    try {
      await fetch("/api/analysis/summary", { method: "POST" });
      router.refresh();
    } finally {
      setRegenerating(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={regenerate} disabled={regenerating}>
        {regenerating ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
        Regenerar resumen IA
      </Button>

      {canPdf ? (
        <Button variant="outline" asChild>
          <a href="/api/reports/export?format=pdf" target="_blank" rel="noopener noreferrer">
            <FileText className="size-4" /> Exportar PDF
          </a>
        </Button>
      ) : (
        <Button variant="outline" disabled title="Disponible en plan Pro o superior">
          <Lock className="size-4" /> Exportar PDF
        </Button>
      )}

      {canCsv ? (
        <Button variant="outline" asChild>
          <a href="/api/reports/export?format=csv">
            <FileSpreadsheet className="size-4" /> Exportar CSV
          </a>
        </Button>
      ) : (
        <Button variant="outline" disabled title="Disponible en plan Pro o superior">
          <Lock className="size-4" /> Exportar CSV
        </Button>
      )}
    </div>
  );
}
