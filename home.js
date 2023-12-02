
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
            <button class="trade_BTN">Trade</button>
        `;

        homeBalanceOf.appendChild(tickDiv);
    });
}