document.addEventListener("DOMContentLoaded", async function () {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const accessToken = getCookie('accessToken');

    const form = document.querySelector("#personForm");
    const selectedUserIdsSelect = form.querySelector("#selectedUserIds");
    const descriptionSelect = form.querySelector("#description");

    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };

    let isChecked = false; // Biến để theo dõi trạng thái
    // Fetch user data from the server and populate the dropdown
    try {
      const response = await fetch("http://localhost:8080/persons", { headers });
      const users = await response.json();

      users.forEach(user => {
        const label = document.createElement("label");
        label.textContent = user.name;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "selectedUserIds";
        checkbox.value = user.id;

        label.appendChild(checkbox);

        selectedUserIdsSelect.appendChild(label);
      });

    } catch (error) {
      console.error("Fetch Error:", error);
    }

    const selectAllUsersButton = form.querySelector("#selectAllUsers");
    selectAllUsersButton.addEventListener("click", function () {
      const checkboxes = document.querySelectorAll("input[name='selectedUserIds']");
      checkboxes.forEach(checkbox => {
        checkbox.checked = true;
      });
    });
    selectAllUsersButton.addEventListener("click", function () {
      const checkboxes = document.querySelectorAll("input[name='selectedUserIds']");
      checkboxes.forEach(checkbox => {
        checkbox.checked = !isChecked; // Đảo ngược trạng thái
      });
      isChecked = !isChecked; // Cập nhật trạng thái
    });

    form.addEventListener("submit", async event => {
      event.preventDefault();

      const formData = new FormData(form);
      const data = new URLSearchParams(formData);

      const selectedUserIds = Array.from(document.querySelectorAll("input[name='selectedUserIds']:checked"))
        .map(checkbox => checkbox.value);

      // data.append("selectedUserIds", selectedUserIds);
      const selectDes = descriptionSelect.value;
      // data.append("description", selectDes);


      try {
        const response = await fetch("http://localhost:8080/persons/calculate", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': `Bearer ${accessToken}`
          },
          body: data,
        });

        if (response.ok) {
          console.log('Calculated successfully');
          alert('Calculated successfully');
          window.location.href = "get_all_persons.html";
        } else {
          console.error('Error:', response.statusText);
          alert('Error calculating');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });