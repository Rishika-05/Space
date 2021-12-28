import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "117cbbe21954403da09d4b8f555e6b4b";
let token =
  "006117cbbe21954403da09d4b8f555e6b4bIABFWIHVh9jSM6HxvvM8TmUWmXiUNG6/Y83UOov7eYv0LEGu9ScAAAAAEACVNqlcO93KYQEAAQA73cph/RZCGNlBu/U+RaSyhA0d5owGf3fC1cpUlB0Gu9ScAAAAAEACVNqlc69nKYQEAAQDr2cph";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "Space_VC"
export const getToken = async () =>{
  let res = await fetch(`http://localhost:9002/access_token/?channelName=${channelName}`, {
    method: "GET", headers: {
        'Content-Type': 'application/json'
    },
  });
  let data = await res.json();
  token = data.token;
}