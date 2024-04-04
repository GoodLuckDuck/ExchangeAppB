import React, { Component } from 'react';
import Navbar from './Navbar';
import CurrencyChart from './CurrencyChart';
import HistoricalChart from './HistoricalChart';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: 'USD',
      exchangeRates: {},
      sourceCurrency: 'USD',
      targetCurrency: 'EUR',
      sourceAmount: 0,
      targetAmount: 0,
    };
  }

  
  
  componentDidMount() {
    this.fetchExchangeRates();
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.baseCurrency !== this.state.baseCurrency) {
      this.fetchExchangeRates();
    }
  }

  fetchExchangeRates = async () => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${this.state.baseCurrency}`);
      const data = await response.json();
      this.setState({ exchangeRates: data.rates });
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  convertCurrency = () => {
    const { exchangeRates, targetCurrency, sourceAmount } = this.state;
    const rate = exchangeRates[targetCurrency];
    const convertedAmount = sourceAmount * rate;
    this.setState({ targetAmount: convertedAmount });
  };

  render() {
    const { baseCurrency, exchangeRates, sourceCurrency, targetCurrency, sourceAmount, targetAmount } = this.state;

    return (
      <div className="App">
        <header>
          <Navbar />
        </header>

        <main>
          <section>
            <label htmlFor="base-currency">Base Currency:</label>
            <select
              id="base-currency"
              value={baseCurrency}
              onChange={(e) => this.setState({ baseCurrency: e.target.value })}
            >
              {Object.entries(exchangeRates).map(([currency, rate]) => (
                <option key={currency} value={currency}>
                  {currency}: {rate}
                </option>
              ))}
            </select>
          </section>
          <section>
            <div>
              <label htmlFor="source-currency">Source Currency:</label>
              <select
                id="source-currency"
                value={sourceCurrency}
                onChange={(e) => this.setState({ sourceCurrency: e.target.value })}
              >
                {Object.entries(exchangeRates).map(([currency, rate]) => (
                  <option key={currency} value={currency}>
                    {currency}: {rate}
                  </option>
                ))}
              </select>
              <input
                type="number"
                id="source-amount"
                value={sourceAmount}
                onChange={(e) => this.setState({ sourceAmount: parseFloat(e.target.value) })}
                placeholder="Amount"
              />
            </div>
            <div>
              <label htmlFor="target-currency">Target Currency:</label>
              <select
                id="target-currency"
                value={targetCurrency}
                onChange={(e) => this.setState({ targetCurrency: e.target.value })}
              >
                {Object.entries(exchangeRates).map(([currency, rate]) => (
                  <option key={currency} value={currency}>
                    {currency}: {rate}
                  </option>
                ))}
              </select>
              <input type="number" id="target-amount" value={targetAmount} disabled />
            </div>
            <button onClick={this.convertCurrency}>Convert</button>
          </section>
          <section>
          <section>
            <HistoricalChart exchangeRates={exchangeRates} />
          </section>
</section>
          <section>
            <CurrencyChart exchangeRates={exchangeRates} />
          </section>
         
        </main>
        <footer>
          <a href="https://yourportfolio.com">My portfolio</a>
        </footer>
      </div>
    );
  }
}

export default App;
