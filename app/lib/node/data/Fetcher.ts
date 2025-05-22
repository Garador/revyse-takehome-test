import axios from "axios";
import { ICryptoAsset, TCryptoDataElement } from "../types";

export class Fetcher {
  private baseUrl: string;
  private static _instance: Fetcher;

  public static get instance() {
    if (!Fetcher._instance) {
      Fetcher._instance = new Fetcher();
    }
    return Fetcher._instance;
  }

  constructor() {
    this.baseUrl = "https://api.coinbase.com/v2";
  }

  async getExchangeRates(
    currency: string = "USD"
  ): Promise<TCryptoDataElement[]> {
    const [ratesResponse, currenciesResponse] = await Promise.all([
      axios.get(`${this.baseUrl}/exchange-rates?currency=${currency}`),
      axios.get(`${this.baseUrl}/currencies/crypto`),
    ]);

    // Merge exchange rates with coin details
    const rates = ratesResponse.data.data.rates;
    const currencies: ICryptoAsset[] = currenciesResponse.data.data;

    // Map rates to detailed coin info
    const detailedRates = Object.entries(rates)
      .map(([symbol, rate]) => {
        const coinInfo = currencies.find(
          (c: ICryptoAsset) => c.code === symbol
        );
        return {
          symbol,
          rate,
          name: coinInfo?.name || null,
          color: coinInfo?.color || null,
          exponent: coinInfo?.exponent || null,
          type: coinInfo?.type || null,
          code: coinInfo?.code || null,
          image: `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`,
        };
      })
      .filter((element) => element.name !== null);

    return detailedRates as TCryptoDataElement[];
  }

}
