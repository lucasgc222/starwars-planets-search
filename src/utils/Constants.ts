import { FiltersType, SortType } from './type';

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

export const INITIAL_ORDER: SortType = {
  column: 'population',
  sort: '',
};

// For test
export const TABLE_HEADER_NAMES = [
  'Name',
  'Rotation Period',
  'Orbital Period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Surface Water',
  'Population',
  'Films',
  'Created',
  'Edited',
  'URL',
];

export const TEST_ID_FILTER_NAME = 'name-filter';
export const TEST_ID_PLANET_NAME = 'planet-name';
export const TEST_ID_VALUE_FILTER = 'value-filter';
export const TEST_ID_BTN_FILTER = 'button-filter';
export const TEST_ID_BTN_REMOVE_FILTERS = 'button-remove-filters';
export const TEST_ID_COLUMN_FILTER = 'column-filter';
export const TEST_ID_COMPARISON_FILTER = 'comparison-filter';
