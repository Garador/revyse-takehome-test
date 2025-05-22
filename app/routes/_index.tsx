import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Fetcher } from "~/lib/node/data/Fetcher";
import SearchResults from "~/lib/react/components/crypto/SearchResults";
import { ElementsList } from "~/lib/react/components/crypto/watchlist/ElementsList";
import WatchList from "~/lib/react/components/crypto/watchlist/WatchList";
import NavBar from "~/lib/react/components/navBar";
import { Crypto, DragEvent } from "~/lib/react/types";
import { useRevalidator } from "react-router-dom";
import { TCryptoDataElement } from "~/lib/node/types";
import { WithAuthGuard } from "~/lib/react/components/auth/guardComponent";

// a little function to help us with reordering the result
const reorder = (list: Crypto[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  if (url.searchParams.get("throwError")) {
    throw new Error("Error thrown from loader");
  }
  const res = await Fetcher.instance.getExchangeRates();
  return res.map((element: TCryptoDataElement) => {
    return {
      id: element.code,
      name: element.name,
      symbol: element.symbol,
      image: element.image,
      rate: element.rate,
    };
  });
};

export default function CryptoList() {
  const cryptos = useLoaderData<Crypto[]>();
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState<Crypto[]>([]);
  const revalidator = useRevalidator();

  useEffect(() => {
    if (items && items.length) {
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items, cryptos]);

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems && savedItems.length > 0) {
      try {
        let storedItems: Crypto[] = JSON.parse(savedItems);
        storedItems = storedItems.map((element) => {
          const found = cryptos.find(
            (crypto) => element.symbol === crypto.symbol
          );
          if (found) {
            return {
              ...found,
            };
          } else {
            return element;
          }
        });
        setItems(storedItems);
      } catch (e) {}
    }
  }, [cryptos]);

  function onDragEnd(result: DragEvent) {
    if (!result.destination) {
      return;
    }
    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(newItems);
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-row p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md min-h-screen">
        <SearchResults
          cryptos={cryptos.filter((crypto) => {
            const matchesFilter = !filter
              ? true
              : `${crypto.name || ""}`
                  .toLowerCase()
                  .includes(filter.toLowerCase()) ||
                crypto.symbol?.toLowerCase().includes(filter.toLowerCase());
            const matchesNotAdded = !items?.some(
              (item) => item.symbol === crypto.symbol
            );
            return matchesFilter && matchesNotAdded;
          })}
          onFilter={(filter) => {
            setFilter(filter);
          }}
          filter={filter}
          onAdd={(crypto) => {
            setItems((prev) => {
              if (prev?.find((item) => item.symbol === crypto.symbol)) {
                return prev;
              }
              return [...(prev || []), crypto];
            });
          }}
          onRefreshResults={() => {
            revalidator.revalidate();
          }}
          refreshingResults={revalidator.state === "loading"}
        />
        <div>
          <WatchList />
          <div className="relative">
            <WithAuthGuard>
              <ElementsList
                items={items}
                onDragEnd={onDragEnd}
                setItems={setItems}
              />
            </WithAuthGuard>
          </div>
        </div>
      </div>
    </>
  );
}

export function ErrorBoundary() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Something went wrong while loading the data. Please try again later.
        </p>
      </div>
    </>
  );
}
