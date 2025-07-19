document.addEventListener('DOMContentLoaded', () => {
  const timeSelect = document.getElementById('time');
  const dateInput = document.getElementById('date');
  const form = document.getElementById('bookingForm');
  const confirmationDiv = document.getElementById('confirmation');

  // Set date min = today, max = 1 month from today
  const today = new Date();
  dateInput.min = today.toISOString().split('T')[0];
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 1);
  dateInput.max = maxDate.toISOString().split('T')[0];

  // Populate time slots 7 AM to 7 PM
  for (let h = 7; h <= 19; h++) {
    const label = h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;
    const value = (h < 10 ? '0' + h : h) + ':00';
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    timeSelect.appendChild(option);
  }

  // Form submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const payload = { name, email, date, time };

    try {
      await fetch('https://script.google.com/macros/s/AKfycb8B5Ndc-9iGcvwKNGwMZ-ibcTv4vWAK4KqLAemLTVa5xPa0Rb4eGFB4VHTeJDDArJR/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Hide form and show confirmation
      form.classList.add('hidden');
      confirmationDiv.classList.remove('hidden');
      confirmationDiv.innerHTML = `
        <h3>Thank you, ${name}!</h3>
        <p>Your adoration slot has been submitted for:</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p>Please check your email for confirmation once available.</p>
      `;
    } catch (error) {
      alert('Something went wrong. Please try again later.');
      console.error('Booking error:', error);
    }
  });
});
