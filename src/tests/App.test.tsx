import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import data from './data';
import PlanetsProvider from '../context/PlanetsProvider';
import { element } from 'prop-types';
import { TEST_ID_FILTER_NAME, TABLE_HEADER_NAMES, TEST_ID_VALUE_FILTER, TEST_ID_COMPARISON_FILTER, TEST_ID_COLUMN_FILTER, COLUMNS, COMPARISON, TEST_ID_BTN_REMOVE_FILTERS, TEST_ID_BTN_FILTER } from '../utils/Constants';

const URL = 'https://swapi.dev/api/planets';

const planets = data.results;

describe('Testa a aplicação:', () => {

  beforeEach(() => {    
    vi.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      ok: true,
      json: async () => data,
    } as Response);
  });
  
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Verifica ao renderizar o App se há o título e a mensagem "Carregando..." desaparece após a requisição', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>);
    global.fetch(URL);
    const loadingElement = screen.getByText('Carregando...');
    expect(loadingElement).toBeInTheDocument();

    await waitForElementToBeRemoved(
      () => screen.getAllByText('Carregando...'),
      { timeout: 10000 },
    );
    expect(loadingElement).not.toBeInTheDocument();
    
    expect(screen.getByText(/Star Wars Planets Search - Trybe/i)).toBeInTheDocument()
    
  });

  test('Verifica se a tabela foi preenchida corretamente com os dados', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>);
    global.fetch(URL);
    await waitForElementToBeRemoved(
      () => screen.getAllByText('Carregando...'),
      { timeout: 10000 },
    );
    expect(screen.getByRole('table')).toBeInTheDocument();

    const columnHeader = screen.getAllByRole('columnheader');
    expect(columnHeader).toHaveLength(TABLE_HEADER_NAMES.length);
    expect(columnHeader).not.toHaveLength(TABLE_HEADER_NAMES.length + 1);
    columnHeader.forEach((element) => expect(TABLE_HEADER_NAMES.includes(element.textContent as string)).toBeTruthy());
    
    const rows = screen.getAllByRole('row');
    expect(rows.slice(1)).toHaveLength(planets.length);
    for (let index = 1; index < rows.length; index++) {
      expect(within(rows[index]).getByRole('cell', {  name: `${planets[index-1].name}`}))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', {  name: `${planets[index-1].rotation_period}`}))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', {  name: `${planets[index-1].orbital_period}`}))
        .toBeInTheDocument();
       expect(within(rows[index]).getByRole('cell', {  name: `${planets[index-1].diameter}`}))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', {  name: `${planets[index-1].climate}`}))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', {  name: `${planets[index-1].gravity}`}))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', {  name: `${planets[index-1].terrain}`}))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', {  name: `${planets[index-1].surface_water}`}))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', {  name: `${planets[index-1].population}`}))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', {  name: `${planets[index-1].films.toString()
        .replaceAll(',','\n')}`})).toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', {  name: `${planets[index-1].created}`}))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', {  name: `${planets[index-1].edited}`}))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', {  name: `${planets[index-1].url}`}))
        .toBeInTheDocument();
    }
  });

  test('Verifica se filtra os planetas por nome', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>);
    global.fetch(URL);
    await waitForElementToBeRemoved(
      () => screen.getAllByText('Carregando...'),
      { timeout: 10000 },
    );
    const filterName = screen.getByTestId(TEST_ID_FILTER_NAME);

    expect(filterName).toBeInTheDocument()

    await act(async () => {
      await userEvent.type(filterName, 'oo');
    });

    const rows = screen.getAllByRole('row');
    expect(rows.slice(1)).toHaveLength(2);
    expect(within(rows[1]).getByRole('cell', {  name: `Tatooine`})).toBeInTheDocument();
    expect(within(rows[2]).getByRole('cell', {  name: `Naboo`})).toBeInTheDocument();

    await userEvent.clear(filterName);
    expect(screen.getAllByRole('row').slice(1)).toHaveLength(planets.length);;

    await act(async () => {
      await userEvent.type(filterName, 'aa');
    });

    const rows2 = screen.getAllByRole('row');
    expect(rows2.slice(1)).toHaveLength(1);
    expect(within(rows2[1]).getByRole('cell', {  name: `Alderaan`})).toBeInTheDocument();
  });

  test('Testa o filtro númerico', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>);
    global.fetch(URL);
    await waitForElementToBeRemoved(
      () => screen.getAllByText('Carregando...'),
      { timeout: 10000 },
    );
    const filterValue = screen.getByTestId(TEST_ID_VALUE_FILTER);
    const filterComparison = screen.getByTestId(TEST_ID_COMPARISON_FILTER);
    const filterColumnFilter = screen.getByTestId(TEST_ID_COLUMN_FILTER);

    await act(async () => {
      await userEvent.selectOptions(filterColumnFilter, COLUMNS[1]);
      await userEvent.selectOptions(filterComparison, COMPARISON[1]);
      await userEvent.type(screen.getByTestId(TEST_ID_VALUE_FILTER), '400');
      await userEvent.click(screen.getByTestId(TEST_ID_BTN_FILTER));
    });

    const rows = screen.getAllByRole('row');
    expect(rows.slice(1)).toHaveLength(5);
    expect(within(rows[1]).getByRole('cell', {  name: `Tatooine`})).toBeInTheDocument();
    expect(within(rows[2]).getByRole('cell', {  name: `Alderaan`})).toBeInTheDocument();
    expect(within(rows[3]).getByRole('cell', {  name: `Dagobah`})).toBeInTheDocument();
    expect(within(rows[4]).getByRole('cell', {  name: `Naboo`})).toBeInTheDocument();
    expect(within(rows[5]).getByRole('cell', {  name: `Coruscant`})).toBeInTheDocument();

    await userEvent.click(screen.getByTestId(TEST_ID_BTN_REMOVE_FILTERS));
    expect(screen.getAllByRole('row').slice(1)).toHaveLength(planets.length);;
  });
})
