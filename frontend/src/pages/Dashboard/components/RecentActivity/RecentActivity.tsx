import React from "react";
import { User, Clock, CheckCircle2, UserPlus, FileEdit } from "lucide-react";

interface Activity {
  id: string;
  type: "review_submitted" | "review_requested" | "employee_added";
  user: {
    name: string;
    avatar?: string;
    role?: string;
  };
  target?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  timestamp: string;
  department?: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "review_submitted",
    user: {
      name: "John Doe",
      avatar: "https://picsum.photos/32/32?random=1",
      role: "Senior Engineer",
    },
    target: {
      name: "Jane Smith",
      avatar: "https://picsum.photos/32/32?random=2",
      role: "Software Engineer",
    },
    timestamp: "2 hours ago",
    department: "Engineering",
  },
  {
    id: "2",
    type: "review_requested",
    user: {
      name: "Mike Johnson",
      avatar: "https://picsum.photos/32/32?random=3",
      role: "Design Lead",
    },
    target: {
      name: "Sarah Wilson",
      avatar: "https://picsum.photos/32/32?random=4",
      role: "UI Designer",
    },
    timestamp: "4 hours ago",
    department: "Design",
  },
  {
    id: "3",
    type: "employee_added",
    user: {
      name: "Admin User",
      avatar: "https://picsum.photos/32/32?random=5",
      role: "HR Manager",
    },
    target: {
      name: "New Employee",
      avatar: "https://picsum.photos/32/32?random=6",
      role: "Product Manager",
    },
    timestamp: "1 day ago",
    department: "Product",
  },
];

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "review_submitted":
      return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
    case "review_requested":
      return <FileEdit className="h-5 w-5 text-blue-500" />;
    case "employee_added":
      return <UserPlus className="h-5 w-5 text-purple-500" />;
  }
};

const getActivityMessage = (activity: Activity): string => {
  switch (activity.type) {
    case "review_submitted":
      return `submitted a performance review for`;
    case "review_requested":
      return `requested a review from`;
    case "employee_added":
      return `added`;
    default:
      return "";
  }
};

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-200 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View all
          </button>
        </div>

        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {activities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span
                      className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <img
                            className="h-6 w-6 rounded-full"
                            src={activity.user.avatar}
                            alt={activity.user.name}
                          />
                          <span className="font-medium text-gray-900">
                            {activity.user.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            • {activity.user.role}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center gap-1">
                          <span>{getActivityMessage(activity)}</span>
                          <div className="flex items-center gap-1">
                            <img
                              className="h-6 w-6 rounded-full"
                              src={activity.target?.avatar}
                              alt={activity.target?.name}
                            />
                            <span className="font-medium text-gray-900">
                              {activity.target?.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              • {activity.target?.role}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            {activity.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {activity.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
