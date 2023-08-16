interface SpotifyInitOptions {
  name: string;
  getOAuthToken: (cb: Function) => void;
  volume?: number;
  enableMediaSession?: boolean;
}

interface Window {
  Spotify: {
    Player: new (
      props: SpotifyInitOptions
    ) => import("./interfaces").SpotifyPlayerInstance;
  };
  // The onSpotifyWebPlaybackSDKReady method will be automatically called once the Web Playback SDK has successfully loaded.
  onSpotifyWebPlaybackSDKReady: Function;
}
