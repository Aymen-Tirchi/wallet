// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wallet {
    mapping(address => uint256) private _balances;

    event Withdrawal(address indexed recipient, uint256 amount);
    event Deposit(address indexed sender, uint256 amount);

    function withdraw(uint256 amount) public {
        require(_balances[msg.sender] >= amount, "Insufficient balance");

        _balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);

        emit Withdrawal(msg.sender, amount);
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");

        _balances[msg.sender] += msg.value;

        emit Deposit(msg.sender, msg.value);
    }
}
