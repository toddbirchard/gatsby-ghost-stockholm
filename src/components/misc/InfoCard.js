import React from 'react';
import PropTypes from 'prop-types';
import { BsTag } from 'react-icons/bs';

const InfoCard = ({ tag, count }) => (
  <>
    <header className="info-card">
      <div className="info-card-wrapper">
        {tag.feature_image ? (
          <img
            data-src={tag.feature_image}
            alt={tag.name}
            className="tag-image lazyload"
          />
        ) : (
          <BsTag />
        )}
        <div className="card-details">
          <div className="page-title-card">
            <h1>
              {tag.name}
              {count && <span>{` (page ${count})`}</span>}
            </h1>
          </div>
          {tag.description ? (
            <p className="tag-description">{tag.description}</p>
          ) : null}
        </div>
      </div>
    </header>
  </>
);

InfoCard.propTypes = {
  tag: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    feature_image: PropTypes.string,
  }).isRequired,
  count: PropTypes.number,
};

export default InfoCard;
