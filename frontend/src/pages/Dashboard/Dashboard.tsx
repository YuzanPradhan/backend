import React from "react";
import {
  Users,
  ClipboardCheck,
  Clock,
  UserPlus,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Minus,
} from "lucide-react";
import { StatsCard } from "./components/StatsCard/StatsCard";
import { RecentActivity } from "./components/RecentActivity/RecentActivity";
import { UpcomingReviews } from "./components/UpcomingReviews/UpcomingReviews";
import { PendingNominations } from "./components/PendingNominations/PendingNominations";
import { ReviewCycleProgress } from "./components/ReviewCycleProgress/ReviewCycleProgress";
import "./Dashboard.css";

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Active Review Cycle",
      value: "Q4 2024",
      change: "15 days remaining",
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      trend: "neutral",
      description: "Current performance review period",
      color: "blue",
    },
    {
      title: "Pending Reviews",
      value: "24",
      change: "8 require immediate attention",
      icon: <ClipboardCheck className="h-6 w-6 text-amber-600" />,
      trend: "down",
      description: "Reviews awaiting completion",
      color: "amber",
      alert: true,
    },
    {
      title: "Pending Nominations",
      value: "12",
      change: "4 new nominations received",
      icon: <UserPlus className="h-6 w-6 text-emerald-600" />,
      trend: "up",
      description: "Reviewer nominations pending approval",
      color: "emerald",
    },
    {
      title: "Review Requests",
      value: "18",
      change: "6 pending acceptance",
      icon: <AlertCircle className="h-6 w-6 text-purple-600" />,
      trend: "neutral",
      description: "Review requests awaiting response",
      color: "purple",
    },
  ];

  const getTrendIcon = (trend: string, color: string) => {
    const baseClasses = `h-4 w-4 text-${color}-600`;
    switch (trend) {
      case 'up':
        return <ChevronUp className={baseClasses} />;
      case 'down':
        return <ChevronDown className={baseClasses} />;
      default:
        return <Minus className={baseClasses} />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Performance Review Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and manage your team's review cycle progress
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-5 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="w-0 flex-1">
                <dt className="truncate text-sm font-medium text-gray-500">
                  {stat.title}
                </dt>
                <dd className="mt-2">
                  <div className="flex items-baseline">
                    <p className={`text-2xl font-semibold text-${stat.color}-600`}>
                      {stat.value}
                    </p>
                    <div className="flex items-center ml-2">
                      {getTrendIcon(stat.trend, stat.color)}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {stat.description}
                  </p>
                </dd>
              </div>
              <div className={`rounded-full p-3 bg-${stat.color}-50`}>
                {stat.icon}
              </div>
            </div>
            {stat.change && (
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-2">
                <div className="text-sm">
                  {stat.alert ? (
                    <span className="font-medium text-amber-600">
                      {stat.change}
                    </span>
                  ) : (
                    <span className="text-gray-500">{stat.change}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* First row of panels */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity />
        <UpcomingReviews />
      </div>

      {/* Second row of panels */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ReviewCycleProgress />
        <PendingNominations />
      </div>
    </div>
  );
};
