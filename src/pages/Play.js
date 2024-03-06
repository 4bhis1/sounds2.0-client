import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const serverUrl = "http://192.168.3.88:4001";
const socket = socketIOClient(serverUrl); // Replace with your server URL

const triggerEventAtTime = (userDate, callbackFunction) => {
  const now = new Date();
  const delay = userDate.getTime() - now.getTime(); // Milliseconds until the event
  console.log("\n@@  file: Play.js:15  userDate:", userDate, now);
  console.log("\n@@  file: Play.js:15  delay:", delay);

  // If the specified time is in the past, log a message or handle as needed
  if (delay < 0) {
    console.log(
      "The specified time is in the past. Please enter a future time."
    );
    return; // Exit the function
  }

  console.log(
    `Event will trigger at ${userDate.toString()} (in ${delay} milliseconds)`
  );

  setTimeout(() => {
    callbackFunction();
    console.log("Event triggered at", new Date().toString());
  }, delay);
};

const Play = () => {
  const [songTime, setSongTime] = useState(10);

  const [play, updatePlay] = useState(false);

  const audioRef = useRef(null);
  const playButtonRef = useRef(null);
  const pauseButtonRef = useRef(null);
  //   useEffect(() => {
  //     // Fetch the song time from the backend
  //     axios
  //       .get("http://localhost:3001/api/song/time")
  //       .then((response) => {
  //         setSongTime(response.data.time);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching song time:", error);
  //       });
  //   }, []);

  // useEffect(() => {
  //   const intervalRef = setInterval(() => {
  //     console.log(">>> time ", songTime);
  //     setSongTime(songTime + 10);
  //   }, 1000);

  //   // intervalTime;
  // });

  useEffect(() => {
    socket.on("play-song", (timeObject) => {
      console.log(">>> play the song trigger", timeObject);
      triggerEventAtTime(new Date(timeObject.timeStamp), () => {
        console.log(">> song will play now");
        updatePlay(true);
      });
    });

    socket.on("pause-song", (timeObject) => {
      console.log(">>> pause the song trigger", timeObject);
      triggerEventAtTime(timeObject, () => {
        updatePlay(false);
      });
    });
  }, []);

  useEffect(() => {
    if (play) {
      // audioRef.current.play();
      // playButtonRef.current.addEventListener("click");
      console.log("\n@@  file: Play.js:90  playButtonRef.current.:");
      playButtonRef.current.click();
    } else {
      audioRef.current.pause();
      // playButtonRef.current.addEventListener("click",);
    }
  }, [play]);

  // useEffect(() => {
  //   // Start playing the song after the component has mounted
  //   if (audioRef.current) {
  //     // audioRef.current.currentTime = songTime;
  //     // console.log(">>>,m ", audioRef);
  //     //   = songTime;
  //     //   console.log(
  //     //     "🚀 ~ useEffect ~ audioRef.current.audioEl.currentTime:",
  //     //     audioRef.current.audioEl.current
  //     //   );
  //     // audioRef.c urrent.audioEl.play();
  //   }
  // }, [songTime]);

  return (
    <div>
      {/* Use ReactAudioPlayer to play the song */}
      {/* <ReactAudioPlayer
        ref={audioRef}
        src="http://localhost:4001/Noice.mp3"
        autoPlay
        controls
        currentTime={10}
      /> */}
      <audio
        ref={audioRef}
        src={`${serverUrl}/channahVe.mp3`}
        autoPlay
        controls
        // currentTime={10}
      />

      <Button
        ref={playButtonRef}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<PlayArrowIcon />}
        onClick={() => {
          console.log(">>> clicked to play");
          audioRef.current.muted = false;
          audioRef.current.play();
        }}
      >
        Play
      </Button>
      <Button
        ref={pauseButtonRef}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<PauseIcon />}
        onClick={() => {
          console.log(">>> clicked to pause");
          audioRef.current.pause();
        }}
      >
        Pause
      </Button>

      <div
        onClick={() => {
          socket.emit("play-in-all-devices");
          // audioRef.current.play();
        }}
      >
        Admin Play
      </div>
      <div
        onClick={() => {
          socket.emit("pause-in-all-devices");
          // audioRef.current.pause();
        }}
      >
        Admin pause
      </div>
    </div>
  );
};

export default Play;
