import { createContext } from 'react';
import { FiltersType, PlanetType, SortType } from '../utils/type';

type PlanetsContextType = {
  planets: PlanetType[],
  isLoading: boolean,
  search: string,
  filters: FiltersType[],
  allowedColumns: string[],
  order: SortType,
  addFilter: (filter: FiltersType) => void,
  removeFilter: (filterName: string) => void,
  removeAllFilters: () => void,
  addOrder: (newOrder: SortType) => void,
  searchPlanet: (searchInfo: string) => void,
  getPlanetsByName: () => PlanetType[],
};

const planetsContext = createContext({} as PlanetsContextType);

export default planetsContext;
