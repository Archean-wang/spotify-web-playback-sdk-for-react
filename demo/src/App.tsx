import Player from "./Player";
import { SpotifyWebSDK } from "spotify-web-playback-sdk-for-react";
import "./App.css";

export default function App() {
  return (
    <SpotifyWebSDK
      name="spotify-react"
      getOAuthToken={(cb) =>
        cb(
          "BQCVpUDCLD0Pjh7tBCgnPj7Vn1fgH8OubYLJljXRP0gWlvfqVWXCLFCL9jJYxowxJ1V5caCatwmSqEboCd1of8iOcm7J3MK5IWhnvtdgOKxX-kckuMcUV_zM8xVWrVtbNIU9lnEpDZbZVp9eFsV29vK2X_x0JbdGC44zieFh9stYXTfTdO_bek6qfkahCrHjG9zjVqlVI405oZ_uxbC3wXiDTYUtzkIECCdlYf1kKf0RVBGiNYG5_OdCDK5k2_PxPpKuLq83an31u-6ry5TUBDxiKAk62uiFK5t7cs1BJk-tAWv3NcamAGHABcytejj_lNo_QVeBOQDFUXMj"
        )
      }>
      <Player />
    </SpotifyWebSDK>
  );
}
