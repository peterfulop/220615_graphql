type LoggerFn = {
  (msg: string, ...args: unknown[]): void;
  (obj: Record<string, unknown>, msg?: string, ...args: unknown[]): void;
};
export interface Logger {
  info: LoggerFn;
  fatal: LoggerFn;
  debug: LoggerFn;
  error: LoggerFn;
  warn: LoggerFn;
  child: (props: Record<string, unknown>) => Logger;
}
