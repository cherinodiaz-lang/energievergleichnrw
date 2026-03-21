// src/components/EgonApiTest.jsx
import { useState } from 'react';
import egonApi from '../services/egonApi.js';

export default function EgonApiTest() {
  const [step, setStep] = useState(1);
  const [zip, setZip] = useState('01067');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [street, setStreet] = useState('');
  const [streets, setStreets] = useState([]);
  const [houseNumber, setHouseNumber] = useState('1');
  const [consum, setConsum] = useState('2500');
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Schritt 1: PLZ eingeben → Städte laden
  const loadCities = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await egonApi.getCities(zip);
      setCities(data.result || []);
      if (data.result?.length === 1) {
        setCity(data.result[0].city);
      }
      setStep(2);
    } catch (err) {
      setError(`Fehler beim Laden der Städte: ${err.message}`);
    }
    setLoading(false);
  };

  // Schritt 2: Stadt wählen → Straßen laden
  const loadStreets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await egonApi.getStreets(zip, city);
      setStreets(data.result || []);
      setStep(3);
    } catch (err) {
      setError(`Fehler beim Laden der Straßen: ${err.message}`);
    }
    setLoading(false);
  };

  // Schritt 3: Tarife laden
  const loadRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await egonApi.getRates({
        zip,
        city,
        street,
        houseNumber,
        consum
      });
      setRates(data);
      setStep(4);
    } catch (err) {
      setError(`Fehler beim Laden der Tarife: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">EGON API Test</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Schritt 1: PLZ */}
      {step >= 1 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Postleitzahl</label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="01067"
          />
          <button
            onClick={loadCities}
            disabled={loading || zip.length !== 5}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {loading ? 'Lädt...' : 'Städte laden'}
          </button>
        </div>
      )}

      {/* Schritt 2: Stadt */}
      {step >= 2 && cities.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Stadt</label>
          {cities.length === 1 ? (
            <p className="p-2 bg-gray-100 rounded">{city}</p>
          ) : (
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Bitte wählen</option>
              {cities.map((c) => (
                <option key={c.city} value={c.city}>{c.city}</option>
              ))}
            </select>
          )}
          <button
            onClick={loadStreets}
            disabled={loading || !city}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Straßen laden
          </button>
        </div>
      )}

      {/* Schritt 3: Straße & Verbrauch */}
      {step >= 3 && streets.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Straße</label>
          <select
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          >
            <option value="">Bitte wählen</option>
            {streets.map((s) => (
              <option key={s.street} value={s.street}>{s.street}</option>
            ))}
          </select>

          <label className="block text-sm font-medium mb-1">Hausnummer</label>
          <input
            type="text"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="block text-sm font-medium mb-1">Jahresverbrauch (kWh)</label>
          <input
            type="number"
            value={consum}
            onChange={(e) => setConsum(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />

          <button
            onClick={loadRates}
            disabled={loading || !street || !houseNumber}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Tarife vergleichen
          </button>
        </div>
      )}

      {/* Schritt 4: Ergebnisse */}
      {step >= 4 && rates && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-3">Gefundene Tarife: {rates.result?.length || 0}</h3>
          <div className="space-y-3">
            {rates.result?.slice(0, 5).map((rate) => (
              <div key={rate.rateId} className="p-4 border rounded bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">{rate.rateName}</h4>
                    <p className="text-gray-600">{rate.providerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      {rate.totalPrice?.toFixed(2)} €
                    </p>
                    <p className="text-sm text-gray-500">pro Jahr</p>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <span>Grundpreis: {rate.basePriceYear} €/Jahr</span> |
                  <span> Arbeitspreis: {rate.workPrice} ct/kWh</span>
                </div>
              </div>
            ))}
          </div>
          <pre className="mt-4 p-3 bg-gray-800 text-green-400 text-xs overflow-auto rounded">
            {JSON.stringify(rates, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
