export async function getBreweriesByCity(city) {
  // 50 results is the default 'per_page' param
  // You must indicate whether you want to return more
  city = city.split(' ').reduce((acc, curr) => acc + `_${curr}`);
  try {
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=100`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource Not Found');
      } else {
        throw new Error('Something Went Wrong');
      }
    }
    return await response.json();
  } catch (error) {
    return error;
  }
}

export async function getBreweriesByState(state) {
  state = state.split(' ').reduce((acc, curr) => acc + `_${curr}`);
  try {
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_state=${state}&per_page=100`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource Not Found');
      } else {
        throw new Error('Something Went Wrong');
      }
    }
    return await response.json();
  } catch (error) {
    return error;
  }
}
