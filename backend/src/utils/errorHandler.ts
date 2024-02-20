export class ErrorHandler extends Error {
    status: number;
    constructor(message?: string, status?: number) {
      super();
      this.message = message || "Error";
      this.status = status || 500;
    }
  }
  