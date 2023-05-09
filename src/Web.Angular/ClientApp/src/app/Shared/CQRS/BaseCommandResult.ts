import { Exception } from "../Exceptions/Exception";
export class BaseCommandResult<T = null> {
  value: T | null;
  isSucceeded: boolean;
  hasValue: boolean;
  isFailed: boolean;
  hasException: boolean;
  exception: Exception | null;
  errorMessage: string | null;

  constructor();
  constructor(value: T);
  constructor(value?: T) {
    this.value = value ?? null;
    this.isSucceeded = false;
    this.hasValue = value != null;
    this.isFailed = false;
    this.hasException = false;
    this.exception = null;
    this.errorMessage = null;
  }
}
