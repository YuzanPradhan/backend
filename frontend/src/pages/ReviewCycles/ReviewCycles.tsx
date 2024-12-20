import React, { useState, useEffect } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import reviewCycleService, { ReviewCycle, CreateReviewCycleDto } from '../../services/reviewCycleService';
import { format } from 'date-fns';
import './ReviewCycles.css';

interface ReviewCycleFormData {
  start_date: string;
  end_date: string;
  status: 'draft' | 'active' | 'completed';
}

export const ReviewCycles: React.FC = () => {
  const [reviewCycles, setReviewCycles] = useState<ReviewCycle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCycle, setEditingCycle] = useState<ReviewCycle | null>(null);
  const [formData, setFormData] = useState<ReviewCycleFormData>({
    start_date: '',
    end_date: '',
    status: 'draft',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviewCycles();
  }, []);

  const fetchReviewCycles = async () => {
    try {
      setLoading(true);
      const data = await reviewCycleService.getAllReviewCycles();
      setReviewCycles(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch review cycles');
      console.error('Error fetching review cycles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (cycle?: ReviewCycle) => {
    if (cycle) {
      setEditingCycle(cycle);
      setFormData({
        start_date: format(new Date(cycle.start_date), 'yyyy-MM-dd'),
        end_date: format(new Date(cycle.end_date), 'yyyy-MM-dd'),
        status: cycle.status,
      });
    } else {
      setEditingCycle(null);
      setFormData({
        start_date: '',
        end_date: '',
        status: 'draft',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCycle(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCycle) {
        await reviewCycleService.updateReviewCycle(editingCycle.cycle_id, formData);
      } else {
        await reviewCycleService.createReviewCycle(formData as CreateReviewCycleDto);
      }
      await fetchReviewCycles();
      handleCloseModal();
    } catch (err) {
      console.error('Error saving review cycle:', err);
      setError('Failed to save review cycle');
    }
  };

  const getStatusClass = (status: ReviewCycle['status']) => {
    switch (status) {
      case 'draft':
        return 'status-draft';
      case 'active':
        return 'status-active';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="review-cycles-container">
      <div className="review-cycles-header">
        <h1 className="review-cycles-title">Review Cycles</h1>
        <p className="review-cycles-description">
          Manage and track performance review cycles across your organization.
        </p>
        <div className="review-cycles-actions">
          <Button
            variant="primary"
            onClick={() => handleOpenModal()}
            icon={<PlusIcon className="h-5 w-5" />}
          >
            Create Review Cycle
          </Button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="review-cycles-list">
        {reviewCycles.map((cycle) => (
          <div key={cycle.cycle_id} className="cycle-card">
            <div className="cycle-header">
              <h3 className="cycle-title">Review Cycle #{cycle.cycle_id}</h3>
              <span className={`cycle-status ${getStatusClass(cycle.status)}`}>
                {cycle.status}
              </span>
            </div>

            <div className="cycle-info">
              <div className="cycle-info-item">
                <span className="cycle-info-label">Start Date</span>
                <span className="cycle-info-value">
                  {format(new Date(cycle.start_date), 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="cycle-info-item">
                <span className="cycle-info-label">End Date</span>
                <span className="cycle-info-value">
                  {format(new Date(cycle.end_date), 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="cycle-info-item">
                <span className="cycle-info-label">Created</span>
                <span className="cycle-info-value">
                  {format(new Date(cycle.created_at), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>

            <div className="cycle-actions">
              <Button
                variant="secondary"
                onClick={() => handleOpenModal(cycle)}
                icon={<PlusIcon className="h-5 w-5" />}
              >
                Edit Cycle
              </Button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingCycle ? 'Edit Review Cycle' : 'Create Review Cycle'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="start_date">Start Date</label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="end_date">End Date</label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="modal-actions">
                <Button variant="secondary" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editingCycle ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
