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

const AdminDash = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    fetchData();
  }, [dateRange]); // Fetch data when date range changes

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/affectation", {
        params: {
          startDate: dateRange[0].startDate.toISOString(),
          endDate: dateRange[0].endDate.toISOString(),
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const processDataForChart = () => {
    const labels = data.map((item) => {
      return new Date(item.createdAt).toLocaleDateString();
    });
    const values = data.map((item) => item.quantite);

    return {
      labels,
      datasets: [
        {
          label: "Quantities",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
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

  const dateRangeInputRef = useRef();

  const handleModalToggle = () => {
    setModalActive(!modalActive);
  };

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    setModalActive(false);
  };

  return (
    <div className="container">
      <h2 className="title is-4">Bar Chart</h2>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleModalToggle} className="button">
          Select Date Range
        </button>
        <div className={`modal ${modalActive ? "is-active" : ""}`}>
          <div className="modal-background" onClick={handleModalToggle}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Select Date Range</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleModalToggle}
              ></button>
            </header>
            <section className="modal-card-body">
              <DateRangePicker
                ref={dateRangeInputRef}
                ranges={dateRange}
                onChange={handleSelect}
              />
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={handleModalToggle}>
                Done
              </button>
              <button className="button" onClick={handleModalToggle}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </div>
      <div style={{ height: "400px", width: "600px" }}>
        <Line data={processDataForChart()} options={options} />
      </div>
    </div>
  );
};

export default AdminDash;
