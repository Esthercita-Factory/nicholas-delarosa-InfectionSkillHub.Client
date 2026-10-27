/** Contracts of the InfectionSkillHub API (api/v1). Dates arrive as ISO 8601 strings in UTC. */

export const PARTICIPANT_ROLE = 'Participant';
export const EMPLOYEE_ROLE = 'Employee';

export type Role = typeof PARTICIPANT_ROLE | typeof EMPLOYEE_ROLE;

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  accessToken: string;
  expiresAt: string;
  user: UserProfile;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface Instructor {
  id: string;
  fullName: string;
  email: string;
  specialty: string;
}

export interface Workshop {
  id: string;
  code: string;
  title: string;
  description: string;
  instructor: Instructor;
  startsAt: string;
  endsAt: string;
  capacity: number;
  activeEnrollments: number;
  availableSeats: number;
  hasStarted: boolean;
}

export type EnrollmentStatus = 'Active' | 'Cancelled';

export interface EnrollmentWorkshop {
  id: string;
  code: string;
  title: string;
  instructorFullName: string;
  startsAt: string;
  endsAt: string;
}

export interface Enrollment {
  id: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  cancelledAt: string | null;
  cancelledBy: string | null;
  cancellationDeadline: string;
  canCancel: boolean;
  hasCertificate: boolean;
  participantId: string;
  participantFullName: string;
  participantEmail: string;
  workshop: EnrollmentWorkshop;
}

/** Error body of the API (RFC 9457). Validation errors also bring "errors" by field. */
export interface ProblemDetails {
  title?: string;
  status?: number;
  detail?: string;
  errors?: Record<string, string[]>;
}
