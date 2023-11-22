import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import data from './data';

const URL = 'https://swapi.dev/api/planets';

describe('Testa componente App', () => {

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
  test('Verifica ao renderizar o App se há o título e a mensagem "Carregando..." enquanto faz a requisição', async () => {
    render(<App />);
    await act(async () => {
      global.fetch(URL);
    });
    // const loadingElement = screen.getByText(/Carregando.../i);
    // expect(loadingElement).toBeInTheDocument();

    await waitForElementToBeRemoved(
      () => screen.getByText(/Carregando.../i),
      { timeout: 3500 },
    );
    // expect(loadingElement).not.toBeInTheDocument();
    
    expect(screen.getByText(/Star Wars Planets Search - Trybe/i)).toBeInTheDocument()
    
  });
  
})
