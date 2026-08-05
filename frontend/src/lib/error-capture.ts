let lastCapturedError: Error | null = null;

export function captureError(error: Error): void {
  lastCapturedError = error;
}

export function consumeLastCapturedError(): Error | null {
  const error = lastCapturedError;
  lastCapturedError = null;
  return error;
}

// Capture global errors
if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    captureError(event.error);
  });

  window.addEventListener("unhandledrejection", (event) => {
    captureError(new Error(`Unhandled rejection: ${event.reason}`));
  });
}
