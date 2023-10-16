document.getElementById("changePasswordForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    function getCookie(name) {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
      }

      const accessToken = getCookie('accessToken');

    const userName = document.getElementById("userName").value;
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const changePasswordData = {
      userName: userName,
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };

    try {
      const response = await fetch("http://localhost:8080/persons/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(changePasswordData)
      });

      if (response.ok) {
        document.getElementById("message").textContent = "Password changed successfully";
        window.location.href = "login.html";

      } else {
        const errorMessage = await response.text();
        document.getElementById("message").textContent = "Error: " + errorMessage;
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("message").textContent = "An error occurred";
    }
  });