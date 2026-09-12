import classNames from 'classnames';

import type { PresskitAssetGroup, PresskitVideo } from 'types/presskit';

import PresskitAssetList from '../presskit-asset-list';
import PresskitAssetsGrid from '../presskit-assets-grid';
import PresskitVideos from '../presskit-videos';

type Props = {
  className?: string;
  videos?: PresskitVideo[];
  assets?: PresskitAssetGroup[];
  bundle?: string;
};

function PresskitAssets({
  className,
  videos = [],
  assets = [],
  bundle,
}: Props) {
  const customClassName = classNames(
    'c-presskit-assets',
    '-inverted',
    className
  );

  return (
    <section className={customClassName}>
      <header>
        <h1>Assets</h1>
      </header>
      {bundle ? (
        <dl>
          <dt>Download all</dt>
          <dd>
            <a href={bundle}>{bundle}</a>
          </dd>
        </dl>
      ) : null}

      <PresskitVideos videos={videos} />

      {assets.length > 0 ? (
        <>
          {assets.map((section) => {
            if (section.grid) {
              return (
                <PresskitAssetsGrid
                  key={section.title}
                  title={section.title}
                  items={section.items}
                />
              );
            }

            return (
              <PresskitAssetList
                key={section.title}
                title={section.title}
                items={section.items}
              />
            );
          })}
        </>
      ) : null}
    </section>
  );
}

export default PresskitAssets;
