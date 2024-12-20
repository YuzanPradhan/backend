import axios from "../config/axios";

export interface ReviewCycle {
  cycle_id: number;
  start_date: string;
  end_date: string;
  status: 'draft' | 'active' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface CreateReviewCycleDto {
  start_date: string;
  end_date: string;
  status: 'draft' | 'active' | 'completed';
}

class ReviewCycleService {
  private baseUrl = '/review-cycles';

  async getAllReviewCycles(): Promise<ReviewCycle[]> {
    const response = await axios.get<ReviewCycle[]>(this.baseUrl);
    return response.data;
  }

  async getReviewCycle(id: number): Promise<ReviewCycle> {
    const response = await axios.get<ReviewCycle>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async createReviewCycle(data: CreateReviewCycleDto): Promise<ReviewCycle> {
    const response = await axios.post<ReviewCycle>(this.baseUrl, data);
    return response.data;
  }

  async updateReviewCycle(id: number, data: Partial<CreateReviewCycleDto>): Promise<ReviewCycle> {
    const response = await axios.patch<ReviewCycle>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async deleteReviewCycle(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }
}

export default new ReviewCycleService();
