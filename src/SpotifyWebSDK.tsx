import React, { createContext, useContext, useEffect, useState } from "react";
import SpotifyPlayer, { SpotifyWebSDKProps } from "./SpotifyPlayer";
import CurrentPosition from "./CurrentPosition";

const SDKReadyContext = createContext(false);

export default function ({
  name,
  getOAuthToken,
  volume,
  children,
}: SpotifyWebSDKProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);

    //@ts-ignore
    window.window.onSpotifyWebPlaybackSDKReady = () => {
      setReady(true);
    };
    return () => {
      document.body.removeChild(script);
      setReady(false);
    };
  }, []);

  return (
    <SDKReadyContext.Provider value={ready}>
      <SpotifyPlayer name={name} getOAuthToken={getOAuthToken} volume={volume}>
        <CurrentPosition>{children}</CurrentPosition>
      </SpotifyPlayer>
    </SDKReadyContext.Provider>
  );
}

export function useSDKReady() {
  const ready = useContext(SDKReadyContext);
  return ready;
}
