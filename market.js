var marketAddress = "0xdfd4d6c432111f8a8250f17fb54a4f6e4a8e0168";
var marketContract;
var TokenContract;
var result_id;
var floor;

document.addEventListener("DOMContentLoaded", function () {
  marketContract = new web3.eth.Contract(abix, marketAddress);
});

async function getHolders() {
  const result = await myContract.methods.getTokensByPage(1, 10).call();
  const TokenContract = result.tokens[0][0];
  TokenC = new web3.eth.Contract(abix, TokenContract);
  holderAmount = await TokenC.methods.holderAmount().call();
  document.getElementById("Holders").innerHTML = formatNumberAbbreviation(holderAmount);
}
 
async function getTotalMinted() {
  const result = await myContract.methods.getTokensByPage(1, 10).call();
  const TokenContract = result.tokens[0][0];
  TokenC = new web3.eth.Contract(abix, TokenContract);
  totalMinted = await TokenC.methods._totalMinted().call();
  document.getElementById("Supply").innerHTML = formatNumberAbbreviation(totalMinted);
}

async function getMax() {
    const result = await myContract.methods.getTokensByPage(1, 10).call();
    const TokenContract = result.tokens[0][0];
    TokenC = new web3.eth.Contract(abix, TokenContract);
    balanceOf = await TokenC.methods.balanceOf(address).call();
    document.getElementById("MarketListAmount").value = formatNumberAbbreviation(balanceOf);
}

async function getTotalVolume() {
    var volume = await marketContract.methods.totalVolume().call();
    document.getElementById("Volume").innerHTML =  roundToSeventeenDecimals(web3.utils.fromWei(volume, "ether"));
}


function openMarketListDialog() {
  var dialog = document.createElement("div");
  dialog.innerHTML = `
      <div class="overlay"></div>
        <div class="MarketList-dialog">
            <div class="MarketList-Title">
              <p>List</p>
              <p>FTMS</p>
            </div>
            <div class="MarketList-Address">
            <label for="MarketListPrice">Price(FTM):</label>
            <input type="text" id="MarketListPrice" placeholder="Enter Price(FTM)">
            </div>
            <div class="MarketList-Amount">
            <label for="MarketListAmount">Amount:</label>
            <div class="MarketList-Amount-input">
            <input type="text" id="MarketListAmount" placeholder="Enter Amount">
            <button onclick="getMax()">Max</button>
            </div>
            </div>
            <div class="button-container">
                <button id="OrderConfirm" onclick="confirmOrder()">Confirm</button>
                <button onclick="closeMarketListDialog()">Cancel</button>
            </div>
        </div>
    `;

  document.body.appendChild(dialog);
}

function closeMarketListDialog() {
  var overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.parentNode.removeChild(overlay);
  }

  var dialog = document.querySelector(".MarketList-dialog");
  if (dialog) {
    dialog.parentNode.removeChild(dialog);
  }
}

async function CancelOrder(id) {
  console.log("here_cancelOrder",id);
  await marketContract.methods
    .cancelOrder(id)
    .send({
      from: address,
    })
    .then(function (err, result) {
      console.log("result", result);
    });
}

async function buyItem(id, price) {
  console.log("buyItem(id, price)", id, price);
  await marketContract.methods
    .buyOrder(id)
    .send({
      from: address,
      value: price,
    })
    .then(function (err, result) {
      console.log("result", result);
    });
}

async function confirmOrder() {
  var confirmButton = document.getElementById("OrderConfirm");
  confirmButton.disabled = !confirmButton.disabled;
  confirmButton.innerHTML="Confirming..."
  
  marketContract = new web3.eth.Contract(abix, marketAddress);

  var amount = document.getElementById("MarketListAmount").value;
  var price = document.getElementById("MarketListPrice").value;

  if (amount.trim() === "" || price.trim() === "") {
    alert("Amount and price cannot be empty");
    return;
  }
  try{
  var result = await myContract.methods.getTokensByPage(1, 10).call();

  fToken = result;
  tick = result.tokens[0][1];
  TokenContract = result.tokens[0][0];
  var priceWei = web3.utils.toWei(price, "ether");

  await marketContract.methods
    .createOrder(TokenContract, priceWei, amount)
    .send({
      from: address,
    });
  closeMarketListDialog();

  }catch{
    confirmButton.innerHTML="Confirm"
    confirmButton.disabled = !confirmButton.disabled;
  }
 
}

async function getList() {
  var allOrders = [];

  const result = await myContract.methods.getTokensByPage(1, 10).call();

  fToken = result;
  tick = result.tokens[0][1];
  TokenContract = result.tokens[0][0];

  let result_id = await marketContract.methods
    .getActiveOrders(TokenContract, 50000, 1)
    .call();

  // Fetch all orders

  let currentPage = 1;
  let pageSize = 100;

  if (result_id.length > 0) {
    var result_list = await marketContract.methods
      .getOrders(result_id)
      .call();

    for (let n = 0; n < result_id.length; n++) {
      const token = {
        price: result_list[n].price,
        seller: result_list[n].seller,
        amount: result_list[n].amount,
        id: result_id[n],
      };

      // Do something with the token, for example, push it into an array
      allOrders.push(token);
    }

  }

  refreshListed(allOrders, result_id);
}

