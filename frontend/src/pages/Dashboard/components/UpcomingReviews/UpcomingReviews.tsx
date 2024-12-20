import React from 'react';
import { Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Review {
  id: string;
  employee: {
    name: string;
    avatar?: string;
    role: string;
  };
  dueDate: string;
  status: 'pending' | 'in_progress';
}

const upcomingReviews: Review[] = [
  {
    id: '1',
    employee: {
      name: 'Alice Johnson',
      avatar: 'https://picsum.photos/32/32?random=7',
      role: 'Frontend Developer',
    },
    dueDate: '2024-02-15',
    status: 'pending',
  },
  {
    id: '2',
    employee: {
      name: 'Bob Wilson',
      avatar: 'https://picsum.photos/32/32?random=8',
      role: 'Backend Developer',
    },
    dueDate: '2024-02-18',
    status: 'in_progress',
  },
  {
    id: '3',
    employee: {
      name: 'Carol Smith',
      avatar: 'https://picsum.photos/32/32?random=9',
      role: 'UI Designer',
    },
    dueDate: '2024-02-20',
    status: 'pending',
  },
];

export const UpcomingReviews: React.FC = () => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-200 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Reviews</h2>
          <button 
            onClick={() => navigate('/reviews')}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all
          </button>
        </div>
        
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {upcomingReviews.map((review) => (
              <li
                key={review.id}
                className="py-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                onClick={() => navigate(`/reviews/${review.id}`)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full ring-2 ring-white"
                      src={review.employee.avatar}
                      alt={review.employee.name}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {review.employee.name}
                      </p>
                      <div className="ml-2">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            review.status === 'in_progress'
                              ? 'bg-blue-50 text-blue-700 ring-blue-600/20'
                              : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                          }`}
                        >
                          {review.status === 'in_progress' ? 'In Progress' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">{review.employee.role}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Due {formatDate(review.dueDate)}</span>
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
