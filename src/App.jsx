import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./components/Spinner";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  //useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "inr",
              order: "market_cap_desc",
              per_page: "10",
              page: "1",
              sparkline: false,
            },
          }
        );
        setCoins(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl">
        <h1 className="text-xl tracking-[]3px mb-8 uppercase text-gray-300">
          <span className="text-5xl">C</span>ryptocurrencies Market
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-white/20 rounded-lg overflow-hidden">
              {/* table header */}
              <thead className="bg-gradient-to-r from indigo-500 to-pink-500">
                <tr>
                  <th className="px-4 py-4 text-left">#</th>
                  <th className="px-4 py-4 text-left">Name</th>
                  <th className="px-4 py-4 text-left">Price (INR)</th>
                  <th className="px-4 py-4 text-left">Market Cap</th>
                  <th className="px-4 py-4 text-left">24h Changes</th>
                </tr>
              </thead>
              {/*table body */}

              <tbody>
                {coins.map((coin, index) => (
                  <tr
                    key={coin.id}
                    className="border-t border-gray-600 bg-gray-800 hover:bg-white/10"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <img
                        className="w-6 h-6"
                        src={coin.image}
                        alt={coin.name}
                      />
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </td>
                    <td className="px-4 py-2">
                      ₹{coin.current_price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-2">
                      ₹{coin.market_cap.toLocaleString("en-IN")}
                    </td>
                    <td
                      className={`px-4 py-2 ${
                        coin.price_change_percentage_24h > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2) > 0
                        ? `+${coin.price_change_percentage_24h.toFixed(2)}`
                        : coin.price_change_percentage_24h.toFixed(2)}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
