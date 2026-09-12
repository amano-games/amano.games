import { isFormatImage } from 'lib/assets';
import type { PresskitAssetItem } from 'types/presskit';

type Props = {
  title: string;
  items: PresskitAssetItem[];
};

function PresskitAssetsGrid({ title, items }: Props) {
  return (
    <section>
      <h2>{title}</h2>
      <ul className="c-presskit-assets-grid">
        {items.map((item) => {
          const isImg = isFormatImage(item.format);
          if (!isImg) {
            return null;
          }
          return (
            <li key={item.url}>
              <a href={item.url}>
                <img loading="lazy" src={item.url} alt={item.name} />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default PresskitAssetsGrid;
