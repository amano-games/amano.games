import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark as dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import RichText from 'components/rich-text';

import style from './style.module.css';

function renderParagraph(props) {
  const { children } = props;
  if (
    children &&
    children[0] &&
    children.length === 1 &&
    children[0].props &&
    children[0].props.src
  ) {
    return children;
  }

  return <p>{children}</p>;
}
function renderCode({ node, inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
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

function Markdown({ children, className }) {
  const customClassName = classNames(
    style['markdown-container'],
    'markdown-container',
    className
  );

  return (
    <RichText className={customClassName}>
      <ReactMarkdown
        linkTarget="_blank"
        components={{
          p: renderParagraph,
          code: renderCode,
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

Markdown.defaultProps = {
  children: null,
  className: null,
};

export default Markdown;
