function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const accessToken = getCookie('accessToken');

  const filterInput = document.getElementById('filterInput');
  const tableBody = document.getElementById('updateHistoryTableBody');

  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };

  fetch('http://localhost:8080/persons/updateHistory', { headers })
    .then(res => {
      return res.json();
    })
    .then(data => {
      const tableBody = document.querySelector('#updateHistoryTable tbody');

      data.forEach(update => {
        const updateRow = `
          <tr>
              <td>${update.id}</td>
              <td>${update.person.id}</td>
              <td>${update.updateDate}</td>
              <td>${update.updateName}</td>
              <td>${update.updateDob}</td>
              <td>${update.updateEmail}</td>
              <td>${update.updatePhone}</td>
          </tr>
      `;
        tableBody.insertAdjacentHTML('beforeend', updateRow);
      });
    })

  function filterTable() {
    const filterNumber = filterInput.value;
    tableBody.innerHTML = '';

    fetch('http://localhost:8080/persons/updateHistory', { headers })
      .then(res => res.json())
      .then(data => {
        data.forEach(update => {
          if (
            (update.person.id == filterNumber || filterNumber === '')
          ) {
            const updateList = `
              <tr>
                <td>${update.id}</td>
                <td>${update.person.id}</td>
                <td>${update.updateDate}</td>
                <td>${update.updateName}</td>
                <td>${update.updateDob}</td>
                <td>${update.updateEmail}</td>
                <td>${update.updatePhone}</td>
              </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', updateList);
          }
        });
      })
      .catch(error => console.log(error));
  }

  filterInput.addEventListener('input', filterTable);

//   fetchAndDisplayData('http://localhost:8080/persons/updateHistory');