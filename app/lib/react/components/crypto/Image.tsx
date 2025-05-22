import { useState } from "react";
import { Crypto } from "../../types";

export function ImageComponent({ crypto }: { crypto: Crypto }) {
  const urls = [
    `https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`,
    crypto.name
      ? `https://assets.coingecko.com/coins/images/1/large/${crypto.name.toLowerCase()}.png`
      : null,
    crypto.image,
    "https://logo.com/image-cdn/images/kts928pd/production/0ec12dcbeacbc34b7596da7ab69863bc7e3f0534-349x349.png?w=1080&q=72&fm=webp",
  ].filter((url) => url !== null) as string[];

  const [imgIndex, setImgIndex] = useState(0);
  const selectedURL = urls[imgIndex];

  return (
    <img
      src={selectedURL}
      alt={crypto.name || ""}
      width={32}
      height={32}
      onError={() => {
        console.log("Image failed to load...");
        if (imgIndex < urls.length - 1) {
          console.log("Image not found, trying next URL", {
            crypto,
            imgIndex,
            urls,
          });
          setImgIndex(imgIndex + 1);
        } else {
          console.log("All images failed to load", {
            crypto,
            imgIndex,
            urls,
          });
        }
      }}
      style={{ borderRadius: "50%" }}
    />
  );
}
