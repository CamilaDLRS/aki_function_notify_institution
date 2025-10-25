# AKI! Function – Notification (Student Not In Class)

## Purpose
Azure Function to receive, validate, persist, and publish notifications when a student attempts to check in to a class they are not assigned to.

## Flow
1. Receives HTTP POST from Core/BFF
2. Validates payload (Zod)
3. Persists notification in Azure SQL
4. Publishes event to Service Bus topic `institution.notifications`
5. Returns HTTP 201 with confirmation

## Setup
1. Clone repo
2. Copy `.env.example` to `.env` and fill in credentials
3. Run migration in Azure SQL:
   ```
   npm run migrate
   ```
4. Start locally:
   ```
   func start
   ```

## Example Request
```bash
curl -X POST https://aki-function-notify.azurewebsites.net/api/notification \
  -H "Content-Type: application/json" \
  -d '{
    "event_id": "671a1bdfc1234",
    "class_id": 12,
    "teacher_id": 45,
    "student_cpf": "12345678901",
    "type": "student_not_in_class",
    "message": "Student attempted to register presence but is not part of the class",
    "timestamp": "2025-10-23T13:12:00Z"
  }'
```

## Example Response
```json
{
  "status": "received",
  "notification_id": 1024,
  "published_to_bus": true
}
```

## Azure Bindings
See `src/function.json` for HTTP trigger and output bindings. Endpoint is `/api/notification`.

## Environment Variables
See `.env.example`.

## Logging
Structured logs with correlation IDs.

## Retry & Idempotency
Retries for SQL/Service Bus are handled in repository/publisher. Idempotency can be extended by checking for duplicate `event_id`.

## License
MIT
