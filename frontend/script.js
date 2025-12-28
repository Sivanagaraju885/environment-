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

  const res = await fetch("http://localhost:3000/api/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  showPopup(result.message);
  e.target.reset();
}

async function loadReports() {
  const res = await fetch("http://localhost:3000/api/reports");
  const data = await res.json();

  const table = document.getElementById("reportTable");
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

async function sendMessage(e) {
  e.preventDefault();
  await fetch("http://localhost:3000/api/contact", { method: "POST" });
  showPopup("Message Sent Successfully");
  e.target.reset();
}

function showPopup(msg) {
  document.getElementById("popupText").innerText = msg;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
