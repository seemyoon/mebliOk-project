export function IsEmail(email: string): boolean {
  return /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email);
}

export function IsPhoneNumber(IsPhoneNumber: string): boolean {
  return /^\+?\d{10,15}$/.test(IsPhoneNumber);
}
