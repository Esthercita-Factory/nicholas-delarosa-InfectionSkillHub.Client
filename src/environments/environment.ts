/**
 * Production (`ng build`): the client and the API are published behind the same origin,
 * so the API lives under /api (in Docker, Nginx proxies it).
 */
export const environment = {
  apiUrl: '/api/v1',
  /** InfectionSkillHub works on Bogotá time (UTC-05:00, no daylight saving time). */
  timeZone: '-0500'
};
