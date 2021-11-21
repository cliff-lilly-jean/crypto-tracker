
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';

const apiEndPoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

function App() {
 const [coins, setCoins] = useState([]);
 const [search, setSearch] = useState('');

 useEffect(() => {
  axios.get(apiEndPoint).then(res => {
   setCoins(res.data);
   // console.log(res.data);
  }).catch(error => {
   console.log(error);
  });
 }, []);

 const handleChange = e => {
  setSearch(e.target.value);
 };

 const filteredCoins = coins.filter(coin => {
  return coin.name.toLowerCase().includes(search.toLowerCase());
 });

 return (
  <div className="coin-app">
   <div className="coin-search">
    <h1 className="coin-text">Search a currency</h1>
    <form>
     <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
    </form>
   </div>
   {filteredCoins.map(coin => {
    return (
     <Coin key={coin.id} name={coin.name} price={coin.current_price} marketcap={coin.market_cap} image={coin.image} symbol={coin.symbol} priceChange={coin.price_change_percentage_24h} volume={coin.total_volume} />
    );
   })}
  </div>

 );
}

export default App;