# IPL Stats Visualization

This project scrapes data from the IPL website and visualizes the statistics using Chart.js. The data includes:

- Top 10 players who deserved the orange cap in each season with their runs.
- Top 10 players who hit the most fours in each season.
- Top 10 players who hit the most sixes in each season.
- Top 10 players who hit the most centuries in each season.
- Top 10 players who hit the most fifties in each season.

## Overview

The application scrapes data for the last 5 seasons from the IPL website using Puppeteer and visualizes the data using Chart.js. The visualization includes bar charts for each category and season.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.x or later)
- npm (v6.x or later)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/ipl-stats-visualization.git
   cd ipl-stats-visualization
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```


## Usage

To run the scraper and visualize the data, follow these steps:

1. Run the scraper to fetch data from the IPL website:

   ```sh
   node scraper.js
   ```

2. Click on Go live and open your browser and navigate to http://localhost:${port} to view the visualizations.
