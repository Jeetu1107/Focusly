import { getAnalyticsData } from "@/lib/actions/analytics";
import { AnalyticsView } from "./AnalyticsView";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const data = await getAnalyticsData(30);
  return <AnalyticsView data={data} />;
}
