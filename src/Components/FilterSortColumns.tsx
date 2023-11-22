import { useContext, useState } from 'react';
import planetsContext from '../context/PlanetsContext';
import { COLUMNS, INITIAL_ORDER } from '../utils/Constants';
import Button from './Button';

function FilterSortColumns() {
  const { addOrder } = useContext(planetsContext);
  const [formSort, setFormSort] = useState(INITIAL_ORDER);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = target;
    setFormSort({
      ...formSort,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addOrder(formSort);
    setFormSort(INITIAL_ORDER);
  };

  return (
    <div>
      <form onSubmit={ handleSubmit } style={ { display: 'flex', flexDirection: 'row' } }>
        <label htmlFor="columnSort">
          Coluna:
          {' '}
          <select
            name="column"
            id="columnSort"
            value={ formSort.column }
            onChange={ handleChange }
            data-testid="column-sort"
          >
            {COLUMNS.map((column, index) => (
              <option key={ index } value={ column }>{column}</option>
            ))}
          </select>
        </label>
        <div>
          <label htmlFor="sortASC">
            <input
              type="radio"
              value="ASC"
              name="sort"
              id="sortASC"
              checked={ formSort.sort === 'ASC' }
              onChange={ handleChange }
              data-testid="column-sort-input-asc"
            />
            Ascendente
          </label>
          <label htmlFor="sortDESC">
            <input
              type="radio"
              value="DESC"
              name="sort"
              id="sortDESC"
              checked={ formSort.sort === 'DESC' }
              onChange={ handleChange }
              data-testid="column-sort-input-desc"
            />
            Descendente
          </label>

        </div>
        <Button
          type="submit"
          buttonText="ORDENAR"
          dataTestId="column-sort-button"
          disabled={ formSort.sort === '' }
        />
      </form>
    </div>
  );
}

export default FilterSortColumns;
