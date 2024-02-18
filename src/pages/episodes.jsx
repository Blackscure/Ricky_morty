import { Helmet } from 'react-helmet-async';

import { EpisodesView } from 'src/sections/episodes/view';

// ----------------------------------------------------------------------

export default function EpisodesPage() {
  return (
    <>
      <Helmet>
        <title> Episode | Ricky Morty </title>
      </Helmet>

      <EpisodesView />
    </>
  );
}
