document.addEventListener('DOMContentLoaded', () => {
  const timeSelect = document.getElementById('time');
  const dateInput = document.getElementById('date');
  const form = document.getElementById('bookingForm');
  const confirmationDiv = document.getElementById('confirmation');

  // Set min and max date limits (today to one month ahead)
  const today = new Date();
  dateInput.min = today.toISOString().split('T')[0];
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 1);
  dateInput.max = maxDate.toISOString().split('T')[0];

  // Populate time slots 7 AM - 7 PM
  for (let hour = 7; hour <= 19; hour++) {
    const label = (hour < 12 ? hour + ' AM' : (hour === 12 ? '12 PM' : (hour - 12) + ' PM'));
    const value = `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`;
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    timeSelect.appendChild(option);
  }

  // Form submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const date = dateInput.value;
    const time = timeSelect.value;

    if (!name || !date || !time) {
      alert('Please fill all the fields.');
      return;
    }

    const payload = { name, date, time };

    fetch('https://script.google.com/macros/s/AKfycbz8B5Ndc-9iGcvwKNGwMZ-ibcTv4vWAK4KqLAemLTVa5xPa0Rb4eGFB4VHTeJDDArJR/exec', {
      method: 'POST',
      mode: 'no-cors', // Avoid CORS issues, but no response returned
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(() => {
      // Ignore errors because we cannot access response with no-cors
    });

    // Show confirmation immediately
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
