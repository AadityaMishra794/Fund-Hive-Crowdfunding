import React, { useState, useEffect } from 'react';
import { useWeb3 } from "../hooks/web3Context";
import profileimg from '../assets/profile.png';
const ConnectWalletButton = () => {
 const { account, web3, connectWallet } = useWeb3();
 const [balance, setBalance] = useState(null);
 const [showSubmenu, setShowSubmenu] = useState(false);
  useEffect(() => {
   const getBalance = async () => {
     if (web3 && account) {
       try {
         const balanceWei = await web3.eth.getBalance(account);
         const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
         setBalance(balanceEth);
       } catch (error) {
         console.error('Error fetching balance:', error);
         setBalance('0');
       }
     }
   };
    getBalance();
 }, [web3, account]);
  const handleDisconnect = () => {
   window.location.reload();
 };
  return (
   <div className="relative">
     {account ? (
       <div>
         <div className="relative">
           <img 
             src={profileimg} 
             alt="Profile" 
             className="w-8 h-8 cursor-pointer rounded-full border-2 border-[#10a37f] hover:border-[#0d8c6d] transition-colors"
             onClick={() => setShowSubmenu(!showSubmenu)}
           />
           
           {showSubmenu && (
             <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl min-w-[250px] p-4 z-50 border border-gray-200">
               <ul className="space-y-4">
                 <li>
                   <p className="text-sm text-gray-600 break-all">
                     Connected Account: {account}
                   </p>
                 </li>
                 <li>
                   <p className="text-sm text-gray-600">
                     Balance: {balance ? `${parseFloat(balance).toFixed(4)} ETH` : '0 ETH'}
                   </p>
                 </li>
                 <li>
                   <button
                     onClick={handleDisconnect}
                     className="w-full bg-[#10a37f] hover:bg-[#0d8c6d] font-orbitron text-white px-4 py-2 rounded-md transition-colors duration-300 font-medium"
                   >
                     Disconnect
                   </button>
                 </li>
               </ul>
             </div>
           )}
         </div>
       </div>
     ) : (
       <button 
         onClick={connectWallet}
         className="bg-[#10a37f] hover:bg-[#0d8c6d] font-orbitron text-white px-4 py-2 rounded-md transition-colors duration-300 font-medium"
       >
         Connect
       </button>
     )}
   </div>
 );
}
export default ConnectWalletButton;