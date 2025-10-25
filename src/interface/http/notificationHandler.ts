import { NotificationRepository } from '../../infrastructure/database/repositories/NotificationRepository';
import { notificationSchema } from '../validators/notificationValidator';
import { publishInstitutionAlert } from '../../infrastructure/messaging/publisher';
import { log } from '../../shared/logger';
import { Notification } from '../../domain/entities/Notification';


export async function notificationHandler(context: any, req: any) {
  const correlationId = req.headers['x-correlation-id'] || Date.now().toString();
  try {
    const result = notificationSchema.safeParse(req.body);
    if (!result.success) {
      log('error', 'Validation failed', { correlationId, errors: result.error.errors });
      context.res = { status: 400, body: { message: 'Invalid payload', errors: result.error.errors } };
      return;
    }

    const notification: Notification = {
      class_id: Number(result.data.class_id),
      teacher_id: result.data.teacher_id,
      message: result.data.message,
    };

    const repo = new NotificationRepository();
    const id = await repo.insert(notification);

    await publishInstitutionAlert({
      notification_id: id,
      ...notification,
    });

    log('info', 'Notification processed', { correlationId, id });

    context.res = {
      status: 201,
      body: {
        status: 'received',
        notification_id: id,
        published_to_bus: true
      }
    };
  } catch (err) {
    log('error', 'Internal error', { correlationId, error: err });
  context.res = { status: 500, body: { message: 'Internal server error', error: err instanceof Error ? err.message : String(err) } };
  }
}
