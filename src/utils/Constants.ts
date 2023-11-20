import { FiltersType } from './type';

export const COLUMNS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export const COMPARISON = [
  'maior que',
  'menor que',
  'igual a',
];

export const INITIAL_FILTER_VALUE: FiltersType = {
  column: 'population',
  comparison: 'maior que',
  valueFilter: '0',
};
