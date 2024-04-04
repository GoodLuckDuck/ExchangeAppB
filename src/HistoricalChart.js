import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const HistoricalChart = () => {
  const [rate, setRate] = useState(0);
  const [baseAcronym, setBaseAcronym] = useState('USD');
  const [baseValue, setBaseValue] = useState(0);
  const [quoteAcronym, setQuoteAcronym] = useState('JPY');
  const [quoteValue, setQuoteValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    getRate(baseAcronym, quoteAcronym);
    getHistoricalRates(baseAcronym, quoteAcronym);
    fetchCurrencies();
  }, [baseAcronym, quoteAcronym]);

  const getRate = (base, quote) => {
    setLoading(true);
    fetch(`https://api.frankfurter.app/latest?from=${base}&to=${quote}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const rate = data.rates[quote];

        setRate(rate);
        setBaseValue(1);
        setQuoteValue(Number((1 * rate).toFixed(3)));
        setLoading(false);
      })
      .catch(error => console.error(error.message));
  };

  const getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const chartData = Object.entries(data.rates).map(([date, rates]) => [new Date(date), rates[quote]]);
        setChartData(chartData);
      })
      .catch(error => console.error(error.message));
  };

  const fetchCurrencies = () => {
    fetch('https://api.frankfurter.app/currencies')
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const currencies = Object.entries(data).map(([acronym, name]) => ({ acronym, name }));
        setCurrencies(currencies);
      })
      .catch(error => console.error(error.message));
  };

  const handleBaseCurrencyChange = (event) => {
    setBaseAcronym(event.target.value);
  };

  const handleQuoteCurrencyChange = (event) => {
    setQuoteAcronym(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="text-center p-3">
        <h2 className="mb-2">History</h2>
        <h4>1 {baseAcronym} to 1 {quoteAcronym} = {rate.toFixed(4)}</h4>
      </div>
      <form className="form-row p-3 mb-4 bg-light justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="baseCurrency">Base Currency</label>
          <select id="baseCurrency" className="form-control" value={baseAcronym} onChange={handleBaseCurrencyChange}>
            {currencies.map(currency => (
              <option key={currency.acronym} value={currency.acronym}>{currency.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="quoteCurrency">Quote Currency</label>
          <select id="quoteCurrency" className="form-control" value={quoteAcronym} onChange={handleQuoteCurrencyChange}>
            {currencies.map(currency => (
              <option key={currency.acronym} value={currency.acronym}>{currency.name}</option>
            ))}
          </select>
        </div>
      </form>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[['Date', `${baseAcronym}/${quoteAcronym}`], ...chartData]}
        options={{
          chartArea: { width: '80%', height: '70%' },
          hAxis: { title: 'Date' },
          vAxis: { title: 'Exchange Rate' },
        }}
      />
    </React.Fragment>
  );
};

export default HistoricalChart;
