import { createContext, useState } from 'react';

// Crear contexto
export const DatabaseContext = createContext();

//Crear provider
export function DatabaseProvider({ children }) {
  const [database, setDatabase] = useState(null);
  return (
    <DatabaseContext.Provider value={{ database, setDatabase }}>
      {children}
    </DatabaseContext.Provider>
  );
}