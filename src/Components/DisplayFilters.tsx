import { useContext } from 'react';
import planetsContext from '../context/PlanetsContext';
import Button from './Button';

function DisplayFilters() {
  const { filters, removeFilter } = useContext(planetsContext);

  return (
    <div>
      {filters.length > 0 ? (
        filters.map((filter) => (
          <p key={ filter.column } data-testid="filter">
            {`${filter.column} | ${filter.comparison} | ${filter.valueFilter} | `}
            <Button
              buttonText="X"
              onClick={ () => removeFilter(filter.column) }
            />
          </p>
        ))) : ''}
    </div>
  );
}

export default DisplayFilters;
