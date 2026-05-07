document.addEventListener("DOMContentLoaded", () => {

  // IMAGE PREVIEW
  const upload = document.getElementById("upload");
  const preview = document.getElementById("preview");

  if (upload && preview) {
    upload.addEventListener("change", () => {
      const file = upload.files[0];
      if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
      }
    });
  }

  // PRICE CALCULATION
  const size = document.getElementById("size");
  const style = document.getElementById("style");
  const priceText = document.getElementById("price");

  function updatePrice() {
    const sizePrice = parseInt(size.value) || 0;
    const stylePrice = parseInt(style.value) || 0;
    const total = sizePrice + stylePrice;

    priceText.innerText = "Total Price: ₹" + total;
  }

  if (size && style) {
    size.addEventListener("change", updatePrice);
    style.addEventListener("change", updatePrice);
  }

});


// WHATSAPP ORDER (CUSTOM)
function generateOrderId() {
  return "ART" + Math.floor(Math.random() * 100000);
}

function sendToWhatsApp() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const size = document.getElementById("size").value;
  const style = document.getElementById("style").value;
  const payment = document.getElementById("payment").value;
  const details = document.getElementById("details").value;
  const price = document.getElementById("price").innerText;

  if (!name || !phone) {
    alert("Please fill name and phone");
    return;
  }

  // ✅ GENERATE UNIQUE ORDER ID
  const orderId = "ART" + Date.now();

  // ✅ SAVE ORDER
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    id: orderId,
    name,
    phone,
    product: "Custom Painting",
    price,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  // ✅ SAVE CURRENT ORDER FOR CONFIRMATION PAGE
  localStorage.setItem("currentOrderId", orderId);

  // ✅ WHATSAPP MESSAGE
  const message = `🖌️ Order ID: ${orderId}

Name: ${name}
Phone: ${phone}
Price: ${price}
Payment: ${payment}

Details: ${details}`;

  window.open(`https://wa.me/919970184634?text=${encodeURIComponent(message)}`);

  // ✅ REDIRECT TO CONFIRMATION PAGE
  window.location.href = "confirmation.html";
}


function orderProduct(productName, productPrice) {

  const name = prompt("Enter your name:");
  const phone = prompt("Enter your phone number:");

  if (!name || !phone) {
    alert("Name and phone required!");
    return;
  }

  const orderId = "ART" + Date.now();

  const order = {
    id: orderId,
    name: name,
    phone: phone,
    product: productName,
    price: "₹" + productPrice,
    date: new Date().toLocaleString()
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  // Save for confirmation page
  localStorage.setItem("currentOrderId", orderId);

  const message = `🖼️ Painting Order

Order ID: ${orderId}
Name: ${name}
Phone: ${phone}

Product: ${productName}
Price: ₹${productPrice}`;

  window.open(`https://wa.me/919970184634?text=${encodeURIComponent(message)}`);

  window.location.href = "confirmation.html";
}
// POPUP CONTROL
function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
function goToProduct(name, price) {
  localStorage.setItem("productName", name);
  localStorage.setItem("productPrice", price);
  window.location.href = "product.html";
}
/* PAYMENT METHODS */

/* PAYMENT BOXES */

function showPaymentFields() {

  let payment = document.getElementById("payment").value;

  let upiBox = document.getElementById("upiBox");
  let cardBox = document.getElementById("cardBox");
  let netBox = document.getElementById("netBox");

  upiBox.style.display = "none";
  cardBox.style.display = "none";
  netBox.style.display = "none";

  if(payment === "UPI") {
    upiBox.style.display = "block";
  }

  else if(payment === "CARD") {
    cardBox.style.display = "block";
  }

  else if(payment === "NETBANKING") {
    netBox.style.display = "block";
  }
}
