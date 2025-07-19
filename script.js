document.addEventListener('DOMContentLoaded', () => {
  const slotSelect = document.getElementById('time');
  const dateInput = document.getElementById('date');
  const form = document.getElementById('bookingForm');
  const confirmationDiv = document.getElementById('confirmation');

  // Set min and max dates (tomorrow to one month from tomorrow)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = tomorrow.toISOString().split('T')[0];

  const maxDate = new Date(tomorrow);
  maxDate.setMonth(maxDate.getMonth() + 1);
  dateInput.max = maxDate.toISOString().split('T')[0];

  // Populate time slots from 7 AM to 7 PM
  for (let hour = 7; hour <= 19; hour++) {
    const label = hour < 12 ? `${hour} AM` : (hour === 12 ? '12 PM' : `${hour - 12} PM`);
    const option = document.createElement('option');
    option.value = label;
    option.textContent = label;
    slotSelect.appendChild(option);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const date = dateInput.value;
    const time = slotSelect.value;

    if (!name || !email || !date || !time) {
      alert('Please fill in all fields.');
      return;
    }

    const payload = { name, email, date, time };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbwYPmhTQb6P_u2NxeuRiqKg4kOMLxkrA7fxPVT_oOa__7zMdARjerVQru1TbgKXb91_/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Hide form and show confirmation
      form.classList.add('hidden');
      confirmationDiv.classList.remove('hidden');
      confirmationDiv.innerHTML = `
        <h3>Booking Request Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time Slot:</strong> ${time}</p>
        <p><strong>This is not the confirmed booking.</strong><br>
        You will receive a confirmation email within 1 day based on slot availability.</p>
        <p>If you receive an email stating the slot is already booked, kindly book another available slot for another day.</p>
        <p>Please take a screenshot of this message for your reference.</p>
      `;
    } catch (error) {
      alert('Booking failed. Please try again later.');
      console.error('Booking error:', error);
    }
  });
});
