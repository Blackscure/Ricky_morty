import { Helmet } from 'react-helmet-async';

import { RolesView  } from 'src/sections/roles/';

// ----------------------------------------------------------------------

export default function RolesPage() {
  return (
    <>
      <Helmet>
        <title> Characters | Ricky Morty </title>
      </Helmet>

      <RolesView />
    </>
  );
}
