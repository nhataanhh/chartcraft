let variableCount = 0;

// Thêm biến mới (tên + giá trị)
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
  valueInput.placeholder = "Phần trăm (%)";
  valueInput.className = "value";
  valueInput.min = 0;
  valueInput.max = 100;

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


// Tạo biểu đồ
function generatePieChart() {
  const labels = [];
  const values = [];
  const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
    "#9966FF", "#FF9F40", "#E7E9ED", "#FF6666"
  ];

  const labelInputs = document.querySelectorAll(".label");
  const valueInputs = document.querySelectorAll(".value");

  let total = 0;
  for (let i = 0; i < labelInputs.length; i++) {
    const label = labelInputs[i].value.trim();
    const value = parseFloat(valueInputs[i].value);

    if (label !== "" && !isNaN(value)) {
      labels.push(label);
      values.push(value);
      total += value;
    }
  }

  const warning = document.getElementById("warning");

  if (total < 100) {
    warning.textContent = `⚠️ Tổng giá trị là ${total}%. Vui lòng nhập đủ 100%.`;
    return;
  } else if (total > 100) {
    warning.textContent = `⚠️ Tổng giá trị vượt quá 100% (${total}%). Giảm lại các biến.`;
    return;
  } else {
    warning.textContent = "";
  }

  // Vẽ biểu đồ bằng Chart.js
  const ctx = document.getElementById("pieCanvas").getContext("2d");
  if (window.myPieChart) window.myPieChart.destroy(); 

  window.myPieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: colors.slice(0, values.length),
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: document.getElementById("chartTitle").value || "My Pie Chart",
          font: {
            size: 18
          }
        },
        legend: {
          position: "bottom"
        }
      }
    }
  });
}
