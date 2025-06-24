import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark as dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import remarkGfm from 'remark-gfm';

import RichText from 'components/rich-text';

import style from './style.module.css';

const SPOILER_PREFIX = 'spoiler: ';

function getIsSpoiler(props) {
  if (props?.node?.tagName !== 'del') {
    return false;
  }
  const { children } = props;
  const res = String(children).toLowerCase().startsWith(SPOILER_PREFIX);
  return res;
}

function renderParagraph(props) {
  const { children } = props;
  // Can't put a summary inside a <p>
  // so we need remove the <p> tag if the children is a spoiler.
  const childrenProps = children?.props;
  if (getIsSpoiler(childrenProps)) {
    return children;
  }
  if (children && children?.props && children?.props.src) {
    return children;
  }

  return <p>{children}</p>;
}

function renderSpoiler(props) {
  const { children } = props;
  if (!children) return null;
  const isSpoiler = getIsSpoiler(props);
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

function renderCode({ node, className, children, ...props }) {
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

function Markdown({ children = null, className = null }) {
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

Markdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Markdown;
