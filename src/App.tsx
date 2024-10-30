import { useContext } from 'react';
import InputSearchPlanets from './Components/InputSearchPlanets';
import Table from './Components/Table';
import planetsContext from './context/PlanetsContext';
import FilterColumns from './Components/FilterColumns';
import DisplayFilters from './Components/DisplayFilters';
import FilterSortColumns from './Components/FilterSortColumns';
import './global.css';
import Title from './assets/title.svg';

function App() {
  const { isLoading } = useContext(planetsContext);
  return (
    <>
      <header className="flex items-center justify-center">
        <img src={ Title } alt="Star Wars Title" className="text-yellow-500" />
      </header>
      <main className="container">
        {isLoading ? (
          <h2>Carregando...</h2>
        ) : (
          <>
            <InputSearchPlanets />
            <div style={ { display: 'flex', flexDirection: 'row' } }>
              <FilterColumns />
              <FilterSortColumns />
            </div>
            <DisplayFilters />
            <Table />
          </>
        )}
      </main>
    </>
  );
}

export default App;
