import React from 'react';
import PropTypes from 'prop-types';

import { useLang, get } from './utils/use-lang';

const SubscribeButton = ({ overlay }) => {
  const text = get(useLang());

  return (
    <React.Fragment>
      {overlay && (
        <button className="subscribe-button" onClick={overlay.handleOpen}>
          {text(`SUBSCRIBE`)}
        </button>
      )}
    </React.Fragment>
  );
};

SubscribeButton.propTypes = {
  overlay: PropTypes.object,
};

export default SubscribeButton;
