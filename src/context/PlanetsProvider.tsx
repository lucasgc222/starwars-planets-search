import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchPlanets } from '../services/api';
import planetsContext from './PlanetsContext';
import { PlanetType } from '../utils/type';

type UserProviderProps = {
  children: React.ReactNode;
};

function PlanetsProvider({ children }: UserProviderProps) {
  const { allPlanets: planets, isLoading } = useFetch(fetchPlanets);
  const [search, setSearch] = useState<string>('');

  const searchPlanet = (searchInfo: string) => {
    setSearch(searchInfo);
  };

  const getPlanetsByName = () => {
    return search !== '' ? planets
      .filter((planet:PlanetType) => planet.name
        .toLowerCase().includes(search.toLowerCase()))
      : planets;
  };

  const globalValues = {
    planets,
    search,
    isLoading,
    searchPlanet,
    getPlanetsByName,
  };

  return (
    <planetsContext.Provider value={ globalValues }>
      { children }
    </planetsContext.Provider>
  );
}

export default PlanetsProvider;
