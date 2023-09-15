import BreweryCard from '../BreweryCard/BreweryCard';
import './BreweryContainer.scss';
import { useBreweries } from '../../Context/BreweryContext';
import { useFavorites } from '../../Context/FavoriteContext';
import PropTypes from 'prop-types';

function BreweryContainer() {
  const { breweries, noResults } = useBreweries();
  const { filteredBreweries, toggleFavoritesFilter, isFaveFilterOn } =
    useFavorites();

  const cards = filteredBreweries.map(brewery => {
    return <BreweryCard brewery={brewery} key={brewery.id}></BreweryCard>;
  });

  function calculateDistance(lat1, long1, lat2, long2) {
    let latRad1 = (Number(lat1) * Math.PI) / 180;
    let latRad2 = (Number(lat2) * Math.PI) / 180;
    let longRad1 = (Number(long1) * Math.PI) / 180;
    let longRad2 = (Number(long2) * Math.PI) / 180;
    const distance =
      3958 *
      Math.acos(
        Math.sin(latRad1) * Math.sin(latRad2) +
          Math.cos(latRad1) * Math.cos(latRad2) * Math.cos(longRad2 - longRad1),
      );
    return distance;
  }

  function calcDistanceFromSelected() {
    // const brewCopy = [...breweries];
    // for(var i = 1; i < breweries.length ; i ++){
    //   const distance = calculateDistance(brewCopy[0].latitude, brewCopy[0].longitude, breweries[i].latitude, breweries[i].longitude);
    //   brewCopy[i].distance = distance;
    //

    const [firstBrewery, ...restOfBreweries] = [...breweries];

    const breweriesWithDistance = restOfBreweries.map(brewery => {
      const distance = calculateDistance(
        firstBrewery.latitude,
        firstBrewery.longitude,
        brewery.latitude,
        brewery.longitude,
      );

      return { ...brewery, distance };
    });
    console.log('BREW COPIES WITH DISTANCE', breweriesWithDistance);
  }

  const styles = {
    backgroundColor: isFaveFilterOn ? '#808000' : '#BAB86C',
    color: isFaveFilterOn ? '#f7f7ed' : '#273f1d',
  };

  const filterBtnMessage = isFaveFilterOn ? 'On' : 'Off';

  return (
    <>
      {noResults ? (
        <section className='no-results-message'>
          We're sorry, we didn't find any breweries.
        </section>
      ) : (
        <section className='brewery-container'>
          <button
            className='filter-btn'
            style={styles}
            onClick={toggleFavoritesFilter}
          >
            {`Filter Local Breweries by Favorite: ${filterBtnMessage}`}
          </button>
          {cards.length ? cards : 'Search Results Will Appear Here'}
        </section>
      )}
    </>
  );
}

BreweryContainer.propTypes = {
  breweries: PropTypes.object,
  noResults: PropTypes.bool,
  favorites: PropTypes.object,
  getFilteredBreweries: PropTypes.func,
  toggleFavoritesFilter: PropTypes.func,
  favoriteFilter: PropTypes.bool,
};

export default BreweryContainer;
