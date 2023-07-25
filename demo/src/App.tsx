import Player from "./Player";
import { SpotifyWebSDK } from "spotify-web-playback-sdk-for-react";
import "./App.css";

export default function App() {
  return (
    <SpotifyWebSDK
      name="hahaha"
      getOAuthToken={(cb) =>
        cb(
          "BQCwjk-zawRkpZ1r7MmWhOs4V4V9reVwkdoeATNI0vRfjULdmLhHjg-rZunBph9KnKYQtEsqil6IeunS5L97orsxjEt8Ipp405uy4k06m5wgJ_3FIEP6ocIHEzIDsZmtGoi_gYlAwHmcpR90ik-6WxNWFK7kc-Dtd2gCBNKL8TX2Ecki-uspdMHG5-m9kt_LHgARKsuCgjben9qmqBVeR_U8KlLf4b6mOsN4ekHhjEkIjYff7Zzvfbu3rHdQl0hpCwJtoSpYSt5p4pdY29QJ7DuiUR0sdv2CnYYLiD5mJ8brLIo4CBr8u2vJtgjnyI5UYrz1t9IajoLVZVDC"
        )
      }>
      <Player />
    </SpotifyWebSDK>
  );
}
