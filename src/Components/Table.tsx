import { useContext } from 'react';
import planetsContext from '../context/PlanetsContext';
import { FiltersType, PlanetType } from '../utils/type';

function Table() {
  const { getPlanetsByName, filters, order } = useContext(planetsContext);

  const applyOrdering = (listToOrdering: PlanetType[]) => {
    const unknownPlanets = listToOrdering
      .filter((planet) => planet[order.column] === 'unknown');

    const planets = listToOrdering.filter((planet) => planet[order.column] !== 'unknown');

    const orderedPlanets = order.sort === 'ASC' ? planets
      .sort((a, b) => parseInt(a[order.column], 10) - parseInt(b[order.column], 10))
      : planets
        .sort((a, b) => parseInt(b[order.column], 10) - parseInt(a[order.column], 10));

    return [...orderedPlanets, ...unknownPlanets] as PlanetType[];
  };

  const applyFilters = () => {
    const resultData = getPlanetsByName();
    const filteredData = resultData.filter((planet:PlanetType) => (
      filters.every(({ column, comparison, valueFilter }: FiltersType) => {
        // if (planet[column] === 'unknown') return false;
        switch (comparison) {
          case 'maior que':
            return parseInt(planet[column], 10) > parseInt(valueFilter, 10);
          case 'menor que':
            return parseInt(planet[column], 10) < parseInt(valueFilter, 10);
          case 'igual a':
            return parseInt(planet[column], 10) === parseInt(valueFilter, 10);
          default:
            return false;
        }
      })
    ));
    return order.sort !== '' ? applyOrdering(filteredData) : filteredData;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {applyFilters().map((planet: PlanetType) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films.map((film) => `${film}\n`)}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
