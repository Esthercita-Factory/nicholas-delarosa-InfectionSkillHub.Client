import { safeReturnUrl } from './Login.Component';

describe('safeReturnUrl', () => {
  it('keeps internal routes', () => {
    expect(safeReturnUrl('/my-enrollments')).toBe('/my-enrollments');
  });

  it('ignores external or empty destinations', () => {
    expect(safeReturnUrl('https://evil.example')).toBe('/workshops');
    expect(safeReturnUrl('//evil.example')).toBe('/workshops');
    expect(safeReturnUrl(undefined)).toBe('/workshops');
  });
});
