import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "bulma/css/bulma.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartAffect = ({ affectation }) => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [modalActive, setModalActive] = useState(false);

  const processDataForChart = () => {
    const labels = affectation.map((item) => {
      return new Date(item.createdAt).toLocaleDateString();
    });
    const values = affectation.map((item) => item.quantite);

    return {
      labels,
      datasets: [
        {
          label: "Quantities",
          backgroundColor: "rgba(75, 192, 192, 1)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(75, 192, 192, 1)",
          hoverBorderColor: "rgba(75, 192, 192, 1)",
          data: values,
        },
      ],
    };
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Quantite",
        },
      },
    },
  };

  return (
    <div className="container is-fullheight">
      {/* <h2 className="title is-4">Bar Chart</h2> */}

      <div className="is-fullheight is-fullwidth">
        <Line data={processDataForChart()} options={options} />
      </div>
    </div>
  );
};

export default ChartAffect;
