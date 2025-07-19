
document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");
    const slotSelect = document.getElementById("slot");
    const confirmation = document.getElementById("confirmation");

    const startHour = 7;
    const endHour = 19;
    for (let hour = startHour; hour < endHour; hour++) {
        const timeStr = `${hour.toString().padStart(2, '0')}:00 - ${(hour+1).toString().padStart(2, '0')}:00`;
        const option = document.createElement("option");
        option.value = timeStr;
        option.textContent = timeStr;
        slotSelect.appendChild(option);
    }

    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const date = document.getElementById("date").value;
        const slot = document.getElementById("slot").value;

        const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL';

        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(bookingForm)
        })
        .then(response => response.text())
        .then(responseText => {
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
        .catch(error => alert("Error occurred. Please try again later."));
    });
});
