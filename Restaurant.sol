//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract RestaurantDapp {

       mapping (address => uint ) balances;

  function amountToPay()external payable{
               
    require (msg.value<1000,"failed");
    
       balances[msg.sender] += msg.value;
  }

  function getOwnerBalance() public view returns(uint){
        return address(this).balance;

  }

  function getBalancesIndividually()public view returns(uint){
             return balances[msg.sender];
  }

  function  getAmount()public{

  }
  }
