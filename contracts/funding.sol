// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Crowdfunding {
    struct Campaign {
        string name;
        string description;
        uint256 goal;
        uint256 deadline;
        uint256 amountCollected;
        address owner;
        bool active;
        mapping(address => uint256) contributions;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;
    
    event CampaignCreated(uint256 campaignId, string name, uint256 goal, uint256 deadline);
    event ContributionReceived(uint256 campaignId, address contributor, uint256 amount);
    event FundsWithdrawn(uint256 campaignId, uint256 amount);
    event CampaignCancelled(uint256 campaignId);

    function createCampaign(
        string memory _name,
        string memory _description, 
        uint256 _goal,
        uint256 _durationInDays
    ) public returns (uint256) {
        require(_goal > 0, "Goal must be greater than 0");
        require(_durationInDays > 0, "Duration must be greater than 0");
        
        uint256 campaignId = campaignCount++;
        Campaign storage campaign = campaigns[campaignId];
        
        campaign.name = _name;
        campaign.description = _description;
        campaign.goal = _goal;
        campaign.deadline = block.timestamp + (_durationInDays * 1 days);
        campaign.amountCollected = 0;
        campaign.owner = msg.sender;
        campaign.active = true;

        emit CampaignCreated(campaignId, _name, _goal, campaign.deadline);
        return campaignId;
    }

    function contributeToCampaign(uint256 _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.active, "Campaign is not active");
        require(msg.value > 0, "Contribution must be greater than 0");
        
        campaign.amountCollected += msg.value;
        campaign.contributions[msg.sender] += msg.value;
        
        emit ContributionReceived(_campaignId, msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        
        require(msg.sender == campaign.owner, "Only campaign owner can withdraw");
        require(campaign.active, "Campaign is not active");
        require(block.timestamp > campaign.deadline, "Campaign has not ended yet");
        require(campaign.amountCollected >= campaign.goal, "Goal not reached");

        uint256 amount = campaign.amountCollected;
        campaign.amountCollected = 0;
        campaign.active = false;
        
        payable(campaign.owner).transfer(amount);
        emit FundsWithdrawn(_campaignId, amount);
    }

    function getCampaignDetails(uint256 _campaignId) public view returns (
        string memory name,
        string memory description,
        uint256 goal,
        uint256 deadline,
        uint256 amountCollected,
        address owner,
        bool active
    ) {
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.name,
            campaign.description,
            campaign.goal,
            campaign.deadline,
            campaign.amountCollected,
            campaign.owner,
            campaign.active
        );
    }

    function getContribution(uint256 _campaignId, address _contributor) public view returns (uint256) {
        return campaigns[_campaignId].contributions[_contributor];
    }

    function cancelCampaign(uint256 _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        
        require(msg.sender == campaign.owner, "Only campaign owner can cancel");
        require(campaign.active, "Campaign is not active");
        
        campaign.active = false;
        emit CampaignCancelled(_campaignId);
    }
}

