import React, { createContext, useContext, useEffect, useState } from "react";
import { useSpotifyPlayer } from ".";
import { WebPlaybackState } from "./interfaces";

const CurrentPositionContext = createContext<undefined | number>(undefined);

export default function CurrentPosition({
  children,
}: {
  children: React.ReactNode;
}) {
  const player = useSpotifyPlayer();
  const [state, setState] = useState<WebPlaybackState | null>(null);

  useEffect(() => {
    if (player) {
      let t = setInterval(
        () => player.getCurrentState().then((res) => setState(res)),
        100
      );
      return () => clearInterval(t);
    }
  }, [player]);

  return (
    <CurrentPositionContext.Provider value={state?.position}>
      {children}
    </CurrentPositionContext.Provider>
  );
}

export function usePosition() {
  return useContext(CurrentPositionContext);
}
