export type UserProfileType = {
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  nationalId: string;
  studentId: string | null;
  disabilityStatus: boolean;
  revolutionaryContribution: boolean;
  balance: number;
  profilePicture: string | null;
  idVerification?: {
    national: {
      front: string | null;
      back: string | null;
      status: "verified" | null;
    };
    student: {
      front: string | null;
      back: string | null;
      status: "verified" | null;
    };
  };
};

export type ProfileFormType = {
  email: string;
  password?: string;
  confirmPassword?: string;
  address: string;
  phoneNumber: string;
  // studentId: string;
};

export interface ProfileData {
  passengerEmail: string;
  passengerFirstName: string;
  passengerMiddleName: string;
  passengerLastName: string;
  passengerPhone: string;
  passengerAddress: string;
  passengerDateOfBirth: string;
  nationalID: string;
  studentID: string | null;
  hasDisability: boolean;
  isRevolutionary: boolean;
}
