function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const accessToken = getCookie('accessToken');
const filterInput = document.getElementById('filterInput');
const tableBody = document.getElementById('loginHistoryTableBody');


fetch(`http://localhost:8080/persons/loginHistory`, {
headers: {
    'Authorization': `Bearer ${accessToken}`
}
})
.then(res => {
return res.json();
})
.then(data => {
const tableBody = document.querySelector('#loginHistoryTable tbody');

data.forEach(loginHis => {
  const loginHisRow = `
    <tr>
        <td>${loginHis.id}</td>
        <td>${loginHis.account.id}</td>
        <td>${loginHis.account.username}</td>
        <td>${loginHis.loginDate}</td>
    </tr>
`;
  tableBody.insertAdjacentHTML('beforeend', loginHisRow);
});
})

function filterTable() {
const filterNumber = filterInput.value;
tableBody.innerHTML = '';

fetch(`http://localhost:8080/persons/loginHistory`, {
headers: {
    'Authorization': `Bearer ${accessToken}`
}
})
.then(res => res.json())
.then(data => {
  data.forEach(loginHis => {
    if (
      (loginHis.account.id == filterNumber || filterNumber === '')
    ) {
      const loginHisList = `
        <tr>
            <td>${loginHis.id}</td>
            <td>${loginHis.account.id}</td>
            <td>${loginHis.account.username}</td>
            <td>${loginHis.loginDate}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML('beforeend', loginHisList);
    }
  });
})
.catch(error => console.log(error));
}

filterInput.addEventListener('input', filterTable);

