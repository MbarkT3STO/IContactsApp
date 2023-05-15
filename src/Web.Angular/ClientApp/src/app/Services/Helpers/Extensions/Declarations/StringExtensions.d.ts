declare global {
  interface String {
    /**
     * Checks if a string is null or empty.
     */
    isNullOrEmpty(): boolean;

    /**
     * Checks if a string is not null or empty.
     */
    isNotNullOrEmpty(): boolean;

    /**
     * Checks if a string is a number.
     */
    isNumber(): boolean;

    /**
     * Checks if a string is a valid email.
     */
    isValidEmail(): boolean;

    /**
     * Checks if a string is a valid phone number.
     */
    isValidPhoneNumber(): boolean;

    /**
     * Checks if a string is not a valid phone number.
     * @returns true if the string is not a valid phone number.
     */
    isNotValidPhoneNumber(): boolean;
  }
}

export {};
