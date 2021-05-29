import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';

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
