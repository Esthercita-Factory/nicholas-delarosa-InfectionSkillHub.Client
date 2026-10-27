import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProblemDetails } from '../Models/api.models';

/** API base: /api/v1 in production, http://localhost:5180/api/v1 in development. */
export const API_URL = environment.apiUrl;

/** Time zone used to show dates (InfectionSkillHub works on Bogotá time). */
export const TIME_ZONE = environment.timeZone;

/** Message to show for an HTTP error: the ProblemDetails "detail" or a generic one. */
export function problemMessage(error: unknown, fallback = 'The operation could not be completed. Try again.'): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return 'There is no connection with the server. Check that the API is running.';
    }

    const problem = error.error as ProblemDetails | null;
    const firstField = problem?.errors ? Object.values(problem.errors)[0]?.[0] : undefined;
    return problem?.detail ?? firstField ?? fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

/** Errors by field ({ email: '...' }) to show them next to each input. */
export function fieldErrors(error: unknown): Record<string, string> {
  if (!(error instanceof HttpErrorResponse)) {
    return {};
  }

  const errors = (error.error as ProblemDetails | null)?.errors ?? {};
  return Object.fromEntries(Object.entries(errors).map(([field, messages]) => [field, messages[0] ?? '']));
}
