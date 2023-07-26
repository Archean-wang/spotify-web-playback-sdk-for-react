import Player from "./Player";
import { SpotifyWebSDK } from "spotify-web-playback-sdk-for-react";
import "./App.css";

export default function App() {
  return (
    <SpotifyWebSDK
      name="spotify-react"
      getOAuthToken={(cb) =>
        cb(
          "BQAivvnvXCuHFBfJpZcI1cJJU5iMhWIeDdsG3-aKtfD3r3LuWMO3n_Peh9xaBlBl3adfU1GLWR3U18oUApnqR507VhFgUM2bKnyqTwiIJ5nZUzM2Q5mda5p4cR8HknSzOKvaANqzIba1mzbPPHDHJfFecHg5C9EM2wjVaQgfAD1wq-QnTTWVCE3fhnrXMiSfKifL_5IZ-EZrNQvrWi-YGi_hfKj1URa7xH9qZHuORoNNAW3A_zCNkdBCodNo1tP0UxPe2-9jV6bidgCcU1wRLdpujhryX4IRK0qPqL3ckITnaF0GRQjz_wgU01XLZo_T0DHC6zs-4X-fylua"
        )
      }>
      <Player />
    </SpotifyWebSDK>
  );
}
