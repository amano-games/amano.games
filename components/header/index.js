import NavLink from 'components/nav-link';

const routes = [
  {
    path: '/#about',
    label: 'About',
  },
  {
    path: '/#games',
    label: 'Games',
  },
  {
    path: '/#contact',
    label: 'Contact',
  },
];

function Header() {
  return (
    <header id="header">
      <img src="" alt="" />
      <nav>
        <ul>
          {routes.map(({ path, label }) => {
            return (
              <li>
                <NavLink href={path}>
                  <a>{label}</a>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
