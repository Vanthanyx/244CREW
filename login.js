let scheduleData = null; // Declare a global variable to store the fetched data

fetch(
  "https://raw.githubusercontent.com/Vanthanyx/244CREW/refs/heads/main/s/temp-schedule.json"
)
  .then((response) => response.json())
  .then((data) => {
    scheduleData = data; // Assign data to the global variable

    const associateNumbers = data.schedule.map(
      (entry) => entry.associate_number
    );
    sessionStorage.setItem("ASCNUM", associateNumbers.join(",")); // Store as a comma-separated string
  })
  .catch((error) => console.error("Error fetching the schedule:", error));

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const associateNumber = event.target.AssosiateNumber.value;
  const associateNumbers = sessionStorage.getItem("ASCNUM").split(",");

  if (associateNumbers.includes(associateNumber)) {
    const name = loginAssociate(associateNumber);
    if (name) {
      JSAlert.alert(`Associate: ${name}?`, null, null, "Log In").then(() => {
        window.location.href = "./s/index.html";
      });
    } else {
      JSAlert.alert("Associate name not found.");
    }
  } else {
    JSAlert.alert("Invalid Associate Number");
  }
});

function loginAssociate(ASCNUM) {
  if (scheduleData) {
    const associate = scheduleData.schedule.find(
      (entry) => entry.associate_number === ASCNUM
    );
    if (associate) {
      const encodedName = btoa(associate.name);
      sessionStorage.setItem("USER", encodedName);
      return associate.name;
    } else {
      return null;
    }
  } else {
    JSAlert.alert("Schedule data not loaded.");
    return null;
  }
}
