import { Fragment } from 'react';

import type { PresskitVideo } from 'types/presskit';

import formatBytes from '../format-bytes';
import PresskitAssetYt from '../presskit-asset-yt';

type Props = {
  videos?: PresskitVideo[];
};

function PresskitVideos({ videos = [] }: Props) {
  return videos.length > 0 ? (
    <>
      <h2>Videos</h2>
      <dl>
        {videos.map((item) => {
          return (
            <Fragment key={item.name}>
              {!item.collapse ? (
                <>
                  <dt>{item.name}</dt>
                  {item.youtube ? (
                    <dd className="c-presskit-assets-yt-iframe-wrapper">
                      <PresskitAssetYt
                        title={item.name}
                        youtube={item.youtube}
                      />
                    </dd>
                  ) : null}
                  {item.downloads && item.downloads.length > 0 ? (
                    <>
                      <dt>Download:</dt>
                      <dd>
                        <ul>
                          {item.downloads?.map((download) => {
                            return (
                              <li key={download.url}>
                                <a href={download.url}>{download.name}</a> (
                                {formatBytes(download.bytes)}{' '}
                                <span className="c-presskit-assets-asset-format">
                                  {download.format}
                                </span>
                                )
                              </li>
                            );
                          })}
                        </ul>
                      </dd>
                    </>
                  ) : null}
                </>
              ) : (
                <dd>
                  <details>
                    <summary>{item.name}</summary>
                    {item.youtube ? (
                      <div className="c-presskit-assets-yt-iframe-wrapper">
                        <PresskitAssetYt
                          title={item.name}
                          youtube={item.youtube}
                        />
                      </div>
                    ) : null}
                  </details>
                </dd>
              )}
            </Fragment>
          );
        })}
      </dl>
    </>
  ) : null;
}

export default PresskitVideos;
