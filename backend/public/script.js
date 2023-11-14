document.addEventListener("DOMContentLoaded", function () {
  fetchData("/programs", "programsList");
  fetchData("/program-tags", "programTagsList");
  fetchData("/tags", "tagsList");
});

function fetchData(endpoint, elementId) {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const listElement = document.getElementById(elementId);
      data.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = JSON.stringify(item);
        listElement.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}
