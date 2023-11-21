import { useContext } from 'react';
import InputSearchPlanets from './Components/InputSearchPlanets';
import Table from './Components/Table';
import planetsContext from './context/PlanetsContext';
import FilterColumns from './Components/FilterColumns';
import DisplayFilters from './Components/DisplayFilters';

function App() {
  const { isLoading } = useContext(planetsContext);
  return (
    <>
      <h1>Star Wars Planets Search - Trybe</h1>
      {isLoading ? (
        <h2>Carregando...</h2>
      ) : (
        <>
          <InputSearchPlanets />
          <FilterColumns />
          <DisplayFilters />
          <Table />
        </>
      )}
    </>
  );
}

export default App;
