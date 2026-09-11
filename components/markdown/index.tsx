import type { ReactNode } from 'react';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark as dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import remarkGfm from 'remark-gfm';
import { isValidElement } from 'react';

import RichText from 'components/rich-text';

import style from './style.module.css';

const SPOILER_PREFIX = 'spoiler: ';

type MarkdownChildProps = {
  node?: { tagName?: string };
  children?: ReactNode;
  src?: string;
};

function getIsSpoiler(props?: MarkdownChildProps) {
  if (props?.node?.tagName !== 'del') {
    return false;
  }
  const { children } = props;
  const res = String(children).toLowerCase().startsWith(SPOILER_PREFIX);
  return res;
}

function renderParagraph({ children }: { children?: ReactNode }) {
  // Can't put a summary inside a <p>
  // so we need remove the <p> tag if the children is a spoiler.
  const childrenProps = isValidElement(children)
    ? (children.props as MarkdownChildProps)
    : undefined;
  if (getIsSpoiler(childrenProps)) {
    return children;
  }
  if (children && childrenProps?.src) {
    return children;
  }

  return <p>{children}</p>;
}

function renderSpoiler({
  children,
  node,
}: {
  children?: ReactNode;
  node?: { tagName?: string };
}) {
  if (!children) return null;
  const isSpoiler = getIsSpoiler({ children, node });
  if (isSpoiler) {
    const child = String(children)?.slice(SPOILER_PREFIX.length);
    return (
      <details className={style.spoiler} aria-label="Spoiler">
        <summary>Spoiler</summary>
        {child}
      </details>
    );
  }
  return <del>{children}</del>;
}

function renderCode({
  className,
  children,
  ...props
}: {
  node?: unknown;
  className?: string;
  children?: ReactNode;
}) {
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter
      className={style['code-wrapper']}
      customStyle={{
        padding: undefined,
      }}
      style={dark}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

type Props = {
  children?: string | null;
  className?: string;
};

function Markdown({ children = null, className }: Props) {
  const customClassName = classNames(
    style['markdown-container'],
    'markdown-container',
    className
  );

  return (
    <RichText className={customClassName}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: renderParagraph,
          code: renderCode,
          del: renderSpoiler,
        }}
      >
        {children}
      </ReactMarkdown>
    </RichText>
  );
}

export default Markdown;
