export interface Task {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at?: string | null;
  status: boolean;
}