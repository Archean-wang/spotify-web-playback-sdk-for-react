# SpotifyWebSDK

## Install
`npm install spotify-web-playback-sdk-for-react`

## Getting Started
```TS
import { SpotifyWebSDK } from "spotify-web-playback-sdk-for-react";

<SpotifyWebSDK
      name="hahaha"
      getOAuthToken={(cb) => cb("token")}
      volume=0.5
      >
</SpotifyWebSDK>
```
`name`: name of the Spotify instance.

`getOAuthToken`: The callback getOAuthToken expected to provide a valid access_token.

`volume`: The volume of the player represented as a decimal value between 0 and 1.

Given valid token and run the code, you should see a device named `name` from the official Spotify app.

Refer to https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started
## Hooks
All the hooks should be used in child components of `SpotifyWebSDK`

### useSpotifyPlayer
Return current player instance object which can manipulate the player, can be null.

Refer to https://developer.spotify.com/documentation/web-playback-sdk/reference#spotifyplayer
```TS
function Control() {
    const player = useSpotifyPlayer();
    return (
        <button onClick={() => player.togglePlay()}>||</button>
    )
}
```

### useSpotifyDevice
Return the device id of current player instance, can be null.
Refer to https://developer.spotify.com/documentation/web-playback-sdk/reference#webplaybackplayer-object
```TS
function Device() {
    const device = useSpotifyDevice();
    return (
        <div>{`device id: ${device?.device_id`}</div>
    )
}

```

### useSpotifyState
Return current state of the player, can be null.

Refer to https://developer.spotify.com/documentation/web-playback-sdk/reference#webplaybackstate-object
```TS
function State() {
    const state = useSpotifyState();
    return (
        <div>{state.paused ? "paused" : "playing"}</div>
    )
}
```
---

The following hooks are actually attributes extracted from the state, just for convinient

### useCurrentTrack
Return current playing track, can be null.

Refer to https://developer.spotify.com/documentation/web-playback-sdk/reference#webplaybacktrack-object
```TS
function CurrentTrack() {
    const currentTrack = useCurrentTrack()
    return (
        <div>
            <p>{currentTrack?.name}</p>
        </div>
    )
}
```