import React, { createContext, useContext, useEffect, useState } from "react";
import { useSDKReady } from "./SpotifyWebSDK";
import {
  SpotifyPlayer,
  WebPlaybackError,
  WebPlaybackPlayer,
} from "./interfaces";

export interface SpotifyWebSDKProps {
  name: string;
  getOAuthToken: (cb: Function) => void;
  volume?: number;
  children?: React.ReactNode;
}

const PlayerContext = createContext<SpotifyPlayer | null>(null);
const DeviceContext = createContext<WebPlaybackPlayer | null>(null);
const ErrorContext = createContext<string | undefined>(undefined);

export default function SpotifyPlayer({
  name,
  getOAuthToken,
  volume,
  children,
}: SpotifyWebSDKProps) {
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [device, setDevice] = useState<WebPlaybackPlayer | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const SDKReady = useSDKReady();

  function onReady(webPlaybackPlayer: WebPlaybackPlayer) {
    setDevice(webPlaybackPlayer);
    console.log("Ready with Device ID", webPlaybackPlayer.device_id);
  }

  function onNotReady({ device_id }: WebPlaybackPlayer) {
    console.log("Device ID has gone offline", device_id);
  }

  function onAutoPlayFailed({ device_id }: WebPlaybackPlayer) {
    console.warn(device_id, "autoplay failed");
  }

  function onInitializationError({ message }: WebPlaybackError) {
    setError(`Failed to initialize ${message}`);
  }

  function onAuthenticationError({ message }: WebPlaybackError) {
    setError(`Failed to authenticate ${message}`);
  }

  function onAccountError({ message }: WebPlaybackError) {
    setError(`Failed to validate Spotify account ${message}`);
  }

  function onPlaybackError({ message }: WebPlaybackError) {
    setError(`Failed to perform playback ${message}`);
  }

  useEffect(() => {
    if (SDKReady) {
      //@ts-ignore
      const player = new window.Spotify.Player({
        name: name,
        getOAuthToken: getOAuthToken,
        volume: volume ? volume : 0.5,
      }) as SpotifyPlayer;

      setPlayer(player);

      player.addListener("ready", onReady);

      player.addListener("not_ready", onNotReady);

      player.addListener("autoplay_failed", onAutoPlayFailed);

      player.addListener("initialization_error", onInitializationError);

      player.addListener("authentication_error", onAuthenticationError);

      player.addListener("playback_error", onPlaybackError);

      player.addListener("account_error", onAccountError);

      player.connect();
    }
    return () => {
      if (player) {
        player.removeListener("ready");
        player.removeListener("not_ready");
        player.removeListener("autoplay_failed");
        player.removeListener("initialization_error");
        player.removeListener("authentication_error");
        player.removeListener("playback_error");
        player.removeListener("account_error");

        player.disconnect();
      }
    };
  }, [SDKReady]);

  return (
    <PlayerContext.Provider value={player}>
      <DeviceContext.Provider value={device}>
        <ErrorContext.Provider value={error}>{children}</ErrorContext.Provider>
      </DeviceContext.Provider>
    </PlayerContext.Provider>
  );
}

export function useSpotifyPlayer() {
  return useContext(PlayerContext);
}

export function useSpotifyDevice() {
  return useContext(DeviceContext);
}

export function useSpotifyError() {
  return useContext(ErrorContext);
}
