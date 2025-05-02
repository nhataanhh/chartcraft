// Hàm thêm điểm dữ liệu mới
function addVariable() {
  const container = document.getElementById("variables-container");

  const div = document.createElement("div");
  div.className = "variable";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = `Tên điểm ${document.querySelectorAll(".label").length + 1}`;
  nameInput.className = "label";

  const valueInput = document.createElement("input");
  valueInput.type = "number";
  valueInput.placeholder = "Giá trị";
  valueInput.className = "value";
  valueInput.min = 0;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Xóa";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    div.remove();
  };

  div.appendChild(nameInput);
  div.appendChild(valueInput);
  div.appendChild(deleteBtn);

  container.appendChild(div);
}

// Hàm vẽ biểu đồ đường
function generateLineChart() {
  const labels = [];
  const values = [];

  const labelInputs = document.querySelectorAll(".label");
  const valueInputs = document.querySelectorAll(".value");

  for (let i = 0; i < labelInputs.length; i++) {
    const label = labelInputs[i].value.trim();
    const value = parseFloat(valueInputs[i].value);

    if (label !== "" && !isNaN(value)) {
      labels.push(label);
      values.push(value);
    }
  }

  const ctx = document.getElementById("lineCanvas").getContext("2d");

  // Xoá biểu đồ cũ nếu có
  if (window.myLineChart) window.myLineChart.destroy();

  // Tạo biểu đồ mới bằng Chart.js
  window.myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Giá trị",
        data: values,
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54,162,235,0.2)",
        fill: true,
        tension: 0.3, // Đường cong nhẹ
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: document.getElementById("chartTitle").value || "Biểu đồ đường",
          font: {
            size: 18
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
