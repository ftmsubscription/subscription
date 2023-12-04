var contractAddress = "0x062E904fcd616cE80a67a4f6c31B4b27D10e892F";
var web3;
var myContract;
var tick, holderAmount, maxSupply, deployTime, totalMinted, deployId, amountPerMint, decimals, deployer, txAmount;
var TokenC;
var fToken;
var ethid;
var address;
var balanceOf;
var timestart = false;
async function getHomePage() {
  try {
    const _address = document.getElementById('addressInput').value;
    console.log(_address)
    const result = await myContract.methods.getTokensByPage(1, 10).call();
    const TokenContract = result.tokens[0][0];
    TokenC = new web3.eth.Contract(abix, TokenContract);
    balanceOf = await TokenC.methods.balanceOf(_address).call();
    var data=[{ title: result.tokens[0][1], balance: balanceOf, price: '-' }];
    console.log(data);
    generateTokenHoldings(data);
} catch (error) {
    console.error(error);
  }
}

async function getTokenPage() {
  try {
    const result = await myContract.methods.getTokensByPage(1, 10).call();
    fToken = result;
    tick = result.tokens[0][1];
    const TokenContract = result.tokens[0][0];
    deployId = fToken[0][0].deployId;
    amountPerMint = fToken[0][0].amountPerMint;
    deployer = fToken[0][0].deployer;

    TokenC = new web3.eth.Contract(abix, TokenContract);

    holderAmount = await TokenC.methods.holderAmount().call();
    maxSupply = await TokenC.methods._maxSupply().call();
    deployTime = await TokenC.methods.deployTime().call();
    txAmount = await TokenC.methods.txAmount().call();
    totalMinted = await TokenC.methods._totalMinted().call();
    decimals = await TokenC.methods.decimals().call();

    updateTokenInfo();
  } catch (error) {
    console.error(error);
  }
}

function updateTokenInfo() {
  document.getElementById("InscriptionID").getElementsByTagName("span")[0].innerText = deployId;
  document.getElementById("Max_Supply").getElementsByTagName("span")[0].innerText = maxSupply;
  document.getElementById("Minted").getElementsByTagName("span")[0].innerText = totalMinted;
  document.getElementById("Deploy_Time").getElementsByTagName("span")[0].innerText = timechang(deployTime);
  document.getElementById("Creator").getElementsByTagName("span")[0].innerText = deployer;
  document.getElementById("Limit_per_mint").getElementsByTagName("span")[0].innerText = amountPerMint;
  document.getElementById("Decimal").getElementsByTagName("span")[0].innerText = decimals;
  document.getElementById("Deploy_By").getElementsByTagName("span")[0].innerText = deployer;
  document.getElementById("Holders").getElementsByTagName("span")[0].innerText = holderAmount;
  document.getElementById("Total_Transactions").getElementsByTagName("span")[0].innerText = txAmount;
}



async function getTokenList(page) {
  try {
    const result = await myContract.methods.getTokensByPage(1, 10).call();
    fToken = result;
    tick = result.tokens[0][1];
   
    const TokenContract = result.tokens[0][0];
    deployId = fToken[0][0].deployId;
    amountPerMint = fToken[0][0].amountPerMint;
    deployer = fToken[0][0].deployer;
    TokenC = new web3.eth.Contract(abix, TokenContract);
    holderAmount = await TokenC.methods.holderAmount().call();
    maxSupply = await TokenC.methods._maxSupply().call();
    deployTime = await TokenC.methods.deployTime().call();
    totalMinted = await TokenC.methods._totalMinted().call();

    listcoin(tick, holderAmount, maxSupply, deployTime, totalMinted);
  } catch (error) {
    console.error(error);
  }
}

function mintText(tokenNmea) {

  const e = '{"p":"frc20","op":"mint","tick":"' + tokenNmea + '","amt":"1000"}';
  const i = "text/plain;charset=utf-8";
  var o = ethers.utils.solidityPack(
    ["string", "uint8", "uint16", "uint32", "string", "string"],
    ["ftm", 1, i.length, e.length, i, e]
  );

  web3.eth.sendTransaction(
    {
      from: address,
      to: contractAddress,
      data: o,
    },
    (error, transactionHash) => {
      if (!error) {
        console.log("Transaction Hash:", transactionHash);
      } else {
        console.error("Error:", error);
      }
    }
  );
}

async function switchBlockchain() {
  try {
    if (window.ethereum) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xFA" }],
      });
    } else {
      console.log("Metamask is not installed or not enabled");
    }
  } catch (error) {
    console.error("Error switching blockchain:", error);
    if (error.code === 4902) {
      await addCustomBlockchain();
      console.log("Successfully added a new blockchain");
    } else {
      console.error("Error switching blockchain:", error);
    }
  }
}

async function addCustomBlockchain() {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0xFA",
          chainName: "Fantom Opera",
          nativeCurrency: {
            name: "FTM",
            symbol: "FTM",
            decimals: 18,
          },
          rpcUrls: ["https://rpc.ankr.com/fantom/"],
          blockExplorerUrls: ["https://ftmscan.com/"],
        },
      ],
    });
  } catch (error) {
    console.error("Error adding a new blockchain:", error);
  }
}

var count = 0;

function setsetInterval() {
  setInterval(function () {
    var results;
    ethereum.request({ method: "eth_requestAccounts" }).then((result) => {
      results = result[0];
      if (results !== address) {
        console.log(results, address);
        address = results;
        Walletconnect();
      }
    });

    this.web3.eth.net.getId((err, netID) => {
      if (netID != ethid) {
        console.log("netID", netID);
        console.log(ethid);
        Walletconnect();
      }
    });
    var currentURL = window.location.href;
    if (count % 5 == 0) {
      if (currentURL.includes("Token")) {
        getTokenPage();
      } else if(currentURL.includes("home")){
       
      }else{
         getTokenList(1);
        
      }
    }
    count++;
  }, 600);
}

document.addEventListener("DOMContentLoaded", function () {
  Walletconnect();
});

function Walletconnect() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.send("eth_requestAccounts");
  } else {
    alert("Please install the wallet");
  }

  ethereum
    .request({ method: "eth_requestAccounts" })
    .then((result) => {
    document.getElementById("connectedId").style.display = "none";
      address = result[0];
      var newAddress = address;
      newAddress = newAddress.substr(0, 4) + "..." + newAddress.substr(38, 4);
      account.innerHTML = newAddress;

      if (!timestart) {
        setsetInterval();
        timestart = true;
      }

      this.web3.eth.net.getId((err, netID) => {
        ethid = netID;
        if (netID != 0xFA) {
          showWrongNetwork();
          switchBlockchain();
        } else {        
         showConnected();
        }
      });
    })
    .catch((error) => {
      console.log("error", error);
    });

  web3 = new Web3(web3.currentProvider);
  myContract = new web3.eth.Contract(abix, contractAddress);
}
