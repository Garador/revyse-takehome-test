export interface ICryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: any;
  price_in_btc: number;
}

export async function fetchCryptoData() {
  try {
    const response = await fetch(
      `http://api.coinlayer.com/api/live?access_key=567722105e1a74c44d12d1ee5f20c71a&symbols=BCN,BCPT,BEE,BTC,BTCA,BURST,DAS,DIME,DNT,DOGE`
    );
    let data = await response.json();

    if (!data.success) {
      console.error("Error fetching crypto data:", data);
      //We fall back to the mock data
      data = {
        success: true,
        terms: "https://coinlayer.com/terms",
        privacy: "https://coinlayer.com/privacy",
        timestamp: 1746744193,
        target: "USD",
        rates: {
          BCN: 0.000106,
          BCPT: 0.000926,
          BEE: 0.000001,
          BTC: 102704.45484,
          BTCA: 0.00036,
          BURST: 0.017348,
          DAS: 0.937816,
          DIME: 0.00003,
          DNT: 0.0567,
          DOGE: 0.194391,
        },
      } as any;
    }

    const formattedData = Object.keys(data.rates).map((symbol) => {
      return {
        id: symbol.toLowerCase(),
        name: symbol,
        symbol: symbol,
        current_price: data.rates[symbol],
        price_in_btc: data.rates[symbol] / data.rates["BTC"],
      };
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(formattedData);
        //reject("Error fetching crypto data -- INTERNAL ERROR");
      }, 5000);
    });
    //return formattedData;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
}

export function saveToLocalStorage(key: string, value: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

export function loadFromLocalStorage(key: string): string[] {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return [];
  }
}
