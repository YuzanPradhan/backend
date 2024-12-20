import React from 'react';
import { Clock, CheckCircle2, AlertCircle, Users, FileText, UserCheck } from 'lucide-react';
import './ReviewCycleProgress.css';

interface Stage {
  name: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  dueDate: string;
  completionRate?: number;
  icon: React.ReactNode;
}

export const ReviewCycleProgress: React.FC = () => {
  const stages: Stage[] = [
    {
      name: 'Peer Nomination',
      description: 'Select peers for review feedback',
      status: 'completed',
      dueDate: '2024-03-15',
      completionRate: 100,
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: 'Nomination Acceptance',
      description: 'Peers accept or decline review requests',
      status: 'current',
      dueDate: '2024-03-22',
      completionRate: 65,
      icon: <UserCheck className="h-5 w-5" />,
    },
    {
      name: 'Review Submission',
      description: 'Complete and submit peer reviews',
      status: 'upcoming',
      dueDate: '2024-04-05',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: 'Manager Review',
      description: 'Manager assessment and feedback',
      status: 'upcoming',
      dueDate: '2024-04-15',
      icon: <UserCheck className="h-5 w-5" />,
    },
    {
      name: 'Final Assessment',
      description: 'Review completion and final evaluation',
      status: 'upcoming',
      dueDate: '2024-04-30',
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
  ];

  const getStageIcon = (status: Stage['status'], icon: React.ReactNode) => {
    const baseClasses = "stage-icon-inner";
    switch (status) {
      case 'completed':
        return <div className={`${baseClasses} completed`}>{icon}</div>;
      case 'current':
        return <div className={`${baseClasses} current`}>{icon}</div>;
      case 'upcoming':
        return <div className={`${baseClasses} upcoming`}>{icon}</div>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <div className="review-cycle-progress">
      <div className="card-header">
        <div className="header-content">
          <Clock className="h-5 w-5 text-indigo-500" />
          <h2 className="card-title">Review Cycle Progress</h2>
        </div>
        <div className="cycle-info">Q4 2024</div>
      </div>

      <div className="stages-timeline">
        {stages.map((stage, index) => (
          <div
            key={stage.name}
            className={`stage-item ${stage.status}`}
          >
            <div className="stage-icon">
              {getStageIcon(stage.status, stage.icon)}
            </div>
            <div className="stage-content">
              <div className="stage-header">
                <h3 className="stage-name">{stage.name}</h3>
                <span className="stage-date">{formatDate(stage.dueDate)}</span>
              </div>
              <p className="stage-description">{stage.description}</p>
              {stage.completionRate !== undefined && (
                <div className="completion-bar">
                  <div
                    className="completion-progress"
                    style={{ width: `${stage.completionRate}%` }}
                  />
                  <div className="completion-details">
                    <span className="completion-text">
                      {stage.completionRate}% Complete
                    </span>
                    {stage.status === 'current' && (
                      <span className="stage-status">In Progress</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
