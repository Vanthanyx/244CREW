// Script to fetch and populate shift data in the table
document.addEventListener("DOMContentLoaded", async () => {
  const table = document.querySelector("table");

  try {
    // Fetch the JSON data
    const response = await fetch(
      "https://raw.githubusercontent.com/Vanthanyx/244CREW/refs/heads/main/s/json/dropped-shifts.json"
    );
    if (!response.ok) throw new Error("Failed to fetch shift data");

    const data = await response.json();

    // Loop through each shift entry and create a new table row
    data.shifts.forEach((shift) => {
      const row = document.createElement("tr");

      // Create table cells for each data point
      const nameCell = document.createElement("td");
      nameCell.textContent = `${shift["associate-info"]}`;

      const shiftDayTimeCell = document.createElement("td");
      const scheduleLocation = shift["schedule-location"];
      const day = scheduleLocation.replace(/[0-9]/g, ""); // Remove numbers
      shiftDayTimeCell.textContent = `${day.trim()} | ${shift["shift-time"]}`;

      const pickupCell = document.createElement("td");
      const pickupButton = document.createElement("button");
      pickupButton.textContent = "Request Pickup";
      pickupButton.classList.add("pickup-btn");
      pickupButton.onclick = () =>
        JSAlert.alert(
          `Text ${shift["associate-info"]} at ${shift["phone"]} to request the shift pickup.`,
          `${atob(sessionStorage.getItem("USER"))}`
        );
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
