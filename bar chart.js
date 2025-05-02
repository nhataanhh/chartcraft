// Hàm thêm biến mới (giống pie chart)
function addVariable() {
  const container = document.getElementById("variables-container");

  const div = document.createElement("div");
  div.className = "variable";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = `Tên biến ${document.querySelectorAll(".label").length + 1}`;
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

// Hàm tạo biểu đồ cột
function generateBarChart() {
  const labels = [];
  const values = [];
  const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
    "#9966FF", "#FF9F40", "#E7E9ED", "#FF6666"
  ];

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

  const ctx = document.getElementById("barCanvas").getContext("2d");

  // Nếu đã có biểu đồ trước đó thì xóa để tạo mới
  if (window.myBarChart) window.myBarChart.destroy();

  window.myBarChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Giá trị",
        data: values,
        backgroundColor: colors.slice(0, values.length)
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: document.getElementById("chartTitle").value || "Biểu đồ cột",
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
