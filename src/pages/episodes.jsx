import { Helmet } from 'react-helmet-async';

import { EpisodeView } from 'src/sections/episode/view';

// ----------------------------------------------------------------------

export default function EpisodesPage() {
  return (
    <>
      <Helmet>
        <title> Episode | Ricky Morty </title>
      </Helmet>

      <EpisodeView />
    </>
  );
}
