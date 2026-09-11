import Manita from 'components/manita';
import Markdown from 'components/markdown';
import type { Manita as ManitaData } from 'types/manita';

import Fingers from 'svg/fingers2.svg';

type Props = {
  manitas: ManitaData[];
  aboutUs: string;
};

function AboutUs({ manitas, aboutUs }: Props) {
  return (
    <section className="c-about-us" id="about">
      <Fingers className="c-about-us-fingers" />
      <div className="wrapper">
        <header className="c-about-us-header">
          <h1>About Us</h1>
        </header>
        <Markdown className="c-about-us-text">{aboutUs}</Markdown>
        <div className="c-about-us-manitas">
          {manitas.map((manita, i) => {
            const flipped = i % 2 !== 0;
            return <Manita {...manita} key={manita.title} flipped={flipped} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
