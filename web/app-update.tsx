import { useEffect, useState } from "react";

export function AppUpdate() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((r) => {
        setRegistration(r);
      });
    }
  }, []);

  useEffect(() => {
    if (!registration) return;

    registration.addEventListener("updatefound", updateFoundHandler);

    const updateCheck = setInterval(registration.update.bind(registration), 60 * 60 * 1000);

    return () => {
      registration.removeEventListener("updatefound", updateFoundHandler);
      clearInterval(updateCheck);
    };

    function updateFoundHandler(this: ServiceWorkerRegistration) {
      setUpdateAvailable(true);
    }
  }, [registration]);

  return (
    <div>
      <p>Service worker ready: {registration ? "YES" : "NO"}</p>
      {updateAvailable ? (
        <div>
          <p>A new version is available. Please refresh the page.</p>
        </div>
      ) : (
        <div>
          <p>
            <button
              type="button"
              disabled={!registration}
              onClick={() => {
                registration?.update();
              }}
            >
              Check update
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
