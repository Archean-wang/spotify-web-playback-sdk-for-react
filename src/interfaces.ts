interface WebPlaybackPlayer {
  device_id: string;
}

interface WebPlaybackError {
  message: string;
}

interface WebPlaybackTrack {
  uri: string;
  id: string | null;
  type: "track" | "episode" | "ad";
  media_type: "audio" | "video";
  name: string;
  is_playable: boolean;
  album: {
    uri: string;
    name: string;
    images: { url: string }[];
  };
  artists: { uri: string; name: string }[];
}

interface WebPlaybackState {
  context: {
    uri: string;
    metadata: {};
  };
  disallows: {
    pausing?: boolean;
    peeking_next?: boolean;
    peeking_prev?: boolean;
    resuming?: boolean;
    seeking?: boolean;
    skipping_next?: boolean;
    skipping_prev?: boolean;
  };
  duration: number;
  paused: boolean;
  position: number;
  repeat_mode: 0 | 1 | 2; // The repeat mode. No repeat mode is 0,
  // repeat context is 1 and repeat track is 2.
  shuffle: boolean; // True if shuffled, false otherwise.
  track_window: {
    current_track: WebPlaybackTrack;
    previous_tracks: WebPlaybackTrack[];
    next_tracks: WebPlaybackTrack[];
  };
}
interface SpotifyPlayerInstance {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addListener: (event: string, cb: Function) => boolean;
  removeListener: (event: string, cb?: Function) => boolean;
  getCurrentState: () => Promise<WebPlaybackState>;
  setName: (name: string) => Promise<undefined>;
  getVolume: () => Promise<number>;
  setVolume: (volume: number) => Promise<undefined>;
  pause: () => Promise<undefined>;
  resume: () => Promise<undefined>;
  togglePlay: () => Promise<undefined>;
  seek: (position: number) => Promise<undefined>;
  previousTrack: () => Promise<undefined>;
  nextTrack: () => Promise<undefined>;
  activateElement: () => Promise<undefined>;
}

export type {
  SpotifyPlayerInstance,
  WebPlaybackError,
  WebPlaybackPlayer,
  WebPlaybackState,
  WebPlaybackTrack,
};
