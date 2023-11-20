import { useContext } from 'react';
import Input from './Input';
import planetsContext from '../context/PlanetsContext';

function InputSearchPlanets() {
  const { search, searchPlanet } = useContext(planetsContext);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    searchPlanet(target.value);
  };

  return (
    <div>
      <Input
        type="text"
        id="search"
        value={ search }
        name="search"
        dataTestId="name-filter"
        onChange={ handleChange }
        required
      />
    </div>
  );
}

export default InputSearchPlanets;
