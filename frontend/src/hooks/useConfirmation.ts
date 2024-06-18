// hooks/useConfirmation.ts
import { useEffect } from 'react';

const useConfirmation = (isEnabled: boolean, message: string) => {
  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (!isEnabled) return; // No mostrar confirmación si no está habilitado
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      handler(event);
    };

    const handleRouteChange = (url: string) => {
      const result = window.confirm(message);
      if (!result) {
        window.history.pushState(null, '', url);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('hashchange', handleBeforeUnload);
    window.addEventListener('popstate', handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('hashchange', handleBeforeUnload);
      window.removeEventListener('popstate', handleBeforeUnload);
    };
  }, [isEnabled, message]);
};

export default useConfirmation;
