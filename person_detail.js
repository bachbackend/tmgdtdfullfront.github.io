function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const accessToken = getCookie('accessToken');

const userId = new URLSearchParams(window.location.search).get('id');
fetch(`http://localhost:8080/persons/${userId}`, {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
})
  .then(res => res.json())
  .then(user => {
      const userDetail = document.getElementById('userDetail');
      userDetail.innerHTML = `
        <h1>User Detail</h1>
          <p><strong>ID:</strong> ${user.id}</p>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Date of Birth:</strong> ${user.dob}</p>
          <p><strong>Total Money:</strong> ${user.formattedTotalMoney}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone Number:</strong> ${user.phoneNumber}</p>
      `;
  })
  .catch(error => console.log(error));