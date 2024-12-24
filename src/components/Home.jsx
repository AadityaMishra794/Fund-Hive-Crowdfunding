import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import bg from "../assets/bg.png";
import Campaigncard from "./Campaigncard";
import { contractABI as abi, ContractAddress as contractAddress } from '../contracts/constants';
import { useWeb3 } from '../hooks/web3Context';

const Home = () => {
  const navigate = useNavigate();
  const { web3, account } = useWeb3();
  const [campaigns, setCampaigns] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: bg
  });
  const [isLoading, setIsLoading] = useState(false);

  // ... keeping all the existing handlers and useEffect ...
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!web3 || !account) {
        throw new Error("Please connect your wallet first");
      }

      const contract = new web3.eth.Contract(abi, contractAddress);

      const deadlineDate = new Date(formData.deadline);
      const deadlineTimestamp = Math.floor(deadlineDate.getTime() / 1000);
      const targetInWei = web3.utils.toWei(formData.target, 'ether');

      const transaction = await contract.methods.createCampaign(
        formData.title,
        formData.description,
        targetInWei,
        deadlineTimestamp
      ).send({ from: account });

      const campaignCount = await contract.methods.campaignCount().call();
      const newCampaignId = parseInt(campaignCount) - 1;

      const newCampaign = {
        id: newCampaignId,
        title: formData.title,
        description: formData.description,
        target: formData.target,
        deadline: formData.deadline,
        amountCollected: "0",
        owner: account,
        image: formData.image
      };

      setCampaigns([...campaigns, newCampaign]);

      setFormData({
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: bg
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    const fetchCampaigns = async () => {
      if (web3) {
        try {
          const contract = new web3.eth.Contract(abi, contractAddress);
          const campaignCount = await contract.methods.campaignCount().call();
          
          const fetchedCampaigns = [];
          for (let i = 0; i < campaignCount; i++) {
            const campaign = await contract.methods.campaigns(i).call();
            if (campaign.active) {
              fetchedCampaigns.push({
                id: i,
                title: campaign.title,
                description: campaign.description,
                target: web3.utils.fromWei(campaign.target, 'ether'),
                deadline: new Date(campaign.deadline * 1000).toLocaleDateString(),
                amountCollected: web3.utils.fromWei(campaign.amountCollected, 'ether'),
                owner: campaign.owner,
                image: cardimg
              });
            }
          }
          setCampaigns(fetchedCampaigns);
        } catch (error) {
          console.error("Error fetching campaigns:", error);
        }
      }
    };

    fetchCampaigns();
  }, [web3]);


  const handleCampaignUpdate = (campaignId, newAmount) => {
    setCampaigns(prevCampaigns => 
      prevCampaigns.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, amountCollected: newAmount }
          : campaign
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Introduction */}
      <div className="relative bg-gradient-to-b from-[#10a37f] to-[#0d8c6d] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-orbitron">
              Crowdfunding on the Blockchain
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto ">
              Launch your campaign and turn your creative ideas into reality. 
              Transparent, secure, and powered by blockchain technology.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => document.getElementById('create-campaign').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-[#10a37f] font-orbitron px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Start a Campaign
              </button>
              <button 
                onClick={() => document.getElementById('campaigns').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white font-orbitron text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#10a37f] transition duration-300"
              >
                View Campaigns
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Campaign Section */}
      <div id="create-campaign" className="relative py-16">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bg})` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl">
              <h2 className="text-3xl font-bold text-[#10a37f] mb-8 text-center font-orbitron">
                Create Your Campaign
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-gray-700 font-orbitron mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#10a37f]"
                    placeholder="Campaign Title"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block font-orbitron text-gray-700 font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#10a37f]"
                    placeholder="Campaign Description"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="target" className="block font-orbitron text-gray-700 font-medium mb-2">
                    Target Amount (ETH)
                  </label>
                  <input
                    type="number"
                    id="target"
                    value={formData.target}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#10a37f]"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-gray-700 font-orbitron mb-2">
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#10a37f]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !account}
                  className={`w-full py-3 px-6 rounded-md font-orbitron transition duration-300 ${
                    isLoading || !account
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#10a37f] hover:bg-[#0d8c6d] text-white"
                  }`}
                >
                  {!account ? "Please Connect Wallet" : isLoading ? "Creating..." : "Create Campaign"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign cards section */}
      <div id="campaigns" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#10a37f] mb-8 text-center font-orbitron">
            Active Campaigns
          </h2>
          
          {campaigns.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No active campaigns found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <Campaigncard
                  key={campaign.id}
                  campaignId={campaign.id}
                  {...campaign}
                  onUpdate={handleCampaignUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;