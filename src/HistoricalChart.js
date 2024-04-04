import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: 'USD',
      historicalRates: [],
    };
  }

  

  componentDidMount() {
    this.fetchHistoricalRates(this.state.baseCurrency);
  }

  fetchHistoricalRates = async (currency) => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`);
      const data = await response.json();
      const rates = Object.entries(data.rates).map(([currency, rate]) => [currency, rate]);
      this.setState({ historicalRates: [['Currency', 'Rate'], ...rates] });
    } catch (error) {
      console.error('Error fetching historical rates:', error);
    }
  };

  render() {
    const { historicalRates } = this.state;

    return (
      <div className="App">
        <header>
          <h1>Historical Rates</h1>
        </header>

        <main>
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="Timeline"
            loader={<div>Loading Chart</div>}
            data={historicalRates}
            options={{
                hAxis: {
                  title: 'Date',
                },
                vAxis: {
                  title: 'Rate',
                },
                timeline: {
                  groupByRowLabel: true,
                },
              }}
            rootProps={{ 'data-testid': '1' }}
          />
        </main>
      </div>
    );
  }
}

export default App;
