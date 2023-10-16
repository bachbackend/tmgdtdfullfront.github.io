function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const accessToken = getCookie('accessToken');

const headers = {
    'Authorization': `Bearer ${accessToken}`
};

const form = document.querySelector("#transaction-form");
async function loadUserIds() {

    try {
        const response = await fetch('http://localhost:8080/persons', { headers});
        const users = await response.json();

        if (response.ok) {
            const selectedUserIdsContainer = document.getElementById('selectedUserIdsContainer');
            users.forEach(user => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'selectedUserIds';
                checkbox.value = user.id;

                const label = document.createElement('label');
                label.textContent = user.name;
                label.appendChild(checkbox);

                selectedUserIdsContainer.appendChild(label);
            });

            // Thêm các ô Individual Amounts
            const individualAmountsContainer = document.getElementById('individualAmountsContainer');
            selectedUserIdsContainer.addEventListener('change', event => {
                const selectedUserCheckboxes = selectedUserIdsContainer.querySelectorAll('input[type="checkbox"]:checked');
                individualAmountsContainer.innerHTML = ''; // Xóa nội dung cũ

                selectedUserCheckboxes.forEach(checkbox => {
                    const userId = checkbox.value;
                    const user = users.find(user => user.id == userId);
                    if (user) {
                        const input = document.createElement('input');
                        input.type = 'number';
                        input.name = 'individualAmounts';
                        input.placeholder = `Amount for ${user.name}`;
                        individualAmountsContainer.appendChild(input);
                    }
                });
            });
        } else {
            console.error('Failed to load user IDs');
        }
    } catch (error) {
        console.error('An error occurred during data loading:', error);
    }
}

loadUserIds();

document.getElementById('transaction-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const requestOptions = {
        method: 'POST',
        body: formData,
        headers: headers
    };

    try {
        const response = await fetch('http://localhost:8080/persons/calculateIndividual', requestOptions);
        const data = await response.text();

        if (response.ok) {
            alert('Transaction processed successfully.');
            window.location.href = "get_all_persons.html";
            form.reset();
        } else {
            alert('An error occurred: ' + data);
        }
    } catch (error) {
        alert('An error occurred during processing.');
    }
});