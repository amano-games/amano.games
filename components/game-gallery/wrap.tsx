'use client';

import { Suspense, type HTMLAttributes, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import classNames from 'classnames';

import EyesWrap from 'components/eyes-wrap';
import EyesWrapAdmin from 'components/eyes-wrap-admin';

const SEARCH_PARAM_EDIT = 'edit';
const GALLERY_CLASS_NAME = 'c-game-gallery -inverted';

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

function GalleryWrapInner({ children, className, ...rest }: Props) {
  const searchParams = useSearchParams();
  const isEdit = Boolean(searchParams?.get(SEARCH_PARAM_EDIT));
  const Wrap = isEdit ? EyesWrapAdmin : EyesWrap;
  const wrapClassName = classNames(GALLERY_CLASS_NAME, className);

  return (
    <Wrap className={wrapClassName} {...rest}>
      {children}
    </Wrap>
  );
}

function GameGalleryWrap({ children, className, ...rest }: Props) {
  const wrapClassName = classNames(GALLERY_CLASS_NAME, className);

  return (
    <Suspense
      fallback={
        <EyesWrap className={wrapClassName} {...rest}>
          {children}
        </EyesWrap>
      }
    >
      <GalleryWrapInner className={className} {...rest}>
        {children}
      </GalleryWrapInner>
    </Suspense>
  );
}

export default GameGalleryWrap;
