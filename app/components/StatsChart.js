"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Radar } from "react-chartjs-2";

// register radar components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function StatsChart({ pokemon }) {
  const labels = pokemon.stats.map((s) => s.stat.name);
  const values = pokemon.stats.map((s) => s.base_stat);

  const data = {
    labels,
    datasets: [
      {
        label: pokemon.name,
        data: values,
        backgroundColor: "rgba(239,68,68,0.22)",
        borderColor: "#ef4444",
        borderWidth: 3,
        pointBackgroundColor: "#facc15",
        pointBorderColor: "#111827",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        borderColor: "#facc15",
        borderWidth: 2,
        titleColor: "#facc15",
        bodyColor: "#f9fafb",
        padding: 10,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: "#0f172a",
          lineWidth: 2,
        },
        grid: {
          color: "rgba(0,0,0,0.25)",
          lineWidth: 2,
        },
        pointLabels: {
          color: "#111827",
          font: {
            family: "'Press Start 2P', system-ui, sans-serif",
            size: 9,
          },
          callback: (val) => val.toUpperCase().replace("-", " "),
        },
        ticks: {
          display: false,
          beginAtZero: true,
          maxTicksLimit: 5,
        },
        suggestedMin: 0,
        suggestedMax: 160,
      },
    },
  };

  return (
    <div className="p-4 bg-yellow-50 border-8 border-black pixel-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="pixel-font text-lg text-gray-900">STATS RADAR</h3>
        <span className="px-3 py-1 bg-red-500 text-white font-bold border-2 border-black text-xs uppercase">Arcade Mode</span>
      </div>
      <div className="bg-white border-4 border-black p-3" style={{ height: 320 }}>
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}