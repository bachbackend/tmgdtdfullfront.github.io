function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const tableBody = document.querySelector('#getAllUserTable tbody');
const sortButtons = document.querySelector('sort-button');
const filterInput = document.getElementById('filterInput');
const getAllButton = document.getElementById('getAllButton');
const getNegaButton = document.getElementById('negaBalance');
const sortOptions = document.getElementById('sortOptions');
const getButton = document.getElementById('getButton');
const getSortedButton1 = document.getElementById('getSortedButton1');
const getSortedButton2 = document.getElementById('getSortedButton2');
const getSortedButton3 = document.getElementById('getSortedButton3');
const getSortedButton4 = document.getElementById('getSortedButton4');
const getSortedButton13 = document.getElementById('getSortedButton13');
const getSortedButton14 = document.getElementById('getSortedButton14');
const getSortedButton5 = document.getElementById('getSortedButton5');
const getSortedButton6 = document.getElementById('getSortedButton6');
const getSortedButton7 = document.getElementById('getSortedButton7');
const getSortedButton8 = document.getElementById('getSortedButton8');
const getSortedButton9 = document.getElementById('getSortedButton9');
const getSortedButton10 = document.getElementById('getSortedButton10');
const getSortedButton11 = document.getElementById('getSortedButton11');
const getSortedButton12 = document.getElementById('getSortedButton12');
// Lấy token từ cookie
const accessToken = getCookie('accessToken');


getSortedButton1.addEventListener('click', () => {
    const sortOrder = 'ascId';
    fetchAndDisplayData(`http://localhost:8080/persons?sortOrder=${sortOrder}`);
});

getSortedButton2.addEventListener('click', () => {
    const sortOrder = 'descId';
    fetchAndDisplayData(`http://localhost:8080/persons?sortOrder=${sortOrder}`);
});

getSortedButton3.addEventListener('click', () => {
    const sortOrder = 'ascName';
    fetchAndDisplayData(`http://localhost:8080/persons?sortOrder=${sortOrder}`);
});

getSortedButton4.addEventListener('click', () => {
    const sortOrder = 'descName';
    fetchAndDisplayData(`http://localhost:8080/persons?sortOrder=${sortOrder}`);
});

getSortedButton13.addEventListener('click', () => {
    const sortOrder = 'ascDob';
    fetchAndDisplayData(`http://localhost:8080/persons?sortOrder=${sortOrder}`);
});
getSortedButton14.addEventListener('click', () => {

    const sortOrder = 'descDob';
    fetchAndDisplayData(`http://localhost:8080/persons?sortOrder=${sortOrder}`);
});
getSortedButton7.addEventListener('click', () => {
    const sortOrder = 'ascEmail';
    fetchAndDisplayData(`http://localhost:8080/persons?sortOrder=${sortOrder}`);
});

getSortedButton8.addEventListener('click', () => {
    const sortOrder = 'descEmail';
    fetchAndDisplayData(`http://localhost:8080/persons?sortOrder=${sortOrder}`);
});

getSortedButton9.addEventListener('click', () => {
    const sortOrder = 'ascPhone';
    fetchAndDisplayData(`http://localhost:8080/persons?sortOrder=${sortOrder}`);
});

getSortedButton10.addEventListener('click', () => {
    const sortOrder = 'descPhone';
    fetchAndDisplayData(`http://localhost:8080/persons?sortOrder=${sortOrder}`);
});

getSortedButton11.addEventListener('click', () => {
    const sortOrder = 'ascMoney';
    fetchAndDisplayData(`http://localhost:8080/persons?sortOrder=${sortOrder}`);
});

getSortedButton12.addEventListener('click', () => {
    const sortOrder = 'descMoney';
    fetchAndDisplayData(`http://localhost:8080/persons?sortOrder=${sortOrder}`);
});

function fetchAndDisplayData(url) {
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(res => res.json())
        .then(data => {
            tableBody.innerHTML = '';
            data.forEach(user => {
                const userList = `
                                <tr>
                                    <td>${user.id}</td>
                                    <td>${user.name}</td>    
                                    <td>${user.dob}</td>  
                                    <td>${user.email}</td>
                                    <td>${user.phoneNumber}</td>
                                    <td>${user.formattedTotalMoney}</td>
                                    <td>
                                        <button onclick="window.location.href='transaction_history_by_id.html?id=${user.id}'">Transaction History</button>
                                        <button onclick="window.location.href='person_detail.html?id=${user.id}'">View</button>
                                        <button onclick="window.location.href='update_person.html?id=${user.id}'">Update</button>
                                        <button class="delete-button" onclick="deleteUser(${user.id})">Delete</button>

                                    </td>
                                </tr>
                            `;
                tableBody.insertAdjacentHTML('beforeend', userList);
            });
        })
        .catch(error => console.log(error));
}




function deleteUser(userId) {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
        const deleteUrl = `http://localhost:8080/persons/${userId}`;

        fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (response.ok) {
                    fetchAndDisplayData('http://localhost:8080/persons');
                } else {
                    console.error('Error deleting user:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
            });
    }
}



filterInput.addEventListener('input', function () {
    const filterText = this.value;
    tableBody.innerHTML = '';
    // fetch('http://localhost:8080/persons')

    fetch('http://localhost:8080/persons', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                if (user.name.toLowerCase().includes(filterText.toLowerCase())) {
                    const userList = `
                                        <tr>
                                            <td>${user.id}</td>
                                            <td>${user.name}</td> 
                                            <td>${user.dob}</td>  
                                            <td>${user.email}</td>
                                            <td>${user.phoneNumber}</td>
                                            <td>${user.formattedTotalMoney}</td>
                                            <td>
                                                <button onclick="window.location.href='transaction_history_by_id.html?id=${user.id}'">Transaction History</button>
                                                <button onclick="window.location.href='person_detail.html?id=${user.id}'">View</button>
                                                <button onclick="window.location.href='update_person.html?id=${user.id}'">Update</button>
                                                <button class="delete-button" onclick="deleteUser(${user.id})">Delete</button>
                                            </td>
                                        </tr>
                                    `;
                    tableBody.insertAdjacentHTML('beforeend', userList);
                }
            });
        })
        .catch(error => console.log(error));
});

getNegaButton.addEventListener('click', function () {
    tableBody.innerHTML = '';
    fetch('http://localhost:8080/persons', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                if (user.totalMoney < 0) {
                    const userList = `
                                        <tr>
                                            <td>${user.id}</td>
                                            <td>${user.name}</td> 
                                            <td>${user.dob}</td>   
                                            <td>${user.email}</td>
                                            <td>${user.phoneNumber}</td>
                                            <td>${user.formattedTotalMoney}</td>
                                            <td>
                                                <button onclick="window.location.href='transaction_history_by_id.html?id=${user.id}'">Transaction History</button>
                                                <button onclick="window.location.href='person_detail.html?id=${user.id}'">View</button>
                                                <button onclick="window.location.href='update_person.html?id=${user.id}'">Update</button>
                                                <button class="delete-button" onclick="deleteUser(${user.id})">Delete</button>
                                            </td>
                                        </tr>
                                    `;
                    tableBody.insertAdjacentHTML('beforeend', userList);
                }
            });
        })
        .catch(error => console.log(error));
});
// Initial data fetch
fetchAndDisplayData('http://localhost:8080/persons');