import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';

import RichText from 'components/rich-text';

import style from './style.module.css';

function Markdown({ children, className }) {
  const customClassName = classNames(
    style['markdown-container'],
    'markdown-container',
    className
  );

  return (
    <RichText className={customClassName}>
      <ReactMarkdown linkTarget="_blank">{children}</ReactMarkdown>
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
