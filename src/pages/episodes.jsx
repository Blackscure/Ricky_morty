import { Helmet } from 'react-helmet-async';

import { EpisodesView } from 'src/sections/episodess/view';

// ----------------------------------------------------------------------

export default function RolesPage() {
  return (
    <>
      <Helmet>
        <title> Episodes | Ricky Morty </title>
      </Helmet>

      <EpisodesView />
    </>
  );
}
