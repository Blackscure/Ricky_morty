import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'users',
    path: '/user',
    icon: icon('ic_user'),
  },

  {
    title: 'roles',
    path: '/roles',
    icon: icon('oui:app-users-roles'),
  },
  {
    title: 'characters',
    path: '/characters',
    icon: icon('arcticons:character-pad'),
  },

  {
    title: 'locations',
    path: '/locations',
    icon: icon('arcticons:character-pad'),
  },

  {
    title: 'episodes',
    path: '/episodes',
    icon: icon('arcticons:character-pad'),
  },
  

  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
