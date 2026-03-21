import React from "react";

type Props = {
  src: string;
  title?: string;
  allow?: string;
  allowFullScreen?: boolean;
  className?: string;
};

export default function ResponsiveEmbed({
  src,
  title = "Embedded content",
  allow = "",
  allowFullScreen = true,
  className = "",
}: Props) {
  return (
    <div className={`ratio-16by9 ${className}`}>
      <iframe
        src={src}
        title={title}
        allow={allow}
        allowFullScreen={allowFullScreen}
        style={{ border: 0 }}
      />
    </div>
  );
}
