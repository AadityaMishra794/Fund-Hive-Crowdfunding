import { useState } from 'react';
import { useWeb3 } from '../hooks/web3Context';
import { contractABI, ContractAddress } from '../contracts/constants';

const Popup = ({ onClose, campaignId, onDonationSuccess }) => {
  const { web3, account } = useWeb3();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      if (!web3 || !account) {
        throw new Error('Please connect your wallet first');
      }

      // Log for debugging
      console.log('Donation details:', {
        campaignId,
        amount,
        account,
        ContractAddress
      });

      const contract = new web3.eth.Contract(contractABI, ContractAddress);
      const amountInWei = web3.utils.toWei(amount, 'ether');

      // Log for debugging
      console.log('Contract and amount:', {
        contractMethods: contract.methods,
        amountInWei
      });

      // First, check if the campaign exists and is active
      try {
        const campaign = await contract.methods.campaigns(campaignId).call();
        console.log('Campaign details:', campaign);
        
        if (!campaign.active) {
          throw new Error('Campaign is not active');
        }
      } catch (err) {
        throw new Error('Failed to fetch campaign details: ' + err.message);
      }

      // Make the contribution
      const transaction = await contract.methods.contributeToCampaign(campaignId).send({
        from: account,
        value: amountInWei,
        gas: 3000000
      });

      console.log('Transaction result:', transaction);

      if (transaction.status) {
        // Show success alert
        alert(`Successfully donated ${amount} ETH!`);
        
        // Update campaign progress
        if (onDonationSuccess) {
          onDonationSuccess(amount);
        }
        
        // Close popup
        onClose();
      } else {
        throw new Error('Transaction failed');
      }

    } catch (err) {
      console.error('Detailed donation error:', err);
      if (err.code === 4001) {
        setError('Transaction rejected by user');
      } else if (err.message.includes('insufficient funds')) {
        setError('Insufficient funds in your wallet');
      } else if (err.message.includes('Campaign is not active')) {
        setError('This campaign is not active');
      } else {
        setError(`Failed to process donation: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative mx-4 md:mx-auto max-w-md w-full bg-white p-6 rounded-lg shadow-xl">
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-"
          >
            <span className="sr-only ">Close</span>
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 font-orbitron text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="amount" className="block font-orbitron text-gray-700 text-sm font-bold mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#10a37f]"
            placeholder="0.00"
            step="0.01"
            min="0"
            disabled={isLoading}
          />
        </div>

        <button
          onClick={handleDonate}
          disabled={isLoading || !amount}
          className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
            ${isLoading || !amount 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-[#10a37f] hover:bg-[#0d8c6d] text-white transition-colors duration-300'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            'Donate'
          )}
        </button>
      </div>
    </div>
  );
};

export default Popup;