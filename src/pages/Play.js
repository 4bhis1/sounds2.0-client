import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import axios from "axios";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://192.168.29.54:4001"); // Replace with your server URL

const Play = () => {
  const [songTime, setSongTime] = useState(10);
  const [intervalTime, setIntervalRef] = useState(null);

  const [play, updatePlay] = useState(false);

  const audioRef = useRef(null);
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
    socket.on("play-song", () => {
      console.log(">>> play the song trigger");
      updatePlay(true);
    });
    socket.on("pause-song", () => {
      console.log(">>> pause the song trigger");
      updatePlay(false);
    });
  }, []);

  useEffect(() => {
    if (play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play]);

  useEffect(() => {
    // Start playing the song after the component has mounted
    if (audioRef.current) {
      // audioRef.current.currentTime = songTime;
      // console.log(">>>,m ", audioRef);
      //   = songTime;
      //   console.log(
      //     "🚀 ~ useEffect ~ audioRef.current.audioEl.currentTime:",
      //     audioRef.current.audioEl.current
      //   );
      // audioRef.c urrent.audioEl.play();
    }
  }, [songTime]);

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
        src="http://192.168.29.54:4001/Noice.mp3"
        autoPlay
        controls
        currentTime={10}
      />
      <div
        onClick={() => {
          socket.emit("play-in-all-devices");
          // audioRef.current.play();
        }}
      >
        Click to play
      </div>
      <div
        onClick={() => {
          socket.emit("pause-in-all-devices");
          // audioRef.current.pause();
        }}
      >
        Click to pause
      </div>
    </div>
  );
};

export default Play;
