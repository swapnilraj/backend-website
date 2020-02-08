import React from "react";

export const Keys = {
  escape: 27
};

type KeyeventHandler = (e: KeyboardEvent) => void;

const event = "keyup";

export const useKey = (
  keyCode: number,
  handler: KeyeventHandler,
  el: HTMLElement | Window = window
) => {
  const eventHandler = React.useCallback(
    (e: Event) => {
      if ((e as KeyboardEvent).keyCode === keyCode) {
        handler(e as KeyboardEvent);
      }
    },
    [keyCode, handler]
  );

  React.useEffect(() => {
    el.addEventListener(event, eventHandler);
    return () => el.removeEventListener(event, eventHandler);
  }, [el, eventHandler]);
};
