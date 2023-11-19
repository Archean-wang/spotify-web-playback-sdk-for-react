export { default as SpotifyWebSDK } from "./SpotifyWebSDK";

export {
  useSpotifyPlayer,
  useSpotifyDevice,
  useSpotifyError,
  useSpotifyState,
  useCurrentTrack,
} from "./SpotifyPlayer";

export type {
  SpotifyPlayerInstance,
  WebPlaybackError,
  WebPlaybackPlayer,
  WebPlaybackState,
  WebPlaybackTrack,
} from './interfaces'