document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }

    let existingData;

    try {
        // Retrieve and parse data from local storage
        existingData = localStorage.getItem('contactDetails');
        existingData = existingData ? JSON.parse(existingData) : [];
        
        // Validate that existingData is an array
        if (!Array.isArray(existingData)) {
            console.warn('Unexpected data format. Resetting to an empty array.');
            existingData = [];
        }
    } catch (e) {
        console.error('Error parsing existing data:', e);
        existingData = [];
    }

    // Add new contact details
    const contactDetails = { name, email, message };
    existingData.push(contactDetails);

    try {
        // Save updated data back to local storage
        localStorage.setItem('contactDetails', JSON.stringify(existingData));
        alert('Your details have been sent!');
    } catch (e) {
        console.error('Error saving to local storage:', e);
        alert('An error occurred while saving your details. Please try again.');
    }

    // Clear the form
    this.reset();
});
