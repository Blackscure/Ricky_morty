import { Helmet } from 'react-helmet-async';

import { CharactersView } from 'src/sections/characters/view';

// ----------------------------------------------------------------------

export default function RolesPage() {
  return (
    <>
      <Helmet>
        <title> Characters | Ricky Morty </title>
      </Helmet>

      <CharactersView />
    </>
  );
}
