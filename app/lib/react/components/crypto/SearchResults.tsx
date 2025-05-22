import React, { useRef, useCallback, useState, useEffect } from "react";
import { Crypto } from "../../types";
import { SearchBar } from "./Search";

const PAGE_SIZE = 10;

export const SearchResults: React.FC<{
  cryptos: Crypto[];
  onFilter: (filterData: string) => void;
  filter: string;
  onAdd: (crypto: Crypto) => void;
  onRefreshResults: () => void;
  refreshingResults: boolean;
}> = ({
  cryptos,
  onFilter,
  filter,
  onAdd,
  onRefreshResults,
  refreshingResults,
}) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loader = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, cryptos.length));
        }, 1000); // Simulate network delay
      }
    },
    [cryptos.length]
  );

  useEffect(() => {
    setVisibleCount(PAGE_SIZE); // Reset on new cryptos
  }, [cryptos]);

  useEffect(() => {
    if (!loader.current) return;
    const option = { root: null, rootMargin: "5px", threshold: 1.0 };
    const observer = new window.IntersectionObserver(handleObserver, option);
    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver, loader, visibleCount]);

  return (
    <div className="flex flex-col items-start mr-8 p-8 py-8 px-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg flex-1 min-h-[80vh]">
      <h1 className="text-3xl mb-5 text-cyan-400 dark:text-cyan-300 font-bold tracking-wide">
        Crypto List
      </h1>
      <div className="w-full">
        <h2 className="text-xl mb-5 text-gray-900 dark:text-gray-100 font-semibold border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          Search Results &nbsp;
          <button
            type="button"
            className="ml-4 px-4 py-1.5 bg-cyan-400 hover:bg-cyan-500 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white text-sm font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300 shadow"
            onClick={onRefreshResults}
            disabled={refreshingResults}
          >
            {refreshingResults ? "Loading..." : "Refresh"}
          </button>
        </h2>
        <div className="mb-4">
          <SearchBar
            filter={filter}
            onFilter={(search) => {
              onFilter(search);
            }}
          />
        </div>
        <div className="flex flex-col gap-4">
          {cryptos.slice(0, visibleCount).map((crypto) => (
            <div
              key={crypto.symbol}
              className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3 shadow transition-shadow min-w-0"
            >
              <img
                src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`}
                alt={crypto.name || ""}
                width={36}
                height={36}
                className="rounded-full mr-3 bg-cyan-50 dark:bg-cyan-900 border border-cyan-100 dark:border-cyan-800"
              />
              <span
                className="text-base font-semibold text-gray-900 dark:text-gray-100 flex-1 whitespace-nowrap overflow-hidden text-ellipsis"
                title={crypto.name || ""}
              >
                {crypto.name}
              </span>
              <div>
                <span className="text-base font-medium text-cyan-400 dark:text-cyan-300 ml-3">
                  {crypto.symbol.toUpperCase()}
                </span>
                <span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    ${parseFloat(`${crypto.rate}`).toFixed(15)}
                  </span>
                </span>
                <span
                  className="ml-4 px-3 py-1 bg-cyan-400 hover:bg-cyan-500 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white text-sm font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300 cursor-pointer"
                  aria-label={`Add ${crypto.name}`}
                  onClick={() => onAdd(crypto)}
                >
                  Add
                </span>
              </div>
            </div>
          ))}
          {(visibleCount < cryptos.length || loading) && (
            <div
              ref={loader}
              className="h-10 text-center text-black dark:text-gray-200 flex items-center justify-center w-full"
            >
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
