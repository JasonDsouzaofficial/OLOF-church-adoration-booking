document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");
    const slotSelect = document.getElementById("slot");
    const confirmation = document.getElementById("confirmation");
    const dateInput = document.getElementById("date");

    // Set date input min and max (today to one month ahead)
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 1);
    dateInput.min = today.toISOString().split("T")[0];
    dateInput.max = maxDate.toISOString().split("T")[0];

    // Populate time slots 7:00 to 18:00 (each slot is 1 hour)
    const startHour = 7;
    const endHour = 19;
    for (let hour = startHour; hour < endHour; hour++) {
        const timeStr = `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`;
        const option = document.createElement("option");
        option.value = timeStr;
        option.textContent = timeStr;
        slotSelect.appendChild(option);
    }

    const scriptURL = "https://script.google.com/macros/s/AKfycbz0AhiSa39sS7OVse0g2XF9Qxg_p7sBCa0jhtUW4VOJWZuT035l9rAXYQ2vMmtSr3qH/exec";

    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const date = dateInput.value;
        const slot = slotSelect.value;

        fetch(scriptURL, {
  method: "POST",
  body: JSON.stringify({ name, date, time: slot }),
  headers: { "Content-Type": "application/json" }
})
.then(async response => {
  const text = await response.text();
  try {
    const json = JSON.parse(text);
    if (json.status === "error") {
      throw new Error(json.message);
    }
    return json;
  } catch {
    throw new Error("Unexpected server response: " + text);
  }
})
.then(data => {
  bookingForm.style.display = "none";
  confirmation.classList.remove("hidden");
  confirmation.innerHTML = `
    <h3>Booking Confirmed</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Time Slot:</strong> ${slot}</p>
    <p>Please take a screenshot of this confirmation.</p>
  `;
})
.catch(error => {
  alert("Error: " + error.message);
  console.error("Booking error:", error);
});

