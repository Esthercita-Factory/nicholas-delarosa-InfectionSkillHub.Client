/**
 * localStorage wrapped in try/catch: in private mode or with storage blocked it can throw,
 * and the client must keep working (just without remembering anything).
 */
export const storage = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },

  set(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Without storage the session lasts as long as the tab.
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // Nothing to clean.
    }
  }
};
