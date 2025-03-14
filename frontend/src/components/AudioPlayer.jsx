import { useEffect, useRef } from "react";

const AudioPlayer = ({ url }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.play();
    audioRef.current.volume = 0.09;
  }, []);

  return <audio ref={audioRef} src={url} loop />;
};

export default AudioPlayer;
