import AppShell from "@/components/AppShell";
import NetworkDashboard from "@/components/NetworkDashboard";
import { AFFILIATES } from "@/data/affiliates";
import { NETWORK_DASHBOARD } from "@/data/dashboardData";

export default function ReseauPage() {
  return (
    <AppShell>
      <NetworkDashboard
        title="Performance réseau"
        subtitle={`Semaine du 16 au 22 juin 2026 · ${AFFILIATES.length} filiales actives`}
        data={NETWORK_DASHBOARD}
      />
    </AppShell>
  );
}
