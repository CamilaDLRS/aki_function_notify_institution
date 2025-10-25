export interface Notification {
  id?: number;
  class_id: number;
  teacher_id: number;
  message: string;
  created_at?: Date;
}
