import useFetch from '../hooks/useFetch';
import { fetchPlanets } from '../services/api';
import planetsContext from './PlanetsContext';

type UserProviderProps = {
  children: React.ReactNode;
};

function PlanetsProvider({ children }: UserProviderProps) {
  const { allPlanets: planets } = useFetch(fetchPlanets);
  console.log('planets = ', planets);

  const globalValues = {
    planets,
  };

  return (
    <planetsContext.Provider value={ globalValues }>
      { children }
    </planetsContext.Provider>
  );
}

export default PlanetsProvider;
