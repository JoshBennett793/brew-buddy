import BreweryCard from '../BreweryCard/BreweryCard';
import './BreweryContainer.scss';
import { useBreweries } from '../../Context/BreweryContext';
import { useFavorites } from '../../Context/FavoriteContext';
import { useEffect, useState } from 'react';

function BreweryContainer() {
  const { breweries, noResults } = useBreweries();
  const {
    favorites,
    getFilteredBreweries,
    toggleFavoritesFilter,
    favoriteFilter
  } = useFavorites();
  const [cards, setCards] = useState([]);

  function createCards(displayedBreweries) {
    return displayedBreweries.map(brewery => {
      return <BreweryCard brewery={brewery} key={brewery.id}></BreweryCard>;
    });
  }

  useEffect(() => {
    setCards(createCards(getFilteredBreweries()));
  }, [favorites, breweries, favoriteFilter]);

  const styles = {
    backgroundColor: favoriteFilter ? '#A9721F' : '#e0cc99'
  };

  return (
    <>
      {noResults ? (
        <section className='no-results-message'>
          The beer trail is calling! 🍺 But we might need your help. Check your search
          and give it another shot.
        </section>
      ) : (
        <section className='breweryContainer'>
          <button
            className='filter-btn'
            style={styles}
            onClick={toggleFavoritesFilter}
          >
            Filter Local Breweries by Favorite
          </button>
          {cards.length ? cards : 'Search Results Will Appear Here'}
        </section>
      )}
    </>
  );
}

export default BreweryContainer;
