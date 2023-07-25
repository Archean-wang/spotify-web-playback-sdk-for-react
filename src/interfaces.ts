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
interface SpotifyPlayer {
  connect: () => Promise<Boolean>;
  disconnect: () => void;
  addListener: (event: string, cb: Function) => Boolean;
  removeListener: (event: string, cb?: Function) => Boolean;
  getCurrentState: () => Promise<WebPlaybackState>;
  setName: (name: String) => Promise<undefined>;
  getVolume: () => Promise<number>;
  setVolume: (volume: number) => Promise<undefined>;
  pause: () => Promise<undefined>;
  resume: () => Promise<undefined>;
  togglePlay: () => Promise<undefined>;
  seek: () => Promise<undefined>;
  previousTrack: () => Promise<undefined>;
  nextTrack: () => Promise<undefined>;
  activateElement: () => Promise<undefined>;
}

export {
  SpotifyPlayer,
  WebPlaybackError,
  WebPlaybackPlayer,
  WebPlaybackState,
  WebPlaybackTrack,
};
