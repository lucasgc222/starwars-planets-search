import { useContext, useEffect, useState } from 'react';
import Input from './Input';
import planetsContext from '../context/PlanetsContext';
import { COMPARISON, INITIAL_FILTER_VALUE } from '../utils/Constants';
import Button from './Button';
import { AllowedType } from '../utils/type';

function FilterColumns() {
  const { allowedColumns, addFilter } = useContext(planetsContext);
  const [formFilters, setFormFilters] = useState(INITIAL_FILTER_VALUE);

  useEffect(() => {
    setFormFilters({
      ...INITIAL_FILTER_VALUE,
      column: allowedColumns[0] as AllowedType,
    });
  }, [allowedColumns]);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = target;
    setFormFilters({
      ...formFilters,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addFilter(formFilters);
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="column">
          Coluna:
          {' '}
          <select
            name="column"
            id="column"
            onChange={ handleChange }
            data-testid="column-filter"
          >
            {allowedColumns.map((column, index) => (
              <option key={ index } value={ column }>{column}</option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison">
          Operador:
          {' '}
          <select
            name="comparison"
            id="comparison"
            onChange={ handleChange }
            data-testid="comparison-filter"
          >
            {COMPARISON.map((comparison, index) => (
              <option key={ index } value={ comparison }>{comparison}</option>
            ))}
          </select>
        </label>
        <Input
          type="number"
          id="valueFilter"
          value={ formFilters.valueFilter }
          name="valueFilter"
          dataTestId="value-filter"
          onChange={ handleChange }
          required
        />
        <Button
          type="submit"
          buttonText="Filtrar"
          dataTestId="button-filter"
          disabled={ !allowedColumns.length }
        />
      </form>
    </div>
  );
}

export default FilterColumns;
