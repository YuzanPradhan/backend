import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ReviewList, ReviewQuestion } from '../components/ReviewList/ReviewList';
import { Button } from '../../../components/Button/Button';
import './ReviewDetail.css';

interface ReviewEmployee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  reviewStatus: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
}

// Mock data - In a real app, this would come from an API
const mockEmployees: Record<string, ReviewEmployee> = {
  '1': {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Engineering',
    role: 'Software Engineer',
    reviewStatus: 'pending',
    dueDate: '2024-02-15',
  },
  '2': {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    department: 'Design',
    role: 'UI/UX Designer',
    reviewStatus: 'in_progress',
    dueDate: '2024-02-20',
  },
};

const defaultQuestions: ReviewQuestion[] = [
  {
    id: '1',
    question: 'How well does the employee collaborate with others?',
    rating: 3,
  },
  {
    id: '2',
    question: 'Does the employee meet deadlines consistently?',
    rating: 3,
  },
  {
    id: '3',
    question: 'Is the employee proactive in addressing challenges?',
    rating: 3,
  },
  {
    id: '4',
    question: 'How effectively does the employee communicate with team members?',
    rating: 3,
  },
  {
    id: '5',
    question: 'Does the employee demonstrate leadership qualities when needed?',
    rating: 3,
  },
];

export const ReviewDetail: React.FC = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams<{ employeeId: string }>();
  const [questions, setQuestions] = useState<ReviewQuestion[]>(defaultQuestions);

  // In a real app, you would fetch the employee data from an API
  const employee = employeeId ? mockEmployees[employeeId] : null;

  if (!employee) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Employee not found</h2>
          <Button onClick={() => navigate('/reviews')} className="mt-4">
            Back to Reviews
          </Button>
        </div>
      </div>
    );
  }

  const handleRatingChange = (questionId: string, rating: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, rating } : q))
    );
  };

  const handleSubmit = () => {
    // Handle review submission
    console.log('Submitting review:', { employee, questions });
    navigate('/reviews');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/reviews')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Reviews
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Review for {employee.name}
          </h1>
          <div className="mt-2 text-gray-600">
            <p>{employee.role} • {employee.department}</p>
            <p className="text-sm">{employee.email}</p>
          </div>
        </div>

        <div className="mb-8">
          <ReviewList
            questions={questions}
            onRatingChange={handleRatingChange}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/reviews')}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
};
