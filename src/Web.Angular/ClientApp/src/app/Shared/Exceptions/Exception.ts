export class Exception {
  message: string;

  constructor();
  constructor(message: string);
  constructor(message?: string) {
    this.message = message ?? '';
  }
}
