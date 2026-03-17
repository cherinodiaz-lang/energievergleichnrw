import { useRouteError } from "react-router";
import { useEffect, useRef } from "react";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ein unerwarteter Fehler ist aufgetreten.";
}

export default function ErrorPage() {
  const ref = useRef<HTMLDivElement>(null);
  const error = useRouteError();

  useEffect(() => {
    if (ref.current && import.meta.env.DEV) {
      const ErrorOverlay = window.customElements.get('vite-error-overlay');
      if (ErrorOverlay) {
        ref.current.appendChild(new ErrorOverlay(error, 'runtime'));
      }
    }
  }, [error]);

  if (!import.meta.env.DEV) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-lg text-center">
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
            Fehler
          </p>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
            Die Seite konnte nicht geladen werden.
          </h1>
          <p className="font-paragraph text-foreground/70">
            {getErrorMessage(error)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref}></div>
  );
};
