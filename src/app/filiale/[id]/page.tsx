"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AppShell from "@/components/AppShell";
import NetworkDashboard from "@/components/NetworkDashboard";
import { getAffiliate } from "@/data/affiliates";
import { getFilialeDashboard } from "@/data/dashboardData";

export default function FilialePage() {
  const { id } = useParams<{ id: string }>();
  const affiliate = id ? getAffiliate(id) : undefined;

  if (!affiliate) {
    return (
      <AppShell>
        <div className="p-8 max-w-[1280px]">
          <h1 className="t-headline-lg">Établissement introuvable</h1>
          <p className="t-body-md text-ink-secondary mt-2">
            Cet établissement n&apos;existe pas ou n&apos;est plus rattaché à votre réseau.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 t-label-md font-semibold text-white bg-primary rounded-full hover:bg-primary-strong transition-colors"
          >
            <ArrowLeft size={16} />
            Retour à l&apos;accueil
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <NetworkDashboard
        title={affiliate.name}
        subtitle={`${affiliate.city} (${affiliate.postalCode}) · ${affiliate.adsCount} annonces en ligne`}
        data={getFilialeDashboard(affiliate.id)}
      />
    </AppShell>
  );
}
