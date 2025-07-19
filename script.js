document.addEventListener('DOMContentLoaded', () => {
  const slotSelect = document.getElementById('time');
  const today = new Date();
  const dateInput = document.getElementById('date');
  const form = document.getElementById('bookingForm');
  const confirmationDiv = document.getElementById('confirmation');

  // Set min and max dates (today to +1 month)
  dateInput.min = today.toISOString().split('T')[0];
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 1);
  dateInput.max = maxDate.toISOString().split('T')[0];

  // Populate time slots from 7 AM to 7 PM
  for (let hour = 7; hour <= 19; hour++) {
    const label = hour < 12 ? `${hour} AM` : (hour === 12 ? '12 PM' : `${hour - 12} PM`);
    const value = hour < 10 ? `0${hour}:00` : `${hour}:00`;
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
      await fetch('https://script.google.com/macros/s/AKfycbzCaIKZSWKfYaeweWw7Az61OjsNXa4IzN_2LdaBK-7U8SkqopEKuEMt9HIL9UojVnmm/exec', {
        method: 'POST',
        mode: 'no-cors',  // no-cors to avoid CORS errors, but no response readable
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Hide form and show confirmation
      form.classList.add('hidden');
      confirmationDiv.classList.remove('hidden');
      confirmationDiv.innerHTML = `
        <h3>Booking Confirmed</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time Slot:</strong> ${time}</p>
        <p>Please take a screenshot of this confirmation.</p>
      `;
    } catch (error) {
      alert('Booking failed. Please try again later.');
      console.error('Booking error:', error);
    }
  });
});
