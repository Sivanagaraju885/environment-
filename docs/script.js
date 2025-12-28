const API_BASE = "https://environment-aa0f.onrender.com";

// Submit waste report
async function submitWaste(e) {
  e.preventDefault();

  const data = {
    wasteType: waste.value,
    quantity: qty.value,
    city: city.value,
    state: state.value,
    district: district.value,
    location: location.value
  };

  const res = await fetch(`${API_BASE}/api/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  showPopup(result.message);
  e.target.reset();
}

// Load reports
async function loadReports() {
  const res = await fetch(`${API_BASE}/api/reports`);
  const data = await res.json();

  const table = document.getElementById("reportTable");
  table.innerHTML = ""; // clear old rows

  data.forEach(r => {
    table.innerHTML += `
      <tr>
        <td>${r.wasteType}</td>
        <td>${r.quantity}</td>
        <td>${r.city}</td>
        <td>${r.state}</td>
        <td>${r.district}</td>
        <td>${r.location || "-"}</td>
      </tr>`;
  });
}

// Contact message
async function sendMessage(e) {
  e.preventDefault();

  await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  showPopup("Message Sent Successfully");
  e.target.reset();
}

// Popup helpers
function showPopup(msg) {
  document.getElementById("popupText").innerText = msg;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
