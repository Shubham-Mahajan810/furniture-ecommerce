document.addEventListener("DOMContentLoaded", () => {
  const paymentForm = document.getElementById("paymentForm");
  const upiDetails = document.getElementById("upiDetails");
  const cardDetails = document.getElementById("cardDetails");
  const paymentRadios = document.querySelectorAll('input[name="payment"]');

  paymentRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      const selected = document.querySelector('input[name="payment"]:checked').value;
      upiDetails.style.display = selected === "upi" ? "block" : "none";
      cardDetails.style.display = selected === "card" ? "block" : "none";
    });
  });

  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const pin = document.getElementById("pin").value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    let message = `Name: ${name}\nAddress: ${address}, ${city} - ${pin}\nPayment Method: ${paymentMethod.toUpperCase()}`;

    if (paymentMethod === "upi") {
      const upiId = document.getElementById("upiId").value.trim();
      if (!upiId) {
        alert("Please enter your UPI ID.");
        return;
      }
      message += `\nUPI ID: ${upiId}`;
    } else if (paymentMethod === "card") {
      const card = document.getElementById("cardNumber").value.trim();
      const expiry = document.getElementById("expiry").value.trim();
      const cvv = document.getElementById("cvv").value.trim();

      if (!card || !expiry || !cvv) {
        alert("Please fill in all card details.");
        return;
      }

      message += `\nCard Number: ${card}\nExpiry: ${expiry}\nCVV: ${cvv}`;
    }

    alert("Payment Submitted Successfully!\n\n" + message);
  });
});
