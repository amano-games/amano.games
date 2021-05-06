import NavLink from 'components/nav-link';
import Eye from 'components/eye';

import style from './style.module.css';

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
    <header id="header" className={`${style.header} wrapper -inverted`}>
      <div className={`${style['header-wrapper']} wrapper`}>
        <Eye className={style['header-eye']} />
        <nav className={style['header-navigation']}>
          <ul className={style.routes}>
            {routes.map(({ path, label }) => {
              return (
                <li key={path}>
                  <NavLink href={path}>
                    <a>{label}</a>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
