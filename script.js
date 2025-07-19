const scriptURL = "https://script.google.com/macros/s/AKfycbxHxP4aBWp84rwxnfafFEGtRDk8lYXWc5BsYbN7msE080-w3eyuMpEfZwGsfStbSfoQ/exec";

const form = document.getElementById("bookingForm");
const slotDropdown = document.getElementById("slot");
const confirmation = document.getElementById("confirmation");
const dateInput = document.getElementById("date");

// Set min and max booking dates
const today = new Date();
const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 1);

dateInput.min = today.toISOString().split("T")[0];
dateInput.max = maxDate.toISOString().split("T")[0];

// Generate slots from 7AM to 7PM
function generateSlots() {
    slotDropdown.innerHTML = "";
    for (let hour = 7; hour < 19; hour++) {
        const start = `${hour.toString().padStart(2, "0")}:00`;
        const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
        const option = document.createElement("option");
        option.value = `${start} - ${end}`;
        option.textContent = `${start} - ${end}`;
        slotDropdown.appendChild(option);
    }
}

generateSlots();

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const date = dateInput.value;
    const time = slotDropdown.value;

    if (!name || !date || !time) {
        alert("Please fill in all the fields.");
        return;
    }

    const bookingData = { name, date, time };

    fetch(scriptURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
    })
        .then((response) => response.json())
        .then((res) => {
            if (res.status === "success") {
                form.classList.add("hidden");
                confirmation.classList.remove("hidden");
                confirmation.innerHTML = `
                    <h3>Booking Confirmed!</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Time:</strong> ${time}</p>
                    <p>Please take a screenshot of this confirmation for your reference.</p>
                `;
            } else {
                alert(res.message || "Slot is already booked. Please select another.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Error: Failed to connect. Please try again later.");
        });
});
