document.addEventListener('DOMContentLoaded', () => {
  const timeSelect = document.getElementById('time');
  const dateInput = document.getElementById('date');
  const form = document.getElementById('bookingForm');
  const confirmationDiv = document.getElementById('confirmation');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  // Set min and max dates for date input (today to +1 month)
  const today = new Date();
  dateInput.min = today.toISOString().split('T')[0];

  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 1);
  dateInput.max = maxDate.toISOString().split('T')[0];

  // Populate time slots 7 AM to 7 PM
  for (let hour = 7; hour <= 19; hour++) {
    const label = (hour < 12 ? hour + ' AM' : (hour === 12 ? '12 PM' : (hour - 12) + ' PM'));
    const option = document.createElement('option');
    option.value = label;
    option.textContent = label;
    timeSelect.appendChild(option);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const date = dateInput.value;
    const time = timeSelect.value;

    if (!name || !email || !date || !time) {
      alert('Please fill all fields.');
      return;
    }

    const payload = { name, email, date, time };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbzpHY2Fr4HLce52ee4LNxxCYGZ--xvJoWTvZFE2eMia1tLnjvhFPBkDxg1mr7U17-oi/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      form.classList.add('hidden');
      confirmationDiv.classList.remove('hidden');
      confirmationDiv.innerHTML = `
        <h3>Thank you, ${name}!</h3>
        <p>Your adoration slot has been booked for:</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p>Please take a screenshot of this confirmation for your records.</p>
      `;
    } catch (error) {
      console.error('Booking error:', error);
      alert('Something went wrong. Please try again later.');
    }
  });
});
