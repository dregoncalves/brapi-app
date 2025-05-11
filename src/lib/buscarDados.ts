export type Ativo = {
  symbol: string;
  longName: string;
  logourl: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
};

export async function buscarAtivos(tickers: string[]): Promise<Ativo[]> {
  const token = process.env.BRAPI_TOKEN;
  const ativos: Ativo[] = [];

  for (const ticker of tickers) {
    const res = await fetch(
      `https://brapi.dev/api/quote/${ticker}?token=${token}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) continue;

    const data = await res.json();
    const ativo = data.results?.[0];

    if (ativo) {
      ativos.push({
        symbol: ativo.symbol,
        longName: ativo.longName,
        logourl: ativo.logourl,
        regularMarketPrice: ativo.regularMarketPrice,
        regularMarketChangePercent: ativo.regularMarketChangePercent,
      });
    }
  }

  return ativos;
}
