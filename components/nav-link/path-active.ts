const HREF_BASE = 'http://amano.games'; // Dummy

function pathActive(pathname: string, href: string): boolean {
  const path = new URL(href, HREF_BASE).pathname;

  return pathname === path || pathname.startsWith(`${path}/`);
}

export default pathActive;
