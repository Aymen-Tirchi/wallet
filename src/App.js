import React, { useState } from "react";
import "./App.css";
import Wallet from "./Wallet.json";
import { ethers }  from "ethers"
function App() {
  const [balance, setBalance] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  // eslint-disable-next-line no-empty-pattern
  const [] = useState(null);
  // eslint-disable-next-line no-empty-pattern
  const [] = useState("");
  // eslint-disable-next-line no-unused-vars
  const WalletAddress = "0xca548fbB789bC07628D63273E4B71d7496595Ba1";
  //const acontract = new web3.eth.Contract(Wallet.abi, WalletAddress,);
  
  const daiAddress = "0xca548fbB789bC07628D63273E4B71d7496595Ba1";
  const provider = new ethers.providers.Web3Provider(window.ethereum);


    const daiAbi = Wallet.abi;
// The Contract object
const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

    async function fetchTotalBalance() {
      // If MetaMask exists
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
          const newTotalBalance = await provider.getBalance(daiAddress);
          setTotalBalance(Number(newTotalBalance._hex) / 1e18);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    }
    const handleWithdrawal = async (e) => {
      e.preventDefault();
      if (amount === "") {
        setMessage("Please enter an amount");
        return;
      }
      const amountInWei = ethers.utils.parseEther(amount);
      if (balance >= amount) {
        await daiContract.withdraw(amountInWei);
        setBalance((prevBalance) => prevBalance - Number(amount));
        setMessage("Withdrawal successful!");
      } else {
        setMessage("Insufficient balance!");
      }
      setAmount("");
    };    
  return (
    <div className="App">
      <div className="container">
        <h1>My Wallet</h1>
        <p className="balance">Total balance: {totalBalance} MATIC</p>
        <p className="balance">Balance: {balance} MATIC</p>
        <p className="contract-address">Contract Address: </p>
        <a href={`https://mumbai.polygonscan.com/address/${daiAddress}`}>{daiContract.address}</a>
        <form onSubmit={handleWithdrawal}>
          <label>
            Withdraw amount (ETH):
            <input
              className="input"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <button className="button" type="submit" name="withdraw">
            Withdraw
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <button className="button" onClick={fetchTotalBalance}>
          Refresh
        </button>
      </div>
    </div>
  );
}

export default App;
