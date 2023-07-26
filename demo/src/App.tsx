import Player from "./Player";
import { SpotifyWebSDK } from "spotify-web-playback-sdk-for-react";
import "./App.css";

export default function App() {
  return (
    <SpotifyWebSDK
      name="hahaha"
      getOAuthToken={(cb) =>
        cb(
          "BQD3uwCM32l5G7oYHF4ZXAjf0ynLwEPIm4AOcoXUnhiq1Um47FQVUTwl2USXrtVP7yF-GKecaAcKRk50mtgBedFuE1h-6kOsfri8eHUXHcoV35llnW1Vb_8FtyuPKqenqBUvalnEyD0Su_AuXweD9O_NKQviyjTpaXwVus6-o09Rr9lLaeOPEhgjziw58JF1bYNdgcWx2zIf9tqJ96aOok2HVM7OLBl4sJAIsa2a2NoVD8xnmO3I65PfOTlg3swgKOgKXjuQIAXCNbFtN6GRPHMvApLQOWfuVvxk5LCJQkhXNtVOdJJmzFrkEr89devcLAAiJXDxOgjmhviV"
        )
      }>
      <Player />
    </SpotifyWebSDK>
  );
}
