import { createContext } from 'react';
import { PlanetType } from '../utils/type';

type PlanetsContextType = {
  planets: PlanetType[],
  isLoading: boolean,
  search: string,
  searchPlanet: (searchInfo: string) => void,
  getPlanetsByName: () => PlanetType[],
};

const planetsContext = createContext({} as PlanetsContextType);

export default planetsContext;
