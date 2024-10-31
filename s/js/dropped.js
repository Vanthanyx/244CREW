// Script to fetch and populate shift data in the table
document.addEventListener("DOMContentLoaded", async () => {
  const table = document.querySelector("table");

  try {
    // Fetch the JSON data
    const response = await fetch(
      "https://244crew.com/s/json/dropped-shifts.json"
    );
    if (!response.ok) throw new Error("Failed to fetch shift data");

    const data = await response.json();

    // Loop through each shift entry and create a new table row
    data.shifts.forEach((shift) => {
      const row = document.createElement("tr");

      // Create table cells for each data point
      const nameCell = document.createElement("td");
      nameCell.textContent = `${shift["associate-name"]} (#${shift["associate-number"]})`;

      const shiftDayTimeCell = document.createElement("td");
      shiftDayTimeCell.textContent = `${shift["schedule-location"]} - ${shift["shift-time"]}`;

      const pickupCell = document.createElement("td");
      const pickupButton = document.createElement("button");
      pickupButton.textContent = "Pickup";
      pickupButton.onclick = () =>
        alert(`Shift picked up by ${shift["associate-name"]}`);
      pickupCell.appendChild(pickupButton);

      // Append cells to the row
      row.appendChild(nameCell);
      row.appendChild(shiftDayTimeCell);
      row.appendChild(pickupCell);

      // Append row to the table
      table.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading shifts:", error);
    alert("Could not load shifts. Please try again later.");
  }
});
