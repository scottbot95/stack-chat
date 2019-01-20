export const throttle = (func, minTimeout = 0) => {
  let lastRun = new Date(0);
  return (...args) => {
    const now = new Date();
    if (now - lastRun >= minTimeout) {
      lastRun = now;
      return func(...args);
    }
  };
};
