function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const accessToken = getCookie('accessToken');
const updateUserForm = document.querySelector("#updateUserForm");
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

const xhr = new XMLHttpRequest();
xhr.open('GET', `http://localhost:8080/persons/${userId}`, true);
xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const userData = JSON.parse(xhr.responseText);
        document.getElementById('name').value = userData.name;
        document.getElementById('dob').value = userData.dob;

        document.getElementById('email').value = userData.email;
        document.getElementById('phoneNumber').value = userData.phoneNumber;
    }
};
xhr.send();


updateUserForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(updateUserForm);
    const updateUserUrl = `http://localhost:8080/persons/${userId}`;
    const userData = {
        name: formData.get("name"),
        dob: formData.get("dob"),

        email: formData.get("email"),
        phoneNumber: formData.get("phoneNumber")
    };

    try {
        // Lấy thông tin người dùng hiện tại trước khi cập nhật
        const response = await fetch(`http://localhost:8080/persons/${userId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
        const currentUser = await response.json();

        // Cập nhật thông tin người dùng, bao gồm cả totalMoney
        userData.totalMoney = currentUser.totalMoney;

        const updateResponse = await fetch(updateUserUrl, {
            method: "PATCH", // Sử dụng method PATCH
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(userData)
        });

        if (updateResponse.ok) {
            const updatedUser = await updateResponse.json();
            console.log("Updated User:", updatedUser);
            alert('Dữ liệu đã được cập nhật thành công!');
            window.location.href = "get_all_persons.html";
        } else {
            console.error("Error updating user:", updateResponse.statusText);
            alert('Dữ liệu cập nhật thất bại :<');
            // alert('Email hoặc số điện thoại có thể đã bị trùng!!!');
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
});