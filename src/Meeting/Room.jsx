import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";

const Room = () => {
  const { roomId } = useParams();
  const meetingContainerRef = useRef(null);

  useEffect(() => {
    async function meetingUI() {
      const appId = 428128935;
      const serverSecret = "b74237b0d6a697ed645d6774bc09a8b0";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        uuidv4(),
        "User"
      );
      const ui = ZegoUIKitPrebuilt.create(kitToken);

      ui.joinRoom({
        container: meetingContainerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    }

    meetingUI();
  }, [roomId]);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Room {roomId}</h2>
      <div ref={meetingContainerRef}></div>
    </>
  );
};

export default Room;
