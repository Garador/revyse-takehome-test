import React from "react";

const WatchList: React.FC = () => (
  <div>
    <div>
      <div className="text-[22px] font-bold text-cyan-500 mb-4 tracking-wide flex items-center gap-2">
        <svg
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          className="mr-1.5"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#00bcd4"
          />
        </svg>
        WatchList
      </div>
    </div>
  </div>
);

export default WatchList;
