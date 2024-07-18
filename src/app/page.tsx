import CoinTable from "@/components/CoinTable/CoinTable";
import Navbar from "../components/Navbar";
import TrendingCoins from "@/components/CoinTable/TrendingCoins";
export default function Home() {
  return (
    <>
      <TrendingCoins/>
      <CoinTable/>
    </>
  );
}
