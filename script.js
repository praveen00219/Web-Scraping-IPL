const categories = [
  { name: "orange-cap", label: "Orange Cap (Most Runs)" },
  { name: "most-fours", label: "Most Fours" },
  { name: "most-sixes", label: "Most Sixes" },
  { name: "most-centuries", label: "Most Centuries" },
  { name: "most-fifties", label: "Most Fifties" },
];

const seasons = ["2023", "2022", "2021", "2020", "2019"];

// Create chart containers
const chartsContainer = document.getElementById("charts-container");
categories.forEach((category) => {
  seasons.forEach((season) => {
    const chartContainer = document.createElement("div");
    chartContainer.classList.add("chart-container");
    chartContainer.innerHTML = `
            <h2>${category.label} - ${season}</h2>
            <canvas id="${category.name}-${season}"></canvas>
        `;
    chartsContainer.appendChild(chartContainer);
  });
});

// Fetch data and create charts
fetch("iplData.json")
  .then((response) => response.json())
  .then((data) => {
    categories.forEach((category) => {
      seasons.forEach((season) => {
        const seasonData = data[season][category.name];
        const ctx = document
          .getElementById(`${category.name}-${season}`)
          .getContext("2d");

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: seasonData.map((player) => player.player),
            datasets: [
              {
                label: "Stat",
                data: seasonData.map((player) => player.stat),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
