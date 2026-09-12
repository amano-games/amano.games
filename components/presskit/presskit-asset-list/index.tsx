import { Fragment } from 'react';

import { isFormatImage } from 'lib/assets';
import type { PresskitAssetItem } from 'types/presskit';

import formatBytes from '../format-bytes';
import PresskitAssetImg from '../presskit-asset-img';

type Props = {
  title: string;
  items: PresskitAssetItem[];
};

function PresskitAssetList({ title, items }: Props) {
  return (
    <section>
      <h2>{title}</h2>
      <dl>
        {items.map((item) => {
          const isImg = isFormatImage(item.format);
          return (
            <Fragment key={item.url}>
              {!item.collapse ? (
                <>
                  <dt>
                    <a href={item.url}>{item.name}</a>
                  </dt>
                  {isImg ? (
                    <dd>
                      <PresskitAssetImg
                        src={item.url}
                        alt={item.name}
                        styleWidth={item.style_width}
                      />
                    </dd>
                  ) : null}
                  <dd>
                    {formatBytes(item.bytes)}{' '}
                    <span className="c-presskit-assets-asset-format">
                      {item.format}
                    </span>
                  </dd>
                  {isImg ? (
                    <dd>
                      {item.width} x {item.height}
                    </dd>
                  ) : null}
                </>
              ) : (
                <dd>
                  <details>
                    <summary>
                      {item.name} (
                      <a href={item.url}>
                        <span>
                          {item.width} x {item.height}{' '}
                        </span>
                        <span>{formatBytes(item.bytes)} </span>
                        <span className="c-presskit-assets-asset-format">
                          {item.format}
                        </span>
                      </a>
                      )
                    </summary>
                    <figure>
                      <a href={item.url}>
                        {isImg ? (
                          <PresskitAssetImg
                            src={item.url}
                            alt={item.name}
                            styleWidth={item.style_width}
                          />
                        ) : (
                          <span>{item.url}</span>
                        )}
                      </a>
                    </figure>
                  </details>
                </dd>
              )}
            </Fragment>
          );
        })}
      </dl>
    </section>
  );
}

export default PresskitAssetList;
