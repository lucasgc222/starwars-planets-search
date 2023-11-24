import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import data from './data';
import PlanetsProvider from '../context/PlanetsProvider';
import { TEST_ID_FILTER_NAME, TABLE_HEADER_NAMES, URL } from '../utils/Constants';

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
      { timeout: 5000 },
    );
    expect(loadingElement).not.toBeInTheDocument();

    expect(screen.getByText(/Star Wars Planets Search - Trybe/i)).toBeInTheDocument()

  });

  test('Verifica se a tabela foi preenchida corretamente com os dados', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>);
    global.fetch(URL);
    await waitForElementToBeRemoved(
      () => screen.getAllByText('Carregando...'),
      { timeout: 5000 },
    );
    expect(screen.getByRole('table')).toBeInTheDocument();

    const columnHeader = screen.getAllByRole('columnheader');
    expect(columnHeader).toHaveLength(TABLE_HEADER_NAMES.length);
    expect(columnHeader).not.toHaveLength(TABLE_HEADER_NAMES.length + 1);
    columnHeader.forEach((element) => expect(TABLE_HEADER_NAMES.includes(element.textContent as string)).toBeTruthy());

    const rows = screen.getAllByRole('row');
    expect(rows.slice(1)).toHaveLength(planets.length);
    for (let index = 1; index < rows.length; index++) {
      expect(within(rows[index]).getByRole('cell', { name: `${planets[index - 1].name}` }))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', { name: `${planets[index - 1].rotation_period}` }))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', { name: `${planets[index - 1].orbital_period}` }))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', { name: `${planets[index - 1].diameter}` }))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', { name: `${planets[index - 1].climate}` }))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', { name: `${planets[index - 1].gravity}` }))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', { name: `${planets[index - 1].terrain}` }))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', { name: `${planets[index - 1].surface_water}` }))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', { name: `${planets[index - 1].population}` }))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', {
        name: `${planets[index - 1].films.toString()
          .replaceAll(',', '\n')}`
      })).toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', { name: `${planets[index - 1].created}` }))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', { name: `${planets[index - 1].edited}` }))
        .toBeInTheDocument();
      expect(within(rows[index]).getByRole('cell', { name: `${planets[index - 1].url}` }))
        .toBeInTheDocument();
    }
  });

  test('Verifica se filtra os planetas por nome', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>);
    global.fetch(URL);
    await waitForElementToBeRemoved(
      () => screen.getAllByText('Carregando...'),
      { timeout: 5000 },
    );
    const filterName = screen.getByTestId(TEST_ID_FILTER_NAME);

    expect(filterName).toBeInTheDocument()

    await act(async () => {
      await userEvent.type(filterName, 'oo');
    });

    const rows = screen.getAllByRole('row');
    expect(rows.slice(1)).toHaveLength(2);
    expect(within(rows[1]).getByRole('cell', { name: `Tatooine` })).toBeInTheDocument();
    expect(within(rows[2]).getByRole('cell', { name: `Naboo` })).toBeInTheDocument();

    await userEvent.clear(filterName);
    expect(screen.getAllByRole('row').slice(1)).toHaveLength(planets.length);;

    await act(async () => {
      await userEvent.type(filterName, 'aa');
    });

    const rows2 = screen.getAllByRole('row');
    expect(rows2.slice(1)).toHaveLength(1);
    expect(within(rows2[1]).getByRole('cell', { name: `Alderaan` })).toBeInTheDocument();
  });

})
