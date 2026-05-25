import React, { useEffect } from 'react';

export default function Root({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('../mocks/browser').then(({ worker }) => {
      worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/raast-openconnect-docs/mockServiceWorker.js',
        },
      });
    });
  }, []);

  return <>{children}</>;
}
