import { ServiceBusClient } from '@azure/service-bus';

export async function publishInstitutionAlert(message: object) {
  const sbClient = new ServiceBusClient(String(process.env.SERVICE_BUS_CONNECTION_STRING));
  const sender = sbClient.createSender(process.env.SERVICE_BUS_QUEUE_NAME || 'notify_institution');
  try {
    await sender.sendMessages({ body: message });
  } finally {
    await sender.close();
  }
}
