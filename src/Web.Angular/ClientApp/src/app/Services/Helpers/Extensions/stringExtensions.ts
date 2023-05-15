String.prototype.isNullOrEmpty = function (): boolean {
  return this === null || this === undefined || this === '';
};

String.prototype.isNotNullOrEmpty = function (): boolean {
  return !this.isNullOrEmpty();
};

String.prototype.isNumber = function (): boolean {
  if (this.isNullOrEmpty()) {
    return false;
  }

  return !isNaN(Number(this));
};

String.prototype.isValidEmail = function (): boolean {
  if (this.isNullOrEmpty()) {
    return false;
  }

  const emailRegex = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
  return emailRegex.test(this as string);
};

String.prototype.isValidPhoneNumber = function (): boolean {
  if (this.isNullOrEmpty()) {
    return false;
  }

  const phoneRegex = new RegExp(
    /^(\+?)(\d{2})(\s?)(\d{3})(\s?)(\d{3})(\s?)(\d{3})$/
  );
  return phoneRegex.test(this as string);
};

String.prototype.isNotValidPhoneNumber = function (): boolean {
  return !this.isValidPhoneNumber();
};
