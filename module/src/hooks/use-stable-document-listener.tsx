import { useEffect, useRef } from "react";

/**
 * Runs `handler` once on subscribe, then whenever `document` fires `type`, keeping exactly
 * one listener registered per hook instance.
 *
 * The ref lets the listener stay subscribed across renders without ever reading a stale
 * closure, so consumers never re-register.
 */
export default function useStableDocumentListener(
  type: string,
  handler: () => void,
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    handlerRef.current();

    const listener = () => handlerRef.current();

    document.addEventListener(type, listener);

    return () => {
      document.removeEventListener(type, listener);
    };
  }, [type]);
}
