document.getElementById("req-btn").addEventListener("click", () => {
  const shifts = getUserShifts();
  const container = document.getElementById("container");
  const newDiv = document.createElement("div");
  const username = atob(sessionStorage.getItem("USER"));

  // Add text and apply the CSS class
  newDiv.classList.add("dynamic-div");
  const title = document.createElement("p");
  title.textContent = username + " | Select days to request shifts:";
  title.classList.add("div-title");
  newDiv.appendChild(title);

  // Create a list to hold the shifts
  const shiftList = document.createElement("ul");

  // Define the days of the week, assuming shifts are in order
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Iterate through shifts and create list items
  shifts.forEach((shift, index) => {
    const listItem = document.createElement("li");

    // Calculate the day index (0-6)
    const dayIndex = index % 7; // Loop through days (Monday-Sunday)
    const day = daysOfWeek[dayIndex]; // Get the corresponding day name

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `shift-${index}`;
    checkbox.name = "shifts";
    checkbox.value = `${day}: ${shift}`; // Store the day and time as the value

    const label = document.createElement("label");
    label.htmlFor = `shift-${index}`;
    label.textContent = `${day}: ${shift}`; // Display day and time

    // Append checkbox and label to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    shiftList.appendChild(listItem); // Append list item to the list
  });

  newDiv.appendChild(shiftList); // Append the list to the new div

  // Create and append the submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.classList.add("submit-btn");
  submitButton.addEventListener("click", () => {
    const selectedShifts = Array.from(
      document.querySelectorAll('input[name="shifts"]:checked')
    ).map((checkbox) => checkbox.value);

    // Extract only the day names from the selected shifts
    const selectedDays = selectedShifts.map((shift) => shift.split(":")[0]);

    JSAlert.confirm(selectedDays.join(", "), "Selected days:").then(function (
      result
    ) {
      // Check if pressed yes
      if (!result) {
        newDiv.remove();
        return;
      }

      JSAlert.alert("Shifts requested successfully!").then(() => {
        newDiv.remove();
      });
    });
  });

  newDiv.appendChild(submitButton);

  // Append the new div to the container
  container.appendChild(newDiv);
});
