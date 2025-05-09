import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";

export interface ICryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_in_btc: number;
}

export function SymbolCard({
  name,
  symbol,
  current_price,
  price_in_btc,
}: ICryptoData) {
  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md cursor-grab bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold text-gray-500">{name}</h2>
      <p className="text-gray-500 text-gray-500">{symbol}</p>
      <p className="text-lg font-semibold text-gray-500">
        ${current_price.toFixed(8)}
      </p>
      <p className="text-sm text-gray-500">{price_in_btc.toFixed(8)} BTC</p>
    </div>
  );
}

export function SortableSymbolCard({
  id,
  name,
  symbol,
  current_price,
  price_in_btc,
}: ICryptoData) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab"
    >
      <SymbolCard
        id={id}
        name={name}
        symbol={symbol}
        current_price={current_price}
        price_in_btc={price_in_btc}
      />
    </div>
  );
}
