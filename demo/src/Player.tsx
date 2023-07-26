import "./Player.css";
import {
  useCurrentTrack,
  useSpotifyPlayer,
  useSpotifyState,
} from "spotify-web-playback-sdk-for-react";

function Player({ children }: { children?: React.ReactNode }) {
  const state = useSpotifyState();
  const player = useSpotifyPlayer();
  const currentTrack = useCurrentTrack();

  function previous() {
    player?.previousTrack();
  }

  function toggle() {
    player?.togglePlay();
  }

  function next() {
    player?.nextTrack();
  }

  return (
    <div className="container">
      <div className="info">
        <img src={currentTrack?.album.images[0].url}></img>
        <div className="current">
          <p className="trackName">{currentTrack?.name}</p>
          <p className="artistName">{currentTrack?.artists[0].name}</p>
        </div>
      </div>
      <div className="control">
        <button onClick={previous}>{`⮜`}</button>
        <button onClick={toggle}>
          {state == null || state.paused ? "▶" : "◉"}
        </button>
        <button onClick={next}>{`	⮞`}</button>
      </div>
      {children}
    </div>
  );
}

export default Player;
