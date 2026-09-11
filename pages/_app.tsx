import type { AppProps } from 'next/app';
import 'modern-css-reset';

import 'styles/variables.css';
import 'styles/globals.css';
import 'styles/styles.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
