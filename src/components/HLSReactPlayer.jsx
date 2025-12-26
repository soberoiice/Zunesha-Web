import React, { useEffect, useRef, useState, useCallback } from "react";
import Hls from "hls.js";
import CustomOverlay from "./CustomOverlay";
import { Box } from "@chakra-ui/react";

export default function HLSPlayer({
  src,
  epInfo,
  currentEpisodeIndex,
  episodes,
  setCurrentEpisodeIndex,
}) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const hideTimer = useRef(null);
  const PROXY_URL = import.meta.env.VITE_PROXY_URL;

  // Video state
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [bufferedTime, setBufferedTime] = useState(0);
  const [isMute, setIsMute] = useState(false);

  // Subtitle state
  const [subtitles, setSubtitles] = useState([]);
  const [selectedSubtitle, setSelectedSubtitle] = useState(null);
  const [cues, setCues] = useState([]);
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [subtitleOffset] = useState(0.3);
  const [fontSize, setFonSize] = useState("20px");

  // Prepare subtitles array when epInfo changes
  useEffect(() => {
    if (!Array.isArray(epInfo?.streamingLink?.tracks)) {
      setSubtitles([]);
      return;
    }
    setSubtitles(
      epInfo.streamingLink.tracks.map((t, i) => ({
        kind: t.kind || "subtitles",
        src: `${PROXY_URL}${encodeURIComponent(t.file)}`,
        srcLang: t.srcLang || "en",
        label: t.label || `Subtitle ${i + 1}`,
        default: t.default || i === 0,
      }))
    );
  }, [epInfo, PROXY_URL]);

  // Select default subtitle (English if available)
  useEffect(() => {
    if (!subtitles.length) {
      setSelectedSubtitle(null);
      return;
    }
    const englishSub =
      subtitles.find((s) => s.srcLang === "en") || subtitles[0];
    setSelectedSubtitle(englishSub);
  }, [subtitles]);

  // Load and parse selected subtitle
  useEffect(() => {
    if (!selectedSubtitle) {
      setCues([]);
      setCurrentSubtitle("");
      return;
    }

    let canceled = false;

    fetch(selectedSubtitle.src)
      .then((res) => res.text())
      .then((text) => {
        if (!canceled) setCues(parseVTT(text));
      })
      .catch(() => {
        if (!canceled) setCurrentSubtitle("No subtitles available");
      });

    return () => {
      canceled = true;
    };
  }, [selectedSubtitle]);

  // Update subtitle on video time update
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !cues.length) return;

    let lastCueIndex = -1;
    const onTimeUpdate = () => {
      const t = video.currentTime + subtitleOffset;
      const index = cues.findIndex((c) => t >= c.start && t <= c.end);
      if (index !== lastCueIndex) {
        setCurrentSubtitle(index !== -1 ? cues[index].text : "");
        lastCueIndex = index;
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [cues, subtitleOffset]);

  // Disable native text tracks
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    for (const track of video.textTracks) {
      track.mode = "disabled";
    }
  }, []);

  // Parse VTT text
  const parseVTT = useCallback((vttText) => {
    const cues = [];
    const blocks = vttText.split(/\r?\n\r?\n/);
    for (const block of blocks) {
      const lines = block.split(/\r?\n/).filter(Boolean);
      if (lines.length < 2) continue;

      const timeLine = lines.find((l) => l.includes("-->"));
      if (!timeLine) continue;

      const text = lines.slice(lines.indexOf(timeLine) + 1).join("\n");
      const [start, end] = timeLine.split(" --> ").map(parseTime);
      if (!isNaN(start) && !isNaN(end)) cues.push({ start, end, text });
    }
    return cues;
  }, []);

  const parseTime = (time) => {
    const parts = time.split(":");
    if (parts.length === 3) {
      const secondsParts = parts[2].split(/[.,]/);
      return (
        parts[0] * 3600 +
        parts[1] * 60 +
        Number(secondsParts[0]) +
        Number(secondsParts[1] || 0) / 1000
      );
    }
    const secondsParts = parts[1].split(/[.,]/);
    return (
      parts[0] * 60 +
      Number(secondsParts[0]) +
      Number(secondsParts[1] || 0) / 1000
    );
  };

  // HLS setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls;

    const videoSource = `${PROXY_URL}${src}`;

    if (Hls.isSupported()) {
      hls = new Hls({ enableWebVTT: true });
      hls.loadSource(videoSource);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSource;
    }

    return () => hls && hls.destroy();
  }, [src, PROXY_URL]);

  // Video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => !seeking && setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration || 0);
    const onProgress = () => {
      if (video.buffered.length > 0) {
        setBufferedTime(video.buffered.end(video.buffered.length - 1));
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("progress", onProgress);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("progress", onProgress);
    };
  }, [seeking]);

  // Play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  // Seek
  const handleSeek = (value) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setCurrentTime(value);
  };

  // Fullscreen
  const handleFullScreen = () => {
    const el = playerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
    else el.requestFullscreen().catch(() => {});
  };

  useEffect(() => {
    const onFsChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Show/hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 2500);
  };

  // Load subtitle dynamically
  const loadSubtitle = (src) => {
    const sub = subtitles.find((s) => s.src === src);
    if (sub) setSelectedSubtitle(sub);
  };

  //handle changing episodes with controles
  const handleEpisodeChange = (dir) => {
    if (dir === "next") {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    } else {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  };

  //handle muting
  const handleMuting = () => {
    setIsMute(!isMute);
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
  };

  //handle 5sec jump
  const handleJump = (dir) => {
    if (dir === "forward") {
      videoRef.current.currentTime = videoRef.current.currentTime + 5;
    } else {
      videoRef.current.currentTime = videoRef.current.currentTime - 5;
    }
  };
  function takeScreenshot() {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `screenshot-${episodes[currentEpisodeIndex]?.title}.png`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  return (
    <Box
      ref={playerRef}
      position="relative"
      w="100%"
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        crossOrigin="anonymous"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        style={{
          width: "100%",
          margin: "auto",
          aspectRatio: 16 / 9,
          borderRadius: "8px",
        }}
      />

      {/* Subtitle display */}
      <Box
        position="absolute"
        bottom="20px"
        width="100%"
        textAlign="center"
        color="white"
        fontSize="16px"
        px="12px"
        pointerEvents="none"
      >
        <Box
          display="inline-block"
          color="white"
          px="12px"
          py="6px"
          borderRadius="6px"
          fontSize={fontSize}
          fontWeight="bold"
          style={{
            textShadow: `
                -2px -2px 0 #000,
                 2px -2px 0 #000,
                -2px  2px 0 #000,
                 2px  2px 0 #000,
                -2px  0px 0 #000,
                 2px  0px 0 #000,
                 0px -2px 0 #000,
                 0px  2px 0 #000
              `,
          }}
          dangerouslySetInnerHTML={{ __html: currentSubtitle }}
        />
      </Box>

      {/* Video controls overlay */}
      {showControls && (
        <CustomOverlay
          playing={playing}
          togglePlay={togglePlay}
          handleSeek={handleSeek}
          duration={duration}
          currentTime={currentTime}
          seekValue={seekValue}
          setSeekValue={setSeekValue}
          seeking={seeking}
          setSeeking={setSeeking}
          episodes={episodes}
          currentIndex={currentEpisodeIndex}
          setCurrentIndex={setCurrentEpisodeIndex}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
          handleFullScreen={handleFullScreen}
          bufferedTime={bufferedTime}
          subs={subtitles}
          loadSubtitle={loadSubtitle}
          setFontSize={setFonSize}
          handleEpisodeChange={handleEpisodeChange}
          fontSize={fontSize}
          playerRef={playerRef}
          isMute={isMute}
          handleMuting={handleMuting}
          handleJump={handleJump}
          handleScreenShot={takeScreenshot}
        />
      )}
    </Box>
  );
}
