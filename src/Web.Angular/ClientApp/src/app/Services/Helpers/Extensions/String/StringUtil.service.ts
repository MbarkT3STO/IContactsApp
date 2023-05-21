import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringUtilService {
  constructor() {}

  /**
   * Checks if the value is null, undefined or empty.
   * @param value The value to check.
   * @returns True if the value is null, undefined or empty. False otherwise.
   **/
  IsNullOrEmpty(value: string): boolean {
    return value === null || value === undefined || value === '';
  }

  /**
   * Checks if the value is not null, undefined or empty.
   * @param value The value to check.
   * @returns True if the value is not null, undefined or empty. False otherwise.
   **/
  IsNotNullOrEmpty(value: string): boolean {
    return !this.IsNullOrEmpty(value);
  }

  /**
   * Checks if the value is a number.
   * @param value The value to check.
   * @returns True if the value is a number. False otherwise.
   * */
  IsNumber(value: string): boolean {
    if (this.IsNullOrEmpty(value)) {
      return false;
    }

    return !isNaN(Number(value));
  }

  /**
   * Checks if the value is a valid email.
   * @param value The value to check.
   * @returns True if the value is a valid email. False otherwise.
   * */
  IsValidEmail(value: string): boolean {
    if (this.IsNullOrEmpty(value)) {
      return false;
    }

    const emailRegex = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
    return emailRegex.test(value);
  }

  /**
   * Checks if the value is not a valid phone number.
   * @param value The value to check.
   * @returns True if the value is not a valid phone number. False otherwise.
   * */
  IsValidPhoneNumber(value: string): boolean {
    if (this.IsNullOrEmpty(value)) {
      return false;
    }

    const phoneRegex = new RegExp('^[0-9]{10}$');
    return phoneRegex.test(value);
  }

  /**
   * Checks if the value is not a valid phone number.
   * @param value The value to check.
   * @returns True if the value is not a valid phone number. False otherwise.
   * */
  IsNotValidPhoneNumber(value: string): boolean {
    return !this.IsValidPhoneNumber(value);
  }
}
