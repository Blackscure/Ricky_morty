import { Helmet } from 'react-helmet-async';

import { RolesView  } from 'src/sections/roles/';

// ----------------------------------------------------------------------

export default function RolesPage() {
  return (
    <>
      <Helmet>
        <title> Roles | Bhumi Distributers </title>
      </Helmet>

      <RolesView />
    </>
  );
}
