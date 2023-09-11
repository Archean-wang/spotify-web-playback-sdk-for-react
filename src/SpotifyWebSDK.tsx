import { createContext, memo, useContext, useEffect, useState } from "react";
import SpotifyPlayer, { SpotifyWebSDKProps } from "./SpotifyPlayer";

const SDKReadyContext = createContext(false);

function SpotifyWebSDK({
  name,
  getOAuthToken,
  volume,
  children,
  enableMediaSession = false,
}: SpotifyWebSDKProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      setReady(true);
    };
    return () => {
      document.body.removeChild(script);
      setReady(false);
    };
  }, []);

  return (
    <SDKReadyContext.Provider value={ready}>
      <SpotifyPlayer
        name={name}
        getOAuthToken={getOAuthToken}
        volume={volume}
        enableMediaSession={enableMediaSession}>
        {children}
      </SpotifyPlayer>
    </SDKReadyContext.Provider>
  );
}

export function useSDKReady() {
  const ready = useContext(SDKReadyContext);
  return ready;
}

export default memo(SpotifyWebSDK);
