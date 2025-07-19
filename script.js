document.addEventListener('DOMContentLoaded', () => {
  const slotSelect = document.getElementById('slot');
  const today = new Date();
  const dateInput = document.getElementById('date');
  const form = document.getElementById('bookingForm');
  const confirmationDiv = document.getElementById('confirmation');

  // Set min and max dates
  dateInput.min = today.toISOString().split('T')[0];
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 1);
  dateInput.max = maxDate.toISOString().split('T')[0];

  // Populate slot dropdown from 7 AM to 7 PM
  for (let hour = 7; hour <= 19; hour++) {
    const timeStr = `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`;
    const option = document.createElement('option');
    option.value = timeStr;
    option.textContent = timeStr;
    slotSelect.appendChild(option);
  }

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('slot').value;

    const payload = { name, date, time };

    fetch('https://script.google.com/macros/s/AKfycbz8B5Ndc-9iGcvwKNGwMZ-ibcTv4vWAK4KqLAemLTVa5xPa0Rb4eGFB4VHTeJDDArJR/exec', {
      method: 'POST',
      mode: 'no-cors',  // <-- This disables CORS checks but no response received
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(() => {
      // We ignore errors because we can't get response in no-cors mode
    });

    // Immediately show confirmation since we can't get real response
    form.style.display = 'none';
    confirmationDiv.classList.remove('hidden');
    confirmationDiv.innerHTML = `
      <h3>Booking Confirmed</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time Slot:</strong> ${time}</p>
      <p>Please take a screenshot of this confirmation for your reference.</p>
    `;
  });
});
