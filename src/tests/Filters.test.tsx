import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import PlanetsProvider from "../context/PlanetsProvider";
import App from "../App";
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import data from './data';
import { TEST_ID_VALUE_FILTER, TEST_ID_COMPARISON_FILTER, TEST_ID_COLUMN_FILTER, COLUMNS, COMPARISON, TEST_ID_BTN_REMOVE_FILTERS, TEST_ID_BTN_FILTER, TEST_ID_FILTER, TEST_ID_PLANET_NAME, TEST_ID_SORT_ASC, TEST_ID_SORT_DESC, TEST_ID_COLUMN_SORT, TEST_ID_BTN_SORT, URL } from '../utils/Constants';

const planets = data.results;

describe('Testa as opções de filtros da aplicação', () => {
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

    test('Testa o filtro númerico', async () => {
        render(<PlanetsProvider><App /></PlanetsProvider>);
        global.fetch(URL);
        await waitForElementToBeRemoved(
            () => screen.getAllByText('Carregando...'),
            { timeout: 5000 },
        );
        const filterValue = screen.getByTestId(TEST_ID_VALUE_FILTER);
        const filterComparison = screen.getByTestId(TEST_ID_COMPARISON_FILTER);
        const filterColumnFilter = screen.getByTestId(TEST_ID_COLUMN_FILTER);

        await act(async () => {
            await userEvent.selectOptions(filterColumnFilter, COLUMNS[1]);
            await userEvent.selectOptions(filterComparison, COMPARISON[1]);
            await userEvent.type(filterValue, '400');
            await userEvent.click(screen.getByTestId(TEST_ID_BTN_FILTER));
        });

        const rows = screen.getAllByRole('row');
        expect(rows.slice(1)).toHaveLength(5);
        expect(within(rows[1]).getByRole('cell', { name: `Tatooine` })).toBeInTheDocument();
        expect(within(rows[2]).getByRole('cell', { name: `Alderaan` })).toBeInTheDocument();
        expect(within(rows[3]).getByRole('cell', { name: `Dagobah` })).toBeInTheDocument();
        expect(within(rows[4]).getByRole('cell', { name: `Naboo` })).toBeInTheDocument();
        expect(within(rows[5]).getByRole('cell', { name: `Coruscant` })).toBeInTheDocument();

        await userEvent.click(screen.getByTestId(TEST_ID_BTN_REMOVE_FILTERS));
        expect(screen.getAllByRole('row').slice(1)).toHaveLength(planets.length);;
    });

    test('Testa o filtro númerico com igualdade', async () => {
        render(<PlanetsProvider><App /></PlanetsProvider>);
        global.fetch(URL);
        await waitForElementToBeRemoved(
            () => screen.getAllByText('Carregando...'),
            { timeout: 5000 },
        );
        const filterValue = screen.getByTestId(TEST_ID_VALUE_FILTER);
        const filterComparison = screen.getByTestId(TEST_ID_COMPARISON_FILTER);
        const filterColumnFilter = screen.getByTestId(TEST_ID_COLUMN_FILTER);

        await act(async () => {
            await userEvent.selectOptions(filterColumnFilter, COLUMNS[COLUMNS.length - 1]);
            await userEvent.selectOptions(filterComparison, COMPARISON[COMPARISON.length - 1]);
            await userEvent.type(filterValue, '8');
            await userEvent.click(screen.getByTestId(TEST_ID_BTN_FILTER));
        });

        const rows = screen.getAllByRole('row');
        expect(rows.slice(1)).toHaveLength(3);
        expect(within(rows[1]).getByRole('cell', { name: `Yavin IV` })).toBeInTheDocument();
        expect(within(rows[2]).getByRole('cell', { name: `Dagobah` })).toBeInTheDocument();
        expect(within(rows[3]).getByRole('cell', { name: `Endor` })).toBeInTheDocument();

        await userEvent.click(screen.getByTestId(TEST_ID_BTN_REMOVE_FILTERS));
        expect(screen.getAllByRole('row').slice(1)).toHaveLength(planets.length);;
    });

    test('Testa mais de um filtro númerico e remove pelo botão do filtro', async () => {
        render(<PlanetsProvider><App /></PlanetsProvider>);
        global.fetch(URL);
        await waitForElementToBeRemoved(
            () => screen.getAllByText('Carregando...'),
            { timeout: 5000 },
        );
        const filterComparison = screen.getByTestId(TEST_ID_COMPARISON_FILTER);
        const filterColumnFilter = screen.getByTestId(TEST_ID_COLUMN_FILTER);

        expect(within(filterColumnFilter).getAllByRole('option')).toHaveLength(COLUMNS.length);

        await act(async () => {
            await userEvent.selectOptions(filterColumnFilter, COLUMNS[1]);
            await userEvent.selectOptions(filterComparison, COMPARISON[1]);
            await userEvent.type(screen.getByTestId(TEST_ID_VALUE_FILTER), '400');
            await userEvent.click(screen.getByTestId(TEST_ID_BTN_FILTER));
        });
        expect(within(filterColumnFilter).getAllByRole('option')).toHaveLength(COLUMNS.length - 1);

        const rows = screen.getAllByRole('row');
        expect(rows.slice(1)).toHaveLength(5);
        expect(within(rows[1]).getByRole('cell', { name: `Tatooine` })).toBeInTheDocument();
        expect(within(rows[2]).getByRole('cell', { name: `Alderaan` })).toBeInTheDocument();
        expect(within(rows[3]).getByRole('cell', { name: `Dagobah` })).toBeInTheDocument();
        expect(within(rows[4]).getByRole('cell', { name: `Naboo` })).toBeInTheDocument();
        expect(within(rows[5]).getByRole('cell', { name: `Coruscant` })).toBeInTheDocument();

        await act(async () => {
            await userEvent.selectOptions(filterColumnFilter, COLUMNS[4]);
            await userEvent.selectOptions(filterComparison, COMPARISON[0]);
            await userEvent.type(screen.getByTestId(TEST_ID_VALUE_FILTER), '10');
            await userEvent.click(screen.getByTestId(TEST_ID_BTN_FILTER));
        });

        expect(within(filterColumnFilter).getAllByRole('option')).toHaveLength(COLUMNS.length - 2);

        const rows2 = screen.getAllByRole('row');
        expect(rows2.slice(1)).toHaveLength(2);
        expect(within(rows2[1]).getByRole('cell', { name: `Alderaan` })).toBeInTheDocument();
        expect(within(rows2[2]).getByRole('cell', { name: `Naboo` })).toBeInTheDocument();

        const filters = screen.getAllByTestId(TEST_ID_FILTER);
        expect(filters).toHaveLength(2);

        await act(async () => {
            await userEvent.click(within(filters[filters.length - 1]).getByRole('button', {
                name: /x/i
            }));
        });

        expect(within(filterColumnFilter).getAllByRole('option')).toHaveLength(COLUMNS.length - 1);

        expect(screen.getAllByRole('row').slice(1)).toHaveLength(5);

        await act(async () => {
            await userEvent.click(within(filters[filters.length - 2]).getByRole('button', {
                name: /x/i
            }));
        });

        expect(within(filterColumnFilter).getAllByRole('option')).toHaveLength(COLUMNS.length);

        expect(screen.getAllByRole('row').slice(1)).toHaveLength(planets.length);
    });

    test('Testa o filtro de ordenação', async () => {
        render(<PlanetsProvider><App /></PlanetsProvider>);
        global.fetch(URL);
        await waitForElementToBeRemoved(
            () => screen.getAllByText('Carregando...'),
            { timeout: 5000 },
        );
        expect(global.fetch).toHaveBeenCalled();
        const filterComparison = screen.getByTestId(TEST_ID_COMPARISON_FILTER);
        const filterColumnFilter = screen.getByTestId(TEST_ID_COLUMN_FILTER);

        const filterSort = screen.getByTestId(TEST_ID_COLUMN_SORT);
        const asc = screen.getByTestId(TEST_ID_SORT_ASC);
        const desc = screen.getByTestId(TEST_ID_SORT_DESC);
        const btnSort = screen.getByTestId(TEST_ID_BTN_SORT);

        expect(btnSort).toBeDisabled();

        await act(async () => {
            await userEvent.selectOptions(filterColumnFilter, COLUMNS[4]);
            await userEvent.selectOptions(filterComparison, COMPARISON[1]);
            await userEvent.type(screen.getByTestId(TEST_ID_VALUE_FILTER), '10');
            await userEvent.click(screen.getByTestId(TEST_ID_BTN_FILTER));
        });

        let filterRows = screen.getAllByRole('row');
        expect(filterRows.slice(1)).toHaveLength(5);

        let filterPlanets = screen.getAllByTestId(TEST_ID_PLANET_NAME);
        expect(filterPlanets[0]).toHaveTextContent('Tatooine');
        expect(filterPlanets[filterPlanets.length - 1]).toHaveTextContent('Endor');

        await act(async () => {
            await userEvent.selectOptions(filterSort, COLUMNS[0]);
            await userEvent.click(asc);
        });
        expect(btnSort).toBeEnabled();

        await act(async () => {
            await userEvent.click(btnSort);
        });

        expect(btnSort).toBeDisabled();
        filterRows = screen.getAllByRole('row');
        expect(filterRows.slice(1)).toHaveLength(5);

        filterPlanets = screen.getAllByTestId(TEST_ID_PLANET_NAME);
        expect(filterPlanets[0]).toHaveTextContent('Yavin IV');
        expect(filterPlanets[filterPlanets.length - 1]).toHaveTextContent('Dagobah');

        expect(within(filterRows[filterRows.length - 1]).getByRole('cell', { name: `unknown` })).toBeInTheDocument();

        await act(async () => {
            await userEvent.click(desc);
        });
        expect(btnSort).toBeEnabled();

        await act(async () => {
            await userEvent.click(btnSort);
        });

        expect(btnSort).toBeDisabled();
        filterRows = screen.getAllByRole('row');
        expect(filterRows.slice(1)).toHaveLength(5);

        filterPlanets = screen.getAllByTestId(TEST_ID_PLANET_NAME);
        expect(filterPlanets[0]).toHaveTextContent('Endor');
        expect(filterPlanets[filterPlanets.length - 1]).toHaveTextContent('Dagobah');

        expect(within(filterRows[filterRows.length - 1]).getByRole('cell', { name: `unknown` })).toBeInTheDocument();
    });
})