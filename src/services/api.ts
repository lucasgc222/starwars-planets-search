import { PlanetType } from '../utils/type';

export const fetchPlanets = async () => {
  const url = 'https://swapi.dev/api/planets';
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Erro ao requisitar!');
    }

    const data = await response.json();
    console.log(data);
    const planets: PlanetType[] = data.results
      .map((planet: PlanetType) => {
        const { residents, ...allProps } = planet;
        return { ...allProps };
      });
    console.log(planets);
    return planets;
  } catch (error) {
    console.error('Erro ao buscar:', error);
    throw error;
  }
};
