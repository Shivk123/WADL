$(document).ready(function () {
    // Handle form submission
    $('#registrationForm').submit(function (event) {
        event.preventDefault();

        // Get form data
        var formData = {
            username: $('#username').val(),
            email: $('#email').val(),
            // Add more fields as needed
        };

        // Perform AJAX POST request
        $.ajax({
            type: 'POST',
            url: 'your_api_endpoint', // Replace with your server API endpoint
            data: formData,
            success: function (response) {
                // Save data to local storage
                saveToLocalStorage(formData);

                // Redirect to a new page (data list page)
                window.location.href = 'data-list.html';
            },
            error: function (error) {
                // Handle error response, e.g., display an error message
                console.error('Error:', error);
            }
        });
    });

    // Function to save data to local storage
    function saveToLocalStorage(data) {
        // Check if 'userRegistrations' key exists in local storage
        var userRegistrations = JSON.parse(localStorage.getItem('userRegistrations')) || [];

        // Add new registration data to the array
        userRegistrations.push(data);

        // Save the updated array back to local storage
        localStorage.setItem('userRegistrations', JSON.stringify(userRegistrations));
    }
});
