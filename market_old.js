var marketAddress = "0xAA6Ae7d512abb849Be89715Ce530dbdF011275bA";
var marketContract;
marketContract = new web3.eth.Contract(abix, marketAddress);


// async function buyItem(id,price) {
//    await marketContract.methods
//     .buyOrder(id)
//     .send({
//       from: address,
//       value: web3.utils.toWei(price, "ether"),
//     })
//     .then(function (err, result) {
//       console.log("result", result);
//     });
//   console.log("here6");
// }



function closeList() {
  $("#list_box").css("display", "none");
}

async function confirmOrder() {
  console.log("here");

  var amount = document.getElementById("amountInput").value;
  var price = document.getElementById("priceInput").value;

  if (amount.trim() === "" || price.trim() === "") {
    alert("Amount and price cannot be empty");
    return;
  }

  const result = await myContract.methods.getTokensByPage(1, 10).call();
  console.log("here3");

  fToken = result;
  tick = result.tokens[0][1];
  console.log("here4");
  const TokenContract = result.tokens[0][0];
  console.log("here5", TokenContract, price, amount);
//   var gasEstimation;
//   try {
//     gasEstimation = await marketContract.methods
//       .createOrder(TokenContract, price, amount)
//       .estimateGas({
//         from: address,
//         value: web3.utils.toWei("0", "ether"),
//       });

//     console.log("Estimated Gas: ", gasEstimation);
//   } catch {
//     gasEstimation = web3.utils.toHex("0xfffffffffffff");
//   }
  await marketContract.methods.createOrder(TokenContract, price, amount)
    .send({
      from: address,
    })
    .then(function (err, result) {
      console.log("result", result);
    });
  console.log("here6");
}
