import Route from 'components/route';
import Eye from 'components/eye';
import Link from 'next/link';
import './styles.css';

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
    <header id="header" className="c-header -inverted">
      <div className="c-header-wrapper wrapper">
        <Link href="/#">
          <Eye className="c-header-eye" />
        </Link>
        <nav className="c-header-navigation">
          <ul className="c-header-routes">
            {routes.map(({ path, label, refId }) => {
              return (
                <li key={path} className="c-header-route-wrapper">
                  <Route href={path} refId={refId}>
                    {label}
                  </Route>
                </li>
              );
            })}
            <li className="c-header-route-wrapper" data-hide="mobile">
              <Route href="/devlog">Devlog</Route>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
