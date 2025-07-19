const form = document.getElementById('bookingForm');
const slotSelect = document.getElementById('slot');
const confirmation = document.getElementById('confirmation');
const formContainer = document.getElementById('formContainer');

const timeSlots = [];
for (let hour = 7; hour <= 18; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`);
}

timeSlots.forEach(slot => {
    const option = document.createElement('option');
    option.value = slot;
    option.textContent = slot;
    slotSelect.appendChild(option);
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('slot').value;

    const response = await fetch('https://script.google.com/macros/s/AKfycbz8B5Ndc-9iGcvwKNGwMZ-ibcTv4vWAK4KqLAemLTVa5xPa0Rb4eGFB4VHTeJDDArJR/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, date, time })
    });

    const result = await response.json();
    if (result.status === 'success') {
        formContainer.style.display = 'none';
        confirmation.textContent = `Booking Confirmed for ${name} on ${date} at ${time}. Please take a screenshot for your reference.`;
        confirmation.classList.remove('hidden');
    } else {
        alert(result.message || 'Something went wrong. Please try again.');
    }
});