async function getUserList() {
  var allMyOrders = [];

  const result = await myContract.methods.getTokensByPage(1, 10).call();

  fToken = result;
  tick = result.tokens[0][1];
  TokenContract = result.tokens[0][0];

  var result_id = await marketContract.methods
    .getUserOrdersByToken(address, TokenContract)
    .call();

  // Fetch all orders

  var currentPage = 1;
  var pageSize = 100;

  if (result_id.length > 0) {
    const result_list = await marketContract.methods
      .getOrders(result_id)
      .call();

    for (let n = 0; n < result_id.length; n++) {
      const token = {
        price: result_list[n].price,
        seller: result_list[n].seller,
        amount: result_list[n].amount,
        id: result_id[n],
      };

      // Do something with the token, for example, push it into an array
      allMyOrders.push(token);
    }
  }

  // console.log("allMyOrders", allMyOrders);
  refreshMyList(allMyOrders);
}

function refreshListed(allOrders) {
  const listed = $("#listed");
  listed.empty();

  const sortedTokenList = allOrders.slice().sort((a, b) => a.price - b.price);
  floor=sortedTokenList[0].price;
  Floor.innerHTML=web3.utils.fromWei(floor, "ether") ;
  // Render items based on the sorted token list
  sortedTokenList.forEach((token) => {
    listed.append(
      renderListedItem(token.amount, token.price, token.seller, token.id)
    );
  });

  showListed();
}

function refreshMyList(allOrders) {

  my_listed = $("#my_listed");
  my_listed.empty();
  const sortedTokenList = allOrders.slice().sort((a, b) => a.price - b.price);

  // Render items based on the sorted token list
  sortedTokenList.forEach((token) => {
    my_listed.append(
      renderMyListItem(token.amount, token.price, token.seller, token.id)
    );
  });

  showMyList();
}

// render an item to append
function renderListedItem(amount, price, seller, id) {
  var shortenedSeller =
    seller.length > 10
      ? seller.substring(0, 5) + "..." + seller.slice(-5)
      : seller;

  item =
    '<div class="miMyInsItem02"><div class="tradelist_info_T">' +
    '<div class="miItem_name">FTMS</div>' +
    '<div class="miItem_chain_div"><button>frc-20</button></div>' +
    '<div class="miItem_amount"><span>' +
    Intl.NumberFormat().format(amount) +
    "</span></div>" +
    '<div class="miItem_per_price"><span>' +
     web3.utils.fromWei(price, "ether")/amount +
    " FTM/FTMS</span></div>" +
    "</div>" +
    '<div class="tradelist_info_B">' +
    '<div class="miItem_seller"><p >Seller:</p><span>' +
    shortenedSeller +
    "</span></div>" +
    '<div class="Splitline"><i style="border-bottom: 1px solid gray;width:99%;"></i></div>' +
    '<div class="miItem_price"><img src="https://cdn.glitch.global/db7f31e4-4de3-4887-a6ab-efa14b86c05f/Ftm.svg?v=1702526884748" alt="" style="width: 25px; height: 25px; float: left; margin-right: 10px;"><span>' +
    web3.utils.fromWei(price, "ether") +
    "</span></div>" +
    '<button class="trade_BTN02" onclick="buyItem(' +
    id +
    "," +
    price +
    ')">Buy</button>' +
    "</div>" +
    "</div>";
  
  return item;
}

function renderMyListItem(amount, price, seller, id) {
  var shortenedSeller =
    seller.length > 10
      ? seller.substring(0, 5) + "..." + seller.slice(-5)
      : seller;

  item =
    '<div class="miMyInsItem02"><div class="tradelist_info_T">' +
    '<div class="miItem_name">FTMS</div>' +
    '<div class="miItem_chain_div"><button>frc-20</button></div>' +
    '<div class="miItem_amount"><span>' +
    Intl.NumberFormat().format(amount) +
    "</span></div>" +
    '<div class="miItem_per_price"><span>' +
    web3.utils.fromWei(price, "ether")/amount+
    " FTM/FTMS</span></div>" +
    "</div>" +
    '<div class="tradelist_info_B">' +
    '<div class="miItem_seller"><p >Seller:</p><span>' +
    shortenedSeller +
    "</span></div>" +
    '<div class="Splitline"><i style="border-bottom: 1px solid gray;width:99%;"></i></div>' +
    '<div class="miItem_price"><img src="https://cdn.glitch.global/db7f31e4-4de3-4887-a6ab-efa14b86c05f/Ftm.svg?v=1702526884748" alt="" style="width: 25px; height: 25px; float: left; margin-right: 10px;"><span>' +
    web3.utils.fromWei(price, "ether") +
    "</span></div>" +
    '<button class="trade_BTN02" onclick="CancelOrder(' +
    id +
    ')">Cancel</button>' +
    "</div>" +
    "</div>";
 
  return item;
}

function formatNumberAbbreviation(number) {
  const absNumber = Math.abs(number);

  if (absNumber >= 1e6) {
    const result = (absNumber / 1e6).toFixed(6);
    return result.replace(/\.?0+$/, '') + 'M';
  } else if (absNumber >= 1e3) {
    const result = (absNumber / 1e3).toFixed(6);
    return result.replace(/\.?0+$/, '') + 'K';
  } 
}

function roundToSeventeenDecimals(number) {
  const absNumber = Math.abs(number);
  return absNumber.toFixed(17).replace(/\.?0+$/, ''); 
  
}
