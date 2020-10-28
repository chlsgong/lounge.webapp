// Not 100% accurate but close enough
export const getExpirationMs = expiresIn => {
  if (!expiresIn) return 0;

  const current = Date.now();
  const expiresInMs = expiresIn * 1000;
  return current + expiresInMs;
};
