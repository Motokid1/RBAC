// Regular expression for password validation
// Requires:
// - At least 8 characters
// - At least one uppercase letter
// - At least one lowercase letter
// - At least one number
// - At least one special character (#?!@$%^&*-)
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return passwordRegex.test(password);
};

// Regular expression for Gmail validation
// Only accepts email addresses ending with @gmail.com
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return emailRegex.test(email);
};

// User-friendly error message for password requirements
export const getPasswordErrorMessage = (): string => {
  return 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character (#?!@$%^&*-)';
};

// User-friendly error message for email requirements
export const getEmailErrorMessage = (): string => {
  return 'Please enter a valid Gmail address';
};