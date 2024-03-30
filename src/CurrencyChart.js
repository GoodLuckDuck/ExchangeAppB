import React, { Component } from 'react';
import Chart from 'chart.js';

class CurrencyChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart() {
    const { exchangeRates } = this.props;
    const labels = Object.keys(exchangeRates);
    const rates = Object.values(exchangeRates);

    const chartConfig = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Exchange Rates',
            data: rates,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const chartCanvas = this.chartRef.current.getContext('2d');
    new Chart(chartCanvas, chartConfig);
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default CurrencyChart;
