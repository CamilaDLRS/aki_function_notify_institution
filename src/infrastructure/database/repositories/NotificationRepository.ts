import { NotificationModel } from '../models/NotificationModel';
import { Notification } from '../../../domain/entities/Notification';

export class NotificationRepository {
  async insert(notification: Notification): Promise<number> {
    // Always use current JS Date for created_at
    const created = await NotificationModel.create({
      class_id: notification.class_id,
      teacher_id: notification.teacher_id,
      message: notification.message,
    });
    const result = created.toJSON();
    return result.id!;
  }
}
