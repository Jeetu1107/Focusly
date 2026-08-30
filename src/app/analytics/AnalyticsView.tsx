"use client";

import { BarChart3, TrendingUp, Clock, CheckCircle2, Zap, Smile } from "lucide-react";
import { Card, CardBody, CardTitle, CardHeader } from "@/components/ui/Card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  data: Awaited<ReturnType<typeof import("@/lib/actions/analytics").getAnalyticsData>>;
};

export function AnalyticsView({ data }: Props) {
  const { summary } = data;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 animate-fade-in">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-accent text-sm mb-3">
          <BarChart3 className="w-4 h-4" />
          <span>Analytics</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-light tracking-tight">
          Your last 30 days
        </h1>
        <p className="text-text-muted mt-2">
          Trends, patterns, and progress.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <SummaryCard
          icon={<CheckCircle2 className="w-4 h-4" />}
          label="Tasks done"
          value={summary.totalTasksCompleted}
          sub={`${summary.avgTasksPerDay}/day avg`}
        />
        <SummaryCard
          icon={<Clock className="w-4 h-4" />}
          label="Focus time"
          value={`${summary.totalFocusHours}h`}
          sub={`${summary.totalFocusMinutes}m total`}
        />
        <SummaryCard
          icon={<Smile className="w-4 h-4" />}
          label="Avg wellbeing"
          value={summary.avgReflectionRating || "—"}
          sub="out of 5"
          accent
        />
        <SummaryCard
          icon={<Zap className="w-4 h-4" />}
          label="Momentum"
          value={summary.totalTasksCompleted > 20 ? "High" : summary.totalTasksCompleted > 5 ? "Building" : "Starting"}
          sub="keep going"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Tasks completed</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.tasksByDay}>
                  <CartesianGrid stroke="#1f252d" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#5b6472", fontSize: 10 }}
                    tickFormatter={(d) => new Date(d).getDate().toString()}
                    axisLine={{ stroke: "#1f252d" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#5b6472", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Focus minutes</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.focusByDay}>
                  <defs>
                    <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#1f252d" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#5b6472", fontSize: 10 }}
                    tickFormatter={(d) => new Date(d).getDate().toString()}
                    axisLine={{ stroke: "#1f252d" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#5b6472", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="minutes"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#focusGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Habits tracked daily</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.habitCompletion}>
                  <CartesianGrid stroke="#1f252d" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#5b6472", fontSize: 10 }}
                    tickFormatter={(d) => new Date(d).getDate().toString()}
                    axisLine={{ stroke: "#1f252d" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#5b6472", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#34d399"
                    strokeWidth={2}
                    dot={{ fill: "#34d399", r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wellbeing over time</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="h-56">
              {data.reflectionRatings.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-text-dim">
                  No reflections yet. Start journaling to see trends.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.reflectionRatings}>
                    <CartesianGrid stroke="#1f252d" strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#5b6472", fontSize: 10 }}
                      axisLine={{ stroke: "#1f252d" }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 5]}
                      tick={{ fill: "#5b6472", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="rating"
                      stroke="#60a5fa"
                      strokeWidth={2}
                      dot={{ fill: "#60a5fa", r: 3 }}
                    />
                    {data.reflectionRatings.some((r) => r.energy) && (
                      <Line
                        type="monotone"
                        dataKey="energy"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        dot={{ fill: "#f59e0b", r: 2 }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-4">
      <div
        className={`flex items-center gap-1.5 text-xs mb-2 ${accent ? "text-accent" : "text-text-dim"}`}
      >
        {icon}
        <span className="uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-light tabular-nums">{value}</div>
      {sub && <div className="text-[11px] text-text-dim mt-1">{sub}</div>}
    </div>
  );
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const date = new Date(label).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  });
  return (
    <div className="bg-surface border border-border rounded-lg px-3 py-2 text-xs shadow-xl">
      <div className="text-text-dim mb-1">{date}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-text-muted capitalize">{p.dataKey}</span>
          <span className="ml-auto font-medium tabular-nums">{p.value}</span>
        </div>
      ))}
    </div>
  );
}
