import Manita from 'components/manita';

import style from './style.module.css';

const manitas = [
  {
    name: 'AFK Mario',
    title: 'Lorem Ipsum',
    image: '/avatar.png',
    description: `
Lle rangwa amin Nadorhuanrim Tarion amin naa tualle. Bragollach tel'llach quanta yassen 'kshapsa manke naa lye omentien n'tess uuvanimo. Mith'quessir cuamin linduva yassen megrille Amandil lye. Asca melloneamin quel marth amin naa tualle ta naa neuma!. Ro Asca Kotyaerea Gayaerea.
    `,
    links: [
      {
        url: 'https://afk-mario.itch.io',
        type: 'itchio',
      },
    ],
  },
  {
    name: 'Joven Paul',
    title: 'Lorem Ipsum',
    image: '/avatar.png',
    description: `
    Amin harmuva onalle e' cormamin entula en' templa tula uialtum amin quella. Mith'quessir heru en amin Naugrim mani naa lle umien? Aa' menle nauva calen ar' ta hwesta e' ale'quenle Uialtum Kela tira ten' rashwe!. Ndengina ta ho vedui' il'er creoso a'baramin Nenime. Lle quena i'lambe tel' Eldalie amin nowe ron n'kelaya lle naa curucuar manke naa nae lle llie lye tuulo'?
    `,
    links: [
      {
        url: 'https://afk-mario.itch.io',
        type: 'itchio',
      },
    ],
  },
];

function AboutUs() {
  return (
    <section className={`${style['about-us']}`}>
      <div className="wrapper">
        <header className={style['about-us-header']}>
          <h1>About Us</h1>
        </header>
        <div className={style['about-us-manitas']}>
          {manitas.map((manita) => {
            return <Manita {...manita} key={manita.name} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
