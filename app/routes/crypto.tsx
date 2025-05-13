import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { WithAuthGuard } from "~/components/auth/guardComponent";
import { SearchBar } from "~/components/crypto/searchBar";
import {
  ICryptoData,
  SortableSymbolCard,
} from "~/components/crypto/symbolCard";
import ErrorHOC from "~/components/errorHOC";
import { LoadingHOC } from "~/components/loadingHOC";
import {
  fetchCryptoData,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "~/utils/crypto";

export const meta: MetaFunction = () => {
  return [
    { title: "Crypto App" },
    { name: "description", content: "Welcome to a Crypto App!" },
  ];
};

interface IFilter {
  text?: string;
}

export default function Index() {
  const [cryptos, setCryptos] = useState<ICryptoData[]>([]);
  const [filter, setFilter] = useState<IFilter>({
    text: "",
  });
  const [loading, setLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true);
    try {
      let data: any = await fetchCryptoData();
      if (data) {
        const storedOrder = loadFromLocalStorage("cryptoOrder");
        if (storedOrder && storedOrder.length > 0) {
          //const orderedIds = JSON.parse(storedOrder);
          data = data.sort((a: any, b: any) => {
            if (storedOrder.indexOf(a.id) > storedOrder.indexOf(b.id)) {
              return 1;
            }
            if (storedOrder.indexOf(a.id) < storedOrder.indexOf(b.id)) {
              return -1;
            }
            return 0;
          });
        }
      }
      setCryptos(data);
    } catch (error: any) {
      console.error("Error fetching crypto data:", error);
      setLoading(false);
      setErrorLoading(error?.message || "Error fetching crypto data");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setCryptos((prevCryptos) => {
        const oldIndex = prevCryptos.findIndex(
          (crypto) => crypto.id === active.id
        );
        const newIndex = prevCryptos.findIndex(
          (crypto) => crypto.id === over.id
        );

        const newPositions = arrayMove(prevCryptos, oldIndex, newIndex);
        saveToLocalStorage(
          "cryptoOrder",
          newPositions.map((crypto) => crypto.id)
        );
        return newPositions;
      });
    }
  }

  function applyFilter(filter: IFilter) {
    return (crypto: ICryptoData) => {
      if (filter.text) {
        return crypto.name.toLowerCase().match(filter.text.toLowerCase());
      }
      return cryptos;
    };
  }

  return (
    <WithAuthGuard>
      <div className="min-h-[100vh]">
        <ErrorHOC
          errorMessage={errorLoading ? new Error(errorLoading) : undefined}
        >
          <LoadingHOC isLoading={loading} message="Loading Crypto Data...">
            <div className="flex items-center space-x-4">
              <SearchBar
                onChange={(newSearch) => {
                  setFilter({ ...filter, text: newSearch });
                }}
              />
              <button
                onClick={() => fetchData()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Refresh Data
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={cryptos
                    ?.filter(applyFilter(filter))
                    .map((crypto) => crypto.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {cryptos?.filter(applyFilter(filter)).map((crypto) => (
                    <SortableSymbolCard
                      key={crypto.id}
                      id={crypto.id}
                      name={crypto.name}
                      symbol={crypto.symbol}
                      current_price={crypto.current_price}
                      price_in_btc={crypto.price_in_btc}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </LoadingHOC>
        </ErrorHOC>
      </div>
    </WithAuthGuard>
  );
}
