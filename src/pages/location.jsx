import { Helmet } from 'react-helmet-async';

import { LocationView } from 'src/sections/locations';

// ----------------------------------------------------------------------

export default function RolesPage() {
  return (
    <>
      <Helmet>
        <title> Location | Ricky Morty </title>
      </Helmet>

      <LocationView />
    </>
  );
}
