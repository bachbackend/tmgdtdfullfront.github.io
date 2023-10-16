document.getElementById('loginForm').addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const loginData = {};
    formData.forEach((value, key) => {
        loginData[key] = value;
    });

    try {
        const response = await fetch('http://localhost:8080/persons/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Login successfully');
            alert('Login successfully');

            // Lưu token vào cookie
            document.cookie = `accessToken=${responseData.accessToken}; path=/;`;

            window.location.href = "/component/home.html";
        } else {
            console.error('Error:', response.statusText);
            alert('Login fail');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});