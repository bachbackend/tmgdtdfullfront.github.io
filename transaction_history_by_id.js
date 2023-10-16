document.addEventListener("DOMContentLoaded", function () {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const accessToken = getCookie('accessToken');

    const userId = new URLSearchParams(window.location.search).get('id');

    // fetch(`http://localhost:8080/persons/${userId}`)
    fetch(`http://localhost:8080/persons/${userId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Chuyển đổi dữ liệu JSON
        })
        .then((userData) => {
            const userName = userData.name;
            const headerDiv = document.getElementById("header");
            const h1 = document.createElement("h1");
            h1.textContent = `Transaction History of ${userName}`;
            headerDiv.appendChild(h1);
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });

    // fetch(`http://localhost:8080/persons/transactionHistory/${userId}`)
    fetch(`http://localhost:8080/persons/transactionHistory/${userId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const transactionHistoryDiv = document.getElementById("transactionHistory");
            if (data.length === 0) {
                transactionHistoryDiv.innerText = "Không có giao dịch nào.";
                return;
            }

            // Tạo bảng để hiển thị các giao dịch
            const table = document.createElement("table");
            table.border = 1; // Thêm đường viền cho bảng

            // Tạo hàng tiêu đề
            const thead = document.createElement("thead");
            const headerRow = thead.insertRow();
            const headers = ["Person ID", "Person Name", "Transaction ID", "Transaction Date", "Transaction Amount", "Balance Change", "Transaction Type", "Description"];
            headers.forEach((headerText) => {
                const th = document.createElement("th");
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            table.appendChild(thead);

            // Tạo các hàng dữ liệu
            const tbody = document.createElement("tbody");
            data.forEach((transaction) => {
                const row = tbody.insertRow();
                const cellData = [
                    transaction.person.id,
                    transaction.person.name,
                    transaction.id,
                    transaction.transactionDate,
                    transaction.formattedTransactionAmount,
                    transaction.formattedSubTotal,
                    transaction.transactionType,
                    transaction.description,

                ];
                cellData.forEach((cellValue) => {
                    const cell = row.insertCell();
                    cell.textContent = cellValue;
                });
            });
            table.appendChild(tbody);

            // Hiển thị bảng giao dịch trên trang web
            transactionHistoryDiv.appendChild(table);
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            // Xử lý lỗi nếu cần thiết
        });
});