
export function log(level: string, message: string, meta?: object) {
  if (process.env.LOG_LEVEL === 'info' || level === 'error') {
    console.log(JSON.stringify({ level, message, ...meta }));
  }
}
