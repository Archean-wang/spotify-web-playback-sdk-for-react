import React, { createContext, useContext, useEffect, useState } from "react";
import { useSpotifyPlayer } from ".";
import { WebPlaybackState, WebPlaybackTrack } from "./interfaces";

const WebPlaybackStateContext = createContext<WebPlaybackState | null>(null);
const PositionContext = createContext<undefined | number>(undefined);
const CurrentTrackContext = createContext<WebPlaybackTrack | undefined>(
  undefined
);

export default function SpotifyPlayerState({
  children,
}: {
  children: React.ReactNode;
}) {
  const player = useSpotifyPlayer();
  const [state, setState] = useState<WebPlaybackState | null>(null);

  useEffect(() => {
    let t = 0;
    if (player) {
      t = setInterval(() => {
        player.getCurrentState().then((state) => {
          setState(state);
        });
      }, 100);
    }

    return () => {
      if (t) {
        clearInterval(t);
      }
    };
  }, [player]);

  return (
    <WebPlaybackStateContext.Provider value={state}>
      <PositionContext.Provider value={state?.position}>
        <CurrentTrackContext.Provider value={state?.track_window.current_track}>
          {children}
        </CurrentTrackContext.Provider>
      </PositionContext.Provider>
    </WebPlaybackStateContext.Provider>
  );
}

export function useSpotifyState() {
  return useContext(WebPlaybackStateContext);
}

export function usePosition() {
  return useContext(PositionContext);
}

export function useCurrentTrack() {
  return useContext(CurrentTrackContext);
}
