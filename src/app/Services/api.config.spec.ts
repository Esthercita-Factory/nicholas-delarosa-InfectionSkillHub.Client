import { HttpErrorResponse } from '@angular/common/http';
import { fieldErrors, problemMessage } from './api.config';

describe('problemMessage', () => {
  it('uses the detail of the ProblemDetails', () => {
    const error = new HttpErrorResponse({ status: 422, error: { detail: 'Workshop FOT-001 is full.' } });

    expect(problemMessage(error)).toBe('Workshop FOT-001 is full.');
  });

  it('falls back to the first field error', () => {
    const error = new HttpErrorResponse({ status: 400, error: { errors: { email: ['Enter a valid email.'] } } });

    expect(problemMessage(error)).toBe('Enter a valid email.');
  });

  it('explains when the server cannot be reached', () => {
    expect(problemMessage(new HttpErrorResponse({ status: 0 }))).toContain('no connection');
  });
});

describe('fieldErrors', () => {
  it('keeps the first message of each field', () => {
    const error = new HttpErrorResponse({ status: 409, error: { errors: { email: ['Taken.', 'Other.'] } } });

    expect(fieldErrors(error)).toEqual({ email: 'Taken.' });
  });
});
