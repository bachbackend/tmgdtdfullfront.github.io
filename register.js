document.getElementById('registerForm').addEventListener('submit', async event => {
    event.preventDefault();
    function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const accessToken = getCookie('accessToken');

    const formData = new FormData(event.target);
    const userData = {};
    formData.forEach((value, key) => {
        userData[key] = value;
    });

    try {
        const response = await fetch('http://localhost:8080/persons/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            // console.log('Registration successful');
            // alert('Registration successful');
            document.getElementById("message").textContent = "Registration successful";
            window.location.href = "login.html";
        } else {
            // console.error('Error:', response.statusText);
            // alert('Registration failed');
            // alert('Username already exists.');
            const errorMessage = await response.text();
            document.getElementById("message").textContent = "Error: " + errorMessage;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("message").textContent = "An error occurred";
    }

});