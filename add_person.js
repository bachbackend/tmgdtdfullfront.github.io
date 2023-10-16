function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const formAdd = document.querySelector('.form');

formAdd.addEventListener('submit', async event => {
    event.preventDefault();

    // Lấy token từ cookie
    const accessToken = getCookie('accessToken');

    const formData = new FormData(formAdd);
    const newUser = {};
    formData.forEach((value, key) => {
        newUser[key] = value;
    });

    try {
        const response = await fetch('http://localhost:8080/persons/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            console.log('User added successfully');
            alert('User added successfully');
            window.location.href = "get_all_persons.html";

        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});