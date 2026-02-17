import { fetch } from 'wix-fetch'; // Annahme: wix-fetch ist im Frontend verfügbar

const BASE_FUNCTIONS_URL = '/_functions'; // Pfad zu den Wix HTTP-Functions

export async function getCities(zip) {
  try {
    const response = await fetch(`${BASE_FUNCTIONS_URL}/cities?zip=${zip}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.body; // Wix HTTP-Functions geben ein { body: data } Objekt zurück
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
}

export async function getStreets(zip, city) {
  try {
    const response = await fetch(`${BASE_FUNCTIONS_URL}/streets?zip=${zip}&city=${city}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.body;
  } catch (error) {
    console.error('Error fetching streets:', error);
    throw error;
  }
}

export async function getRates(params) {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_FUNCTIONS_URL}/rates?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.body;
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw error;
  }
}
