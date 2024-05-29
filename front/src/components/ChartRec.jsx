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

const ChartRec = ({ recuperation }) => {
  const processDataForChart = () => {
    const labels = recuperation.map((item) => {
      return new Date(item.createdAt).toLocaleDateString();
    });
    const values = recuperation.map((item) => item.quantite);

    return {
      labels,
      datasets: [
        {
          label: "Quantities",
          backgroundColor: "rgba(242, 38, 19,1)",
          borderColor: "rgba(242, 38, 19,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(242, 38, 19,1)",
          hoverBorderColor: "rgba(242, 38, 19,1)",
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
    <div className="container">
      <h2 className="title is-4">Bar Chart</h2>

      <div className="is-fullheight is-fullwidth">
        <Line data={processDataForChart()} options={options} />
      </div>
    </div>
  );
};

export default ChartRec;
