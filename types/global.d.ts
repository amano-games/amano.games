declare module '*.svg' {
  import type { FC, SVGProps } from 'react';

  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module 'lerp' {
  function lerp(start: number, end: number, alpha: number): number;
  export default lerp;
}

declare module 'react-use-dimensions' {
  import type { RefCallback } from 'react';

  type Dimensions = {
    width: number | undefined;
    height: number | undefined;
    x: number | undefined;
    y: number | undefined;
  };

  function useDimensions(): [RefCallback<HTMLElement>, Dimensions];
  export default useDimensions;
}

declare module 'react-download-link' {
  import type { CSSProperties, FC, ReactNode } from 'react';

  type DownloadLinkProps = {
    filename?: string;
    label?: ReactNode;
    exportFile: () => string | Promise<string> | Blob | Promise<Blob>;
    tagName?: string;
    className?: string;
    style?: CSSProperties;
  };

  const DownloadLink: FC<DownloadLinkProps>;
  export default DownloadLink;
}

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      'altcha-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        hideLogo?: boolean;
        hideFooter?: boolean;
        challengeurl?: string;
      };
    }
  }
}
