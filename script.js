document.addEventListener('DOMContentLoaded', () => {
  const slotSelect = document.getElementById('slot');
  const dateInput = document.getElementById('date');
  const form = document.getElementById('bookingForm');
  const confirmationDiv = document.getElementById('confirmation');

  // Set min and max dates for date input (today to +1 month)
  const today = new Date();
  dateInput.min = today.toISOString().split('T')[0];
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 1);
  dateInput.max = maxDate.toISOString().split('T')[0];

  // Populate time slots 7:00 to 19:00
  for (let hour = 7; hour <= 19; hour++) {
    const timeStr = hour.toString().padStart(2, '0') + ':00';
    const option = document.createElement('option');
    option.value = timeStr;
    option.textContent = timeStr;
    slotSelect.appendChild(option);
  }

  // Form submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const date = dateInput.value;
    const time = slotSelect.value;

    if (!name || !date || !time) {
      alert('Please fill all the fields.');
      return;
    }

    const payload = { name, date, time };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbz8B5Ndc-9iGcvwKNGwMZ-ibcTv4vWAK4KqLAemLTVa5xPa0Rb4eGFB4VHTeJDDArJR/exec', {
        method: 'POST',
        mode: 'no-cors', // prevents CORS issues but no response data
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Hide form and show confirmation message
      form.style.display = 'none';
      confirmationDiv.classList.remove('hidden');
      confirmationDiv.innerHTML = `
        <h3>Booking Confirmed!</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time Slot:</strong> ${time}</p>
        <p>Please take a screenshot of this confirmation for your records.</p>
      `;
    } catch (error) {
      console.error('Booking error:', error);
      alert('Something went wrong. Please try again later.');
    }
  });
});
