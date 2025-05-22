import React from "react";
import { WatchlistElementProps } from "~/lib/react/types";


const WatchlistElement: React.FC<WatchlistElementProps> = ({
  item,
  provided,
  snapshot,
  isDarkMode,
  getItemStyle,
  setItems,
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(
        snapshot.isDragging,
        provided.draggableProps.style,
        isDarkMode
      )}
    >
      {item.name}
      <div className="flex justify-between items-center mt-2">
        <small className="text-gray-500 font-medium">{item.symbol}</small>
        <small className="font-semibold">
          USD&nbsp;
          <span className="text-cyan-500">
            {parseFloat(`${item.rate}`).toFixed(15)}
          </span>
        </small>
        <button
          onClick={() =>
            setItems((prev) => prev.filter((i) => i.symbol !== item.symbol))
          }
          className="bg-red-500 text-white border-none rounded px-3 py-1 cursor-pointer font-medium text-sm ml-3 transition-colors duration-200 hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WatchlistElement;
