import React, { createContext, useContext, useEffect, useState } from "react";
import { useSDKReady } from "./SpotifyWebSDK";
import {
  SpotifyPlayerInstance,
  WebPlaybackError,
  WebPlaybackPlayer,
  WebPlaybackState,
  WebPlaybackTrack,
} from "./interfaces";

export interface SpotifyWebSDKProps {
  name: string;
  getOAuthToken: (cb: Function) => void;
  volume?: number;
  children?: React.ReactNode;
  enableMediaSession?: boolean;
}

const PlayerContext = createContext<SpotifyPlayerInstance | null>(null);
const DeviceContext = createContext<WebPlaybackPlayer | null>(null);
const ErrorContext = createContext<string | undefined>(undefined);
const WebPlaybackStateContext = createContext<WebPlaybackState | null>(null);
const CurrentTrackContext = createContext<WebPlaybackTrack | undefined>(
  undefined
);

export default function SpotifyPlayer({
  name,
  getOAuthToken,
  volume,
  children,
  enableMediaSession,
}: SpotifyWebSDKProps) {
  const [player, setPlayer] = useState<SpotifyPlayerInstance | null>(null);
  const [device, setDevice] = useState<WebPlaybackPlayer | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [state, setState] = useState<WebPlaybackState | null>(null);
  const SDKReady = useSDKReady();

  function onReady(webPlaybackPlayer: WebPlaybackPlayer) {
    setDevice(webPlaybackPlayer);
    console.log("Ready with Device ID", webPlaybackPlayer.device_id);
  }

  function onNotReady({ device_id }: WebPlaybackPlayer) {
    setError(`Device ID ${device_id} has gone offline`);
  }

  function onAutoPlayFailed({ device_id }: WebPlaybackPlayer) {
    setError(`Device ${device_id} autoplay failed`);
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

  function onPlayerStateChanged(state: WebPlaybackState) {
    setState(state);
  }

  useEffect(() => {
    if (SDKReady) {
      const player = new window.Spotify.Player({
        name: name,
        getOAuthToken: getOAuthToken,
        volume: volume ? volume : 0.5,
        enableMediaSession,
      });

      setPlayer(player);

      player.addListener("ready", onReady);

      player.addListener("not_ready", onNotReady);

      player.addListener("autoplay_failed", onAutoPlayFailed);

      player.addListener("initialization_error", onInitializationError);

      player.addListener("authentication_error", onAuthenticationError);

      player.addListener("playback_error", onPlaybackError);

      player.addListener("account_error", onAccountError);

      player.addListener("player_state_changed", onPlayerStateChanged);

      player.connect();

      return () => {
        player.removeListener("ready");
        player.removeListener("not_ready");
        player.removeListener("autoplay_failed");
        player.removeListener("initialization_error");
        player.removeListener("authentication_error");
        player.removeListener("playback_error");
        player.removeListener("account_error");

        player.disconnect();
      };
    }
  }, [SDKReady]);

  return (
    <PlayerContext.Provider value={player}>
      <DeviceContext.Provider value={device}>
        <ErrorContext.Provider value={error}>
          <WebPlaybackStateContext.Provider value={state}>
            <CurrentTrackContext.Provider
              value={state?.track_window.current_track}>
              {children}
            </CurrentTrackContext.Provider>
          </WebPlaybackStateContext.Provider>
        </ErrorContext.Provider>
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

export function useSpotifyState() {
  return useContext(WebPlaybackStateContext);
}

export function useCurrentTrack() {
  return useContext(CurrentTrackContext);
}
