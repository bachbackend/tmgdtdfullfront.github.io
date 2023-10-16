function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const accessToken = getCookie('accessToken');

  const filterInput = document.getElementById('filterInput');
  const desSearch = document.getElementById('descriptionSearch');
  const tableBody = document.getElementById('transactionHistoryTableBody');

  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };



  function fetchAndDisplayData(url) {
    fetch(url, { headers })
      .then(res => res.json())
      .then(data => {
        data.forEach(history => {
          const transactionRow = `
            <tr>
              <td>${history.id}</td>
              <td>${history.person.id}</td>
              <td>${history.transactionDate}</td>
              <td class="${history.transactionType === 'ADD' ? 'add' : 'pay'}">${history.transactionType}</td>
              <td>${history.formattedTransactionAmount}</td>
              <td>${history.person.name}</td>
              <td>${history.formattedSubTotal}</td>
              <td>${history.description}</td>
            </tr>
          `;

          tableBody.insertAdjacentHTML('beforeend', transactionRow);
        });
      });
  }

  function filterTable() {
    const filterNumber = filterInput.value;
    const filterDescription = desSearch.value;
    tableBody.innerHTML = '';

    fetch('http://localhost:8080/persons/transactionHistory', { headers })
      .then(res => res.json())
      .then(data => {
        data.forEach(history => {
          if (
            (history.person.id == filterNumber || filterNumber === '') &&
            (history.description === filterDescription || filterDescription === '' || filterDescription === 'All')
          ) {
            const transactionList = `
              <tr>
                <td>${history.id}</td>
                <td>${history.person.id}</td>
                <td>${history.transactionDate}</td>
                <td class="${history.transactionType === 'ADD' ? 'add' : 'pay'}">${history.transactionType}</td>
                <td>${history.formattedTransactionAmount}</td>
                <td>${history.person.name}</td>
                <td>${history.formattedSubTotal}</td>
                <td>${history.description}</td>
              </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', transactionList);
          }
        });
      })
      .catch(error => console.log(error));
  }

  filterInput.addEventListener('input', filterTable);
  desSearch.addEventListener('change', filterTable);

  fetchAndDisplayData('http://localhost:8080/persons/transactionHistory');