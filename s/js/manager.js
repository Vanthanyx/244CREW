// Script to fetch and populate shift data in the table
document.addEventListener("DOMContentLoaded", async () => {
  const table = document.querySelector("table");

  try {
    const data = await fetchShiftData();
    populateShiftTable(data.shifts, table);
    displayUserShifts();
  } catch (error) {
    console.error("Error loading shifts:", error);
    alert("Could not load shifts. Please try again later.");
  }
});

// Function to fetch shift data
async function fetchShiftData() {
  const response = await fetch(
    "https://raw.githubusercontent.com/Vanthanyx/244CREW/refs/heads/main/s/json/dropped-shifts.json"
  );
  if (!response.ok) throw new Error("Failed to fetch shift data");
  return await response.json();
}

// Function to populate the shift table
function populateShiftTable(shifts, table) {
  shifts.forEach((shift) => {
    const row = document.createElement("tr");

    // Create cells for shift data
    const nameCell = createCell(`${shift["associate-info"]}`);
    const shiftDayTimeCell = createCell(formatShiftDayTime(shift));
    const pickupCell = createPickupCell(shift);

    // Append cells to the row
    row.append(nameCell, shiftDayTimeCell, pickupCell);
    table.appendChild(row);
  });
}

// Helper function to create a cell
function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

// Function to format shift day and time
function formatShiftDayTime(shift) {
  const scheduleLocation = shift["schedule-location"];
  const day = scheduleLocation.replace(/[0-9]/g, "").trim();
  return `${day} | ${shift["shift-time"]}`;
}

// Function to create the pickup cell with button
function createPickupCell(shift) {
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
  return pickupCell;
}

// Function to display user's shifts as checkboxes
function displayUserShifts() {
  const userShifts = JSON.parse(sessionStorage.getItem("USER_SHIFTS"));
  const shiftContainer = document.getElementById("shift-container");

  // Clear existing content
  shiftContainer.innerHTML = "";

  if (userShifts && userShifts.length > 0) {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    // Create checkboxes for each user's shift
    userShifts.forEach((shift, index) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = shift;
      checkbox.id = `shift-${index}`;

      label.htmlFor = `shift-${index}`;
      label.innerHTML = `<strong>${days[index]}:</strong> ${
        shift || "Not Scheduled"
      }`;

      shiftContainer.appendChild(checkbox);
      shiftContainer.appendChild(label);
      shiftContainer.appendChild(document.createElement("br")); // Line break for better spacing
    });

    // Add submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Drop Selected Shifts";
    submitButton.classList.add("shift-submit-btn");
    submitButton.onclick = handleSubmit;
    shiftContainer.appendChild(submitButton);
  } else {
    shiftContainer.textContent = "No shifts available.";
  }
}

// Function to handle the submit action
function handleSubmit() {
  const selectedShifts = [];
  const checkboxes = document.querySelectorAll(
    "#shift-container input[type='checkbox']"
  );

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedShifts.push(checkbox.value);
    }
  });

  // Process selected shifts (for demonstration, we will log them)
  console.log("Selected Shifts:", selectedShifts);
  JSAlert.confirm(`You selected: ${selectedShifts.join(", ")}`).then(
    (result) => {
      if (result) {
        JSAlert.alert("Shifts dropped successfully!");
      }
    }
  );
}
