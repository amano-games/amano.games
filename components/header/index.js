import Route from 'components/route';
import Eye from 'components/eye';
import Link from 'next/link';

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
    <header id="header" className={`${style.header} -inverted`}>
      <div className={`${style['header-wrapper']} wrapper`}>
        <Link href="/#">
          <a>
            <Eye className={style['header-eye']} />
          </a>
        </Link>
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
