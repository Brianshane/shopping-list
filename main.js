let shoppingItems = JSON.parse(
    localStorage.getItem("shoppingItems")
) || [];

const itemName = getElementById('itemName');
const itemPrice = getElementById('itemPrice');
const addBtn=getElementById('addBtn');
const shoppingList =getElementById('shoppingList');
const totalPrice = getElementById('totalPrice');
const clearBtn = getElementById('clearBtn');


addBtn.addEventListener("click", function () {
    const name = itemName.value.trim();
    const price = Number(itemPrice.value);

    if (name === "" || itemPrice.value === "" ||
        !Number.isFinite(price) || price < 0) {
        alert("Enter a valid item name and price.");
        return;
    }

    const newItem = {
        name: name,
        price: price,
        purchased: false
    };

    shoppingItems.push(newItem);

    displayItems();

    itemName.value = "";
    itemPrice.value = "";
});

function displayItems() {
    shoppingList.innerHTML = "";

    shoppingItems.forEach(function (item, index) {
        const li = document.createElement("li");

        if (item.purchased) {
            li.classList.add("purchased");
        }

        const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = item.purchased;

checkbox.addEventListener("change", function () {
    shoppingItems[index].purchased = checkbox.checked;
    displayItems();
});

        const text = document.createElement("span");
        text.className = "item-text";
        text.textContent = `${item.name} - KSh ${item.price.toFixed(2)}`;

        li.appendChild(checkbox);
        li.appendChild(text);

        shoppingList.appendChild(li);
    });

    updateTotal();
}

function updateTotal() {
    const total = shoppingItems.reduce(function (sum, item) {
        return sum + item.price;
    }, 0);

    totalCost.textContent = total.toFixed(2);
}
clearBtn.addEventListener("click", function () {
    shoppingItems = [];
    displayItems();
});
function saveItems() {
    localStorage.setItem(
        "shoppingItems",
        JSON.stringify(shoppingItems)
    );
}
displayItems();


