import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { Crypto, DragEvent, GetItemStyleType } from "~/lib/react/types";
import NoItems from "./NoItems";
import WatchlistElement from "./Element";

const grid = 8;
const getItemStyle:GetItemStyleType = (
  isDragging: boolean,
  draggableStyle: React.CSSProperties | undefined,
  isDarkMode: boolean = false
) => ({
  userSelect: "none",
  padding: `${grid * 2}px ${grid * 3}px`,
  margin: `0 0 ${grid}px 0`,
  borderRadius: 8,
  boxShadow: isDragging
    ? isDarkMode
      ? "0 4px 12px rgba(0,0,0,0.45)"
      : "0 4px 12px rgba(0,0,0,0.15)"
    : isDarkMode
    ? "0 1px 3px rgba(0,0,0,0.38)"
    : "0 1px 3px rgba(0,0,0,0.08)",
  background: isDragging
    ? isDarkMode
      ? "#263238"
      : "#e0f7fa"
    : isDarkMode
    ? "#1a1a1a"
    : "#ffffff",
  color: isDarkMode ? "#f5f5f5" : "#222",
  border: isDragging
    ? isDarkMode
      ? "2px solid #00bcd4"
      : "2px solid #00bcd4"
    : isDarkMode
    ? "1px solid #333"
    : "1px solid #e0e0e0",
  fontWeight: 500,
  fontSize: 16,
  transition: "background 0.2s, box-shadow 0.2s, border 0.2s, color 0.2s",
  ...draggableStyle,
});

const getListStyle = (
  isDraggingOver: boolean,
  isDarkMode: boolean = false
) => ({
  background: isDraggingOver
    ? isDarkMode
      ? "#37474f"
      : "#b2ebf2"
    : isDarkMode
    ? "#23272f"
    : "#f5f5f5",
  padding: grid,
  minWidth: 300,
  //minHeight: 400,
  borderRadius: 10,
  boxShadow: isDarkMode
    ? "0 2px 8px rgba(0,0,0,0.25)"
    : "0 2px 8px rgba(0,0,0,0.07)",
  transition: "background 0.2s",
} as React.CSSProperties);

export function ElementsList({
  items,
  onDragEnd,
  setItems,
}: {
  items: Crypto[];
  onDragEnd: (result: DragEvent) => void;
  setItems: React.Dispatch<React.SetStateAction<Crypto[]>>;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Checks if the <html> or <body> has the 'dark' class (Tailwind's dark mode)
    const checkDarkMode = () =>
      document.documentElement.classList.contains("dark") ||
      document.body.classList.contains("dark");

    setIsDarkMode(checkDarkMode());

    const observer = new MutationObserver(() => {
      setIsDarkMode(checkDarkMode());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver, isDarkMode)}
          >
            {items.length == 0 ? <NoItems /> : null}
            {items.map((item, index) => (
              <Draggable
                key={item.symbol}
                draggableId={item.symbol}
                index={index}
              >
                {(provided, snapshot) => (
                  <WatchlistElement
                    item={item}
                    provided={provided}
                    snapshot={snapshot}
                    isDarkMode={isDarkMode}
                    getItemStyle={getItemStyle}
                    setItems={setItems}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
