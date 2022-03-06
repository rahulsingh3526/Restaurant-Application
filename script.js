 const price= document.getElementById("price").value;
         const finalPrice = price/1000;
         
      window.ethereum.enable();
        var provider = new ethers.providers.Web3Provider(
        web3.currentProvider,
        "ropsten"
);
        var dappContractAddress = "0xB3FAB99a4AaF411038aB86FC2fEBf88E8f9f90d3";
  var dappContractABI = [
	{
		"inputs": [],
		"name": "amountToPay",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalancesIndividually",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwnerBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
  var dappContract
  var signer

     provider.listAccounts().then(function (accounts) {
  signer = provider.getSigner(accounts[0]);
  dappContract = new ethers.Contract(
    dappContractAddress,
    dappContractABI,
    signer
  );
})
        async function getBalancesIndividually(){
  indiPaymentPromise = dappContract.getBalancesIndividually();
  var Amount = await indiPaymentPromise.wait();
  console.log(Amount);
}

async function amountToPay() {
    console.log(finalPrice)
    const option = {value:ethers.utils.parseEther(finalPrice.toString())}
    console.log(option)
    
 let userPayPromise = dappContract.amountToPay(option);
  await userPayPromise.wait()
}


let amount = 0;
let totalBill = 0;
for(let i=0; i<13 ; i++){
    document.querySelectorAll("li")[i].addEventListener("click",(event) =>{
    let text = event.target.classList[0] + "1";
    event.target.classList.toggle("dark")
    document.querySelector("." + text).classList.toggle("hidden");
    let currentPrice = event.target.querySelector("em").innerText;
    amount = amount + parseInt(currentPrice);
    if(event.target.classList[1] == "dark")
      amount = amount - (2 * parseInt(currentPrice));
    document.querySelector(".bill").value = amount;
    });
}



const btn = document.querySelector(".btn")
const error = document.querySelector(".error")
const tip = document.querySelector(".tip")
const total = document.querySelector(".total")

btn.addEventListener("click", calculateTip)


// .toString()
// setTimeout(func, time(in ms))

function hideError() {
  setTimeout(() => {
    error.style.display = "none"
  }, 3000)
}
  const priceToPay =document.querySelector("#price")

function calculateTip() {
  const tip = document.querySelector(".tip")
  const bill = document.querySelector(".bill").value
  console.log(bill)
  const rate = document.querySelector(".rate").value
  console.log(rate)

  if (bill === "" || rate == "") {
    error.style.display = "block"
    hideError()
  } 
  else if (isNaN(bill)) { // it is a function that checks if the input is Not a Number --> boolean
    error.innerHTML = "Please enter a Number!"
    error.style.display = "block"
    hideError()
  }
  else {
    let tipAmount = Math.round(bill * rate)
    tip.innerHTML = `Tip Amount: ${tipAmount}`
    totalBill = Number(bill) + tipAmount
    total.innerHTML = `Total Amount: ${totalBill}`
    priceToPay.value= totalBill
    
  }
}
