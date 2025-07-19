document.addEventListener('DOMContentLoaded', () => {
  const slotSelect = document.getElementById('slot');
  const dateInput = document.getElementById('date');
  const form = document.getElementById('bookingForm');
  const confirmationDiv = document.getElementById('confirmation');

  // Set min date to today
  const today = new Date();
  dateInput.min = today.toISOString().split('T')[0];

  // Set max date to one month from today
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 1);
  dateInput.max = maxDate.toISOString().split('T')[0];

  // Populate time slots (7:00 to 19:00)
  for (let hour = 7; hour <= 19; hour++) {
    const timeStr = hour.toString().padStart(2, '0') + ':00';
    const option = document.createElement('option');
    option.value = timeStr;
    option.textContent = timeStr;
    slotSelect.appendChild(option);
  }

  // Handle form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const date = dateInput.value;
    const time = slotSelect.value;

    const payload = { name, date, time };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbz8B5Ndc-9iGcvwKNGwMZ-ibcTv4vWAK4KqLAemLTVa5xPa0Rb4eGFB4VHTeJDDArJR/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Show confirmation & hide form
      form.classList.add('hidden');
      confirmationDiv.classList.remove('hidden');
      confirmationDiv.innerHTML = `
        <h3>Thank you, ${name}!</h3>
        <p>Your adoration slot has been submitted for:</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p>Please take a screenshot of this confirmation.</p>
      `;
    } catch (error) {
      console.error('Booking error:', error);
      alert('Something went wrong. Please try again later.');
    }
  });
});
