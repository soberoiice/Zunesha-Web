import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function HLSPlayer({ src, epInfo }) {
  const videoRef = useRef(null);

  const subtitles =
    Array.isArray(epInfo?.streamingLink?.tracks) &&
    epInfo?.streamingLink?.tracks.length > 0
      ? epInfo.streamingLink.tracks.map((t, i) => ({
          kind: t.kind || "subtitles",
          src: `https://corsproxy-psi.vercel.app/api/proxy?url=${encodeURIComponent(
            t.file
          )}`,
          srcLang: t.srcLang || "en",
          label: t.label || `Subtitle ${i + 1}`,
          default: t.default || i === 0,
        }))
      : [];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSource = `https://zunisha-cors-proxy.vercel.app/proxy?url=${src}`;

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWebVTT: true });
      hls.loadSource(videoSource);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSource;
    }
  }, [src]);

  return (
    <div>
      <video
        ref={videoRef}
        controls
        crossOrigin="anonymous"
        style={{ width: "100%", margin: "10px auto", aspectRatio: 16 / 9 }}
      >
        {subtitles.map((sub, i) => (
          <track
            key={i}
            kind={sub.kind}
            src={sub.src}
            srcLang={sub.srcLang}
            label={sub.label}
            default={sub.default}
            style={{ marginBottom: "20px" }}
          />
        ))}
      </video>
    </div>
  );
}
