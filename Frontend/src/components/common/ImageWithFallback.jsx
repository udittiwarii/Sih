import React, { useState } from "react";
import Loader from "./Loader";

export default function ImageWithFallback({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  const fallback = "/assets/placeholder.png";

  return (
    <div className={`relative ${className || ""}`}>
      {!loaded && <div className="absolute inset-0 flex items-center justify-center"><Loader /></div>}
      <img
        src={err ? fallback : src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setErr(true)}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
