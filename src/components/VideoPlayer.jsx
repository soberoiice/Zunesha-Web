import React from "react";

export default function VideoPlayer({ url }) {
  return (
    <iframe
      src={url}
      // title={title}
      width="100%"
      height="100%"
      // style={{ border: "none", display: error ? "none" : "block" }}
      onLoad={() => setLoading(false)}
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      allowFullScreen
    />
  );
}
