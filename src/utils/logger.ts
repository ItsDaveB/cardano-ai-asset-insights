class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  info(message: string, ...optionalParams: any[]) {
    console.log(`[INFO] [${this.getTimestamp()}] ${message}`, ...optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    console.warn(`[WARN] [${this.getTimestamp()}] ${message}`, ...optionalParams);
  }

  error(message: string, ...optionalParams: any[]) {
    console.error(`[ERROR] [${this.getTimestamp()}] ${message}`, ...optionalParams);
  }

  debug(message: string, ...optionalParams: any[]) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] [${this.getTimestamp()}] ${message}`, ...optionalParams);
    }
  }
}

export default new Logger();
