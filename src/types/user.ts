export type User = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nationalId: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  studentId: string | null;
  disabilityStatus: string;
  revolutionaryContribution: string;
  googleId: string | null;
};

export type JWTPayload = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  iat?: number;
  exp?: number;
};
