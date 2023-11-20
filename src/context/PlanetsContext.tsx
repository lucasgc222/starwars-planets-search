import { createContext } from 'react';
import { PlanetType } from '../utils/type';

type PlanetsContextType = {
  planets: PlanetType[];
};

const planetsContext = createContext({} as PlanetsContextType);

export default planetsContext;
