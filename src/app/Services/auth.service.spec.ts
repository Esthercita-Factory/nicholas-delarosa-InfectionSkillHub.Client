import { AuthService, Session } from './auth.service';

describe('AuthService.isValid', () => {
  const session = (expiresAt: string): Session => ({
    token: 'token',
    expiresAt,
    user: { id: '1', fullName: 'Jorge Pérez', email: 'jorge.perez@correo.com', role: 'Participant' }
  });

  it('accepts a token that has not expired', () => {
    const now = Date.parse('2026-11-01T10:00:00Z');

    expect(AuthService.isValid(session('2026-11-01T12:00:00Z'), now)).toBe(true);
  });

  it('rejects a token about to expire (10 second margin)', () => {
    const now = Date.parse('2026-11-01T11:59:55Z');

    expect(AuthService.isValid(session('2026-11-01T12:00:00Z'), now)).toBe(false);
  });
});
