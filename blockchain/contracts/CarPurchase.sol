// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarPurchase {
    struct Purchase {
        address buyer;
        string carId;
        uint256 amount;
        uint256 timestamp;
    }

    Purchase[] public purchases;

    function recordPurchase(string memory carId, uint256 amount) public {
        purchases.push(Purchase(msg.sender, carId, amount, block.timestamp));
    }

    function getPurchases() public view returns (Purchase[] memory) {
        return purchases;
    }
}