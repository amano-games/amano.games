import Route from 'components/route';
import Eye from 'components/eye';

import style from './style.module.css';

const routes = [
  {
    path: '/#games',
    label: 'Games',
    refId: 'games',
  },
  {
    path: '/#about',
    label: 'About',
    refId: 'about',
  },
  {
    path: '/#contact',
    label: 'Contact',
    refId: 'contact',
  },
];

function Header() {
  return (
    <header id="header" className={`${style.header} wrapper -inverted`}>
      <div className={`${style['header-wrapper']} wrapper`}>
        <Eye href="/#" className={style['header-eye']} />
        <nav className={style['header-navigation']}>
          <ul className={style.routes}>
            {routes.map(({ path, label, refId }) => {
              return (
                <li key={path} className={style['route-wrapper']}>
                  <Route href={path} refId={refId}>
                    {label}
                  </Route>
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
