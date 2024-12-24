import { useState } from 'react';
import Popup from './Transfer-popup';
import cardimg from '../assets/cardimg.png';

const Campaigncard = ({ 
  campaignId, 
  title, 
  description, 
  target, 
  deadline, 
  amountCollected: initialAmountCollected, 
  owner,
  images,
  onUpdate
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [amountCollected, setAmountCollected] = useState(initialAmountCollected);

  const handleTransfer = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDonationSuccess = (donatedAmount) => {
    const newAmount = (parseFloat(amountCollected) + parseFloat(donatedAmount)).toString();
    setAmountCollected(newAmount);
    
    if (onUpdate) {
      onUpdate(campaignId, newAmount);
    }
  };

  // Log campaignId for debugging
  console.log('Campaign Card ID:', campaignId);

  // Calculate progress percentage
  const progress = (parseFloat(amountCollected) / parseFloat(target)) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {isPopupOpen && (
        <Popup 
          onClose={handleClosePopup}
          campaignId={Number(campaignId)}
          onDonationSuccess={handleDonationSuccess}
        />
      )}
      
      {/* Campaign Image */}
      <div className="relative h-48">
        <img
          // src={cardimg || cardimg}
          src={images || cardimg }
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Campaign Details */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm font-orbitron">{description}</p>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-[#10a37f] h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-orbitron">
              Raised: {amountCollected} ETH
            </span>
            <span className="text-gray-600 font-orbitron">
              Goal: {target} ETH
            </span>
          </div>
        </div>

        <button
          onClick={handleTransfer}
          className="w-full bg-[#10a37f] text-white px-4 py-2 rounded-md hover:bg-[#0d8c6d] 
                   transition-colors duration-300 font-medium focus:outline-none focus:ring-2 
                   focus:ring-[#10a37f] focus:ring-opacity-50 font-orbitron"
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default Campaigncard;