import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { buscarAtivos } from "@/lib/buscarDados";

export default async function HomePage() {
  const acoes = await buscarAtivos([
    "PETR4",
    "VALE3",
    "ITUB4",
    "BBDC4",
    "ABEV3",
    "BBAS3",
    "WEGE3",
    "MGLU3",
    "AZUL4",
    "LREN3",
  ]);

  const fiis = await buscarAtivos([
    "HGLG11",
    "MXRF11",
    "XPML11",
    "KNRI11",
    "VISC11",
    "XPLG11",
    "HGRE11",
    "BCFF11",
    "BRCR11",
    "RZTR11",
  ]);

  const renderTabela = (lista: typeof acoes) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ativo</TableHead>
          <TableHead className="text-right">Preço</TableHead>
          <TableHead className="text-right">Variação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lista.map((ativo) => (
          <TableRow key={ativo.symbol}>
            <TableCell className="flex items-center gap-3">
              <Image
                src={ativo.logourl}
                alt={ativo.symbol}
                width={44}
                height={44}
              />
              <div>
                <p className="font-medium">{ativo.symbol}</p>
                <p className="text-xs text-muted-foreground">
                  {ativo.longName}
                </p>
              </div>
            </TableCell>
            <TableCell className="text-right">
              R$ {ativo.regularMarketPrice.toFixed(2)}
            </TableCell>
            <TableCell
              className={`text-right font-medium ${
                ativo.regularMarketChangePercent >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {ativo.regularMarketChangePercent.toFixed(2)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Brapi API</h1>

      <Tabs defaultValue="acoes" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="acoes">Ações</TabsTrigger>
          <TabsTrigger value="fiis">FIIs</TabsTrigger>
        </TabsList>

        <TabsContent value="acoes">{renderTabela(acoes)}</TabsContent>
        <TabsContent value="fiis">{renderTabela(fiis)}</TabsContent>
      </Tabs>
    </main>
  );
}
