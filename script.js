let lastContent = null;

function openmenu() {
  document.querySelector(".MenuPage").style.transform = "translateX(0%)";
}

function closemenu() {
  document.querySelector(".MenuPage").style.transform = "translateX(-100%)";
}

function timechang(timestamp) {
  console.log("timestamp", timestamp);
  var date = new Date(parseInt(timestamp + "000", 10));

  var time =
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  return time;
}

const dataTable = document.getElementById("list_tableID");
const addButton = document.getElementById("linputBT_TEST");

function regenerateTable(
  tick,
  holderAmount,
  _maxSupply,
  deployTime,
  _totalMinted
) {
  while (dataTable.rows.length > 1) {
    dataTable.deleteRow(1);
  }
  const newRow = document.createElement("tr");
  const chain = document.createElement("td");
  const linkElement = document.createElement("a");
  //linkElement.href = "https://etherscan.io/";
  const paragraphElement = document.createElement("p");
  paragraphElement.textContent = tick;

  linkElement.appendChild(paragraphElement);

  linkElement.innerHTML += "frc20";
  chain.appendChild(linkElement);

  const timeCell = document.createElement("td");
  timeCell.textContent = timechang(deployTime);
  const progess = document.createElement("td");
  progess.textContent = ((_totalMinted / _maxSupply) * 100).toFixed(3) + "%";
  const holder = document.createElement("td");
  holder.textContent = holderAmount;
  const objectCell = document.createElement("td");
  objectCell.textContent = ">";
  newRow.appendChild(chain);
  newRow.appendChild(timeCell);
  newRow.appendChild(progess);
  newRow.appendChild(holder);
  newRow.appendChild(objectCell);

  newRow.addEventListener("click", () => {
    window.location.href = "Token.html?token=" + tick;
  });

  dataTable.appendChild(newRow);
}

//For button change color
document.addEventListener("DOMContentLoaded", function () {
  try {
    var buttons = document.querySelectorAll(".ftool button");
    buttons[0].classList.add("miInfoBTNactive");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        button.classList.add("ftoolBTNactive");
        buttons.forEach(function (btn) {
          if (btn !== button) {
            btn.classList.remove("ftoolBTNactive");
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
});

function listcoin(tick, holderAmount, _maxSupply, deployTime, _totalMinted) {
  if (
    isContentDifferent(tick, holderAmount, _maxSupply, deployTime, _totalMinted)
  ) {
    regenerateTable(tick, holderAmount, _maxSupply, deployTime, _totalMinted);
    lastContent = { tick, holderAmount, _maxSupply, deployTime, _totalMinted };
  }
}

function isContentDifferent(
  tick,
  holderAmount,
  _maxSupply,
  deployTime,
  _totalMinted
) {
  if (!lastContent) {
    return true;
  }

  return (
    lastContent.tick !== tick ||
    lastContent.holderAmount !== holderAmount ||
    lastContent._maxSupply !== _maxSupply ||
    lastContent.deployTime !== deployTime ||
    lastContent._totalMinted !== _totalMinted
  );
}

//For button change color
document.addEventListener("DOMContentLoaded", function () {
  try {
    var buttons = document.querySelectorAll(".miInfo button");
    buttons[0].classList.add("miInfoBTNactive");
    buttons.forEach(function (button) {
      if (button.classList.contains("List_BTN")) {
        return;
      }
      button.addEventListener("click", function () {
        button.classList.add("miInfoBTNactive");
        buttons.forEach(function (btn) {
          if (btn !== button) {
            btn.classList.remove("miInfoBTNactive");
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  showDiv("Market_Page1");
});

function showDiv(divId) {
  try {
    hideAllDivs();
    document.getElementById(divId).style.display = "block";
    if (divId == "Market_Page3") {
      getUserList();
    }
    if (divId == "Market_Page1") {
      getList();
    }
  } catch (error) {
    console.log(error);
  }
}

function hideAllDivs() {
  var divs = document.querySelectorAll('div[id^="Market_Page"]');
  divs.forEach(function (div) {
    div.style.display = "none";
  });
}
