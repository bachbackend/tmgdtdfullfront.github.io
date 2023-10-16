function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const accessToken = getCookie('accessToken');

async function populateComboBoxes() {
    const userSelect = document.getElementById('userId');
    const roleSelect = document.getElementById('roleId');

    // Lấy danh sách account
    const usersResponse = await fetch('http://localhost:8080/persons/loginInfor', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const usersData = await usersResponse.json();
    usersData.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.text = user.username;
        userSelect.add(option);
    });

    // Lấy danh sách role
    const rolesResponse = await fetch('http://localhost:8080/roles', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const rolesData = await rolesResponse.json();
    rolesData.forEach(role => {
        const option = document.createElement('option');
        option.value = role.id;
        option.text = role.name;
        roleSelect.add(option);
    });
}

async function assignRole() {
    const userId = document.getElementById('userId').value;
    const roleId = document.getElementById('roleId').value;

    const response = await fetch(`http://localhost:8080/${userId}/roles/${roleId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const resultDiv = document.getElementById('result');

    if (response.ok) {
        const data = await response.text();
        resultDiv.innerText = data;
    } else {
        const errorText = await response.text();
        resultDiv.innerText = `Error: ${errorText}`;
    }
}
populateComboBoxes();