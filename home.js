
// Function to create a tick div
function createTickDiv(data) {
  const tickDiv = document.createElement('div');
  tickDiv.className = 'tick_div';

  const title = document.createElement('p');
  title.className = 'tick_Title';
  title.innerText = data.title;

  const balance = document.createElement('p');
  balance.className = 'tick_balance';
  balance.innerHTML = `Balance:<span>${data.balance}</span>`;

  const price = document.createElement('p');
  price.className = 'tick_price';
  price.innerHTML = `Price:<span>${data.price}</span>`;

  const button = document.createElement('button');
  button.className = 'trade_BTN';
  button.innerText = 'Trade';

  // Append elements to tickDiv
  tickDiv.appendChild(title);
  tickDiv.appendChild(balance);
  tickDiv.appendChild(price);
  tickDiv.appendChild(button);

  return tickDiv;
}

// Function to generate the tick container
function generateTickContainer(data) {
  const tickContainer = document.createElement('div');
  tickContainer.className = 'tick_container';

 if (Array.isArray(data)) {
    data.forEach((tickData) => {
      const tickDiv = createTickDiv(tickData);
      tickContainer.appendChild(tickDiv);
    });
  } else {
    console.error('Data is not an array:', data);
  }

  return tickContainer;
}



// Call the function to generate Token Holdings with example data

function generateTokenHoldings(data) {
    var homeBalanceOf = document.getElementById("home_balanceOf");
    homeBalanceOf.innerHTML ="";
    data.forEach(function(item) {
        var tickDiv = document.createElement("div");
        tickDiv.className = "tick_div";

        tickDiv.innerHTML = `
            <p class="tick_Title">${item.title}</p>
            <p class="tick_balance">Balance:<span>${item.balance}</span></p>
            <p class="tick_price">Price:<span>${item.price}</span></p>  
            <button class="trade_BTN" onclick="openTransferDialog()">Transfer</button>

        `;

        homeBalanceOf.appendChild(tickDiv);
    });
}
function openTransferDialog() {
    var dialog = document.createElement("div");
    dialog.innerHTML = `
      <div class="overlay"></div>
        <div class="transfer-dialog">
            <div class="transfer-Address">
            <label for="transferAddress">Address:</label>
            <input type="text" id="transferAddress" placeholder="Enter Address">
            </div>
            <div class="transfer-Amount">
            <label for="transferAmount">Amount:</label>
            <div class="transfer-Amount-input">
            <input type="text" id="transferAmount" placeholder="Enter Amount">
            <button onclick="">Max</button>
            </div>
            </div>
            <div class="button-container">
                <button onclick="performTransfer()">Confirm</button>
                <button onclick="closeTransferDialog()">Cancel</button>
            </div>
        </div>
    `;

    document.body.appendChild(dialog);
}

function performTransfer() {
    var transferAddress = document.getElementById("transferAddress").value;
    var transferAmount = document.getElementById("transferAmount").value;
    transText(transferAmount,transferAddress);

    closeTransferDialog();
}

function closeTransferDialog() {
    var overlay = document.querySelector(".overlay");
    if (overlay) {
        overlay.parentNode.removeChild(overlay);
    }

    var dialog = document.querySelector(".transfer-dialog");
    if (dialog) {
        dialog.parentNode.removeChild(dialog);
    }
}

var style = document.createElement("style");
style.innerHTML = `
    
`;
document.head.appendChild(style);


// window.onload = function() {
//     openTransferDialog();
// };