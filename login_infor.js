function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const accessToken = getCookie('accessToken');
const filterInput = document.getElementById('filterInput');
const tableBody = document.getElementById('loginInforTableBody');


// function deleteAccount(accountId) {
//         const confirmDelete = confirm("Do you want to delete this account?");
//         if (confirmDelete) {
//             const deleteUrl = `http://localhost:8080/persons/account/${accountId}`;

//             fetch(deleteUrl, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${accessToken}`
//                 }
//             })
//                 .then(response => {
//                     if (response.ok) {
//                         fetchAndDisplayData('http://localhost:8080/persons/loginInfor');
//                     } else {
//                         console.error('Error deleting user:', response.statusText);
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Fetch Error:', error);
//                 });
//         }
//     }


function deleteAccount(accountId) {
const confirmDelete = confirm("Do you want to delete this account?");
if (confirmDelete) {
const deleteUrl = `http://localhost:8080/persons/account/${accountId}`;

fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
})
    .then(response => {
        if (response.ok) {
            // Sau khi xóa, gọi hàm filterTable để tải lại dữ liệu
            filterTable();
        } else {
            console.error('Error deleting user:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
    });
}
}

fetch(`http://localhost:8080/persons/loginInfor`, {
headers: {
    'Authorization': `Bearer ${accessToken}`
}
})
.then(res => {
return res.json();
})
.then(data => {
const tableBody = document.querySelector('#loginInforTable tbody');

data.forEach(infor => {
  const inforRow = `
    <tr>
        <td>${infor.id}</td>
        <td>${infor.username}</td>
        <td>${infor.password}</td>
        <td>${infor.createDate}</td>
        <td>
          <button class="delete-button" onclick="deleteAccount(${infor.id})">Delete</button>
        </td>
    </tr>
`;
  tableBody.insertAdjacentHTML('beforeend', inforRow);
});
})

function filterTable() {
const filterNumber = filterInput.value;
tableBody.innerHTML = '';

fetch(`http://localhost:8080/persons/loginInfor`, {
headers: {
    'Authorization': `Bearer ${accessToken}`
}
})
.then(res => res.json())
.then(data => {
  data.forEach(infor => {
    if (
      (infor.id == filterNumber || filterNumber === '')
    ) {
      const inforList = `
        <tr>
          <td>${infor.id}</td>
          <td>${infor.username}</td>
          <td>${infor.password}</td>
          <td>${infor.createDate}</td>
          <td>
            <button class="delete-button" onclick="deleteAccount(${infor.id})">Delete</button>
          </td>
        </tr>
      `;
      tableBody.insertAdjacentHTML('beforeend', inforList);
    }
  });
})
.catch(error => console.log(error));
}

filterInput.addEventListener('input', filterTable);

// fetchAndDisplayData('http://localhost:8080/persons/loginInfor');