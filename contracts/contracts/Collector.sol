// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Collector is Ownable {
    IERC20 public stakingToken;
    uint256 public listingCounter;

    struct Listing {
        string projectName;
        uint256 endDate;
        uint256 totalRaiseGoal;
        uint256 totalRaised;
        address creator;
        bool isActive;
        address ipId;
        uint256 tokenId;
        address spgNft;
    }

    mapping(uint256 => Listing) public listings;
    mapping(uint256 => mapping(address => uint256)) public userStakes;

    event ListingCreated(
        uint256 listingId,
        string projectName,
        uint256 endDate,
        uint256 totalRaiseGoal,
        address creator
    );
    event TokensStaked(uint256 listingId, address staker, uint256 amount);
    event ListingClosed(uint256 listingId);

    constructor(IERC20 _stakingToken) Ownable(msg.sender) {
        stakingToken = _stakingToken;
    }

    /**
     * @notice Create a new listing for fundraising
     * @param _projectName Name of the project
     * @param _endDate Timestamp when the fundraising ends
     * @param _totalRaiseGoal Amount of tokens to raise
     */
    function createListing(
        string memory _projectName,
        uint256 _endDate,
        uint256 _totalRaiseGoal,
        address _ipId,
        uint256 _tokenId,
        address _spgNft
    ) external {
        require(_endDate > block.timestamp, 'End date must be in the future');
        require(_totalRaiseGoal > 0, 'Raise goal must be greater than zero');

        listingCounter++;
        listings[listingCounter] = Listing({
            projectName: _projectName,
            endDate: _endDate,
            totalRaiseGoal: _totalRaiseGoal,
            totalRaised: 0,
            creator: msg.sender,
            isActive: true,
            ipId: _ipId,
            tokenId: _tokenId,
            spgNft: _spgNft
        });

        emit ListingCreated(
            listingCounter,
            _projectName,
            _endDate,
            _totalRaiseGoal,
            msg.sender
        );
    }

    /**
     * @notice Stake tokens into a specific listing
     * @param _listingId ID of the listing
     * @param _amount Amount of tokens to stake
     */
    function stakeTokens(uint256 _listingId, uint256 _amount) external {
        Listing storage listing = listings[_listingId];
        require(listing.isActive, 'Listing is not active');
        require(block.timestamp < listing.endDate, 'Fundraising has ended');
        require(_amount > 0, 'Amount must be greater than zero');

        stakingToken.transferFrom(msg.sender, address(this), _amount);

        listing.totalRaised += _amount;
        userStakes[_listingId][msg.sender] += _amount;

        emit TokensStaked(_listingId, msg.sender, _amount);
    }

    /**
     * @notice Get total amount raised for a listing
     * @param _listingId ID of the listing
     * @return Total amount raised
     */
    function getTotalRaised(
        uint256 _listingId
    ) external view returns (uint256) {
        return listings[_listingId].totalRaised;
    }

    /**
     * @notice Get the amount a user has staked for a specific listing
     * @param _listingId ID of the listing
     * @param _user Address of the user
     * @return Amount staked by the user
     */
    function getUserStake(
        uint256 _listingId,
        address _user
    ) external view returns (uint256) {
        return userStakes[_listingId][_user];
    }

    /**
     * @notice Close a listing (can only be done by the creator or after the end date)
     * @param _listingId ID of the listing
     */
    function closeListing(uint256 _listingId) external {
        Listing storage listing = listings[_listingId];
        require(
            msg.sender == listing.creator || block.timestamp >= listing.endDate,
            'Only creator or after end date can close'
        );
        require(listing.isActive, 'Listing already closed');

        listing.isActive = false;
        emit ListingClosed(_listingId);
    }
}
