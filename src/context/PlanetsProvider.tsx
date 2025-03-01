import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchPlanets } from '../services/api';
import planetsContext from './PlanetsContext';
import { FiltersType, PlanetType, SortType } from '../utils/type';
import { COLUMNS, INITIAL_ORDER } from '../utils/Constants';

type UserProviderProps = {
  children: React.ReactNode;
};

function PlanetsProvider({ children }: UserProviderProps) {
  const { allPlanets: planets, isLoading } = useFetch(fetchPlanets);
  const [search, setSearch] = useState<string>('');
  const [allowedColumns, setAllowedColumns] = useState<string[]>(COLUMNS);
  const [filters, setFilters] = useState<FiltersType[]>([]);
  const [order, setOrder] = useState(INITIAL_ORDER);

  const searchPlanet = (searchInfo: string) => {
    setSearch(searchInfo);
  };

  const getPlanetsByName = () => {
    return search !== '' ? planets
      .filter((planet:PlanetType) => planet.name
        .toLowerCase().includes(search.toLowerCase()))
      : planets;
  };

  const addFilter = (filter: FiltersType) => {
    setFilters([...filters, filter]);

    const newAllowedColumns = allowedColumns.filter((column) => column !== filter.column);
    setAllowedColumns(newAllowedColumns);
  };

  const removeFilter = (filterName: string) => {
    const newFilters = filters.filter((filter) => filter.column !== filterName);
    setFilters(newFilters);

    const columns = [...allowedColumns, filterName];
    setAllowedColumns(COLUMNS.filter((column) => columns.includes(column)));
  };

  const removeAllFilters = () => {
    setFilters([]);
    setAllowedColumns(COLUMNS);
    setOrder(INITIAL_ORDER);
    setSearch('');
  };

  const addOrder = (newOrder: SortType) => {
    setOrder(newOrder);
  };

  const globalValues = {
    planets,
    isLoading,
    search,
    filters,
    allowedColumns,
    order,
    addFilter,
    removeFilter,
    removeAllFilters,
    addOrder,
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
