import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { useLang, get } from './utils/use-lang';
import { SubscribeForm } from '.';

const Subscribe = ({ data }) => {
  const site = data.ghostSettings;
  const cmsUrl = site.url;

  const text = get(useLang());

  return (
    <React.Fragment>
      <h4 className="widget-title">{text(`SUBSCRIBE`)}</h4>
      <p className="widget-description">{text(`SUBSCRIBE_SECTION`)}</p>
      <SubscribeForm url={cmsUrl} text={text} />
    </React.Fragment>
  );
};

Subscribe.propTypes = {
  data: PropTypes.shape({
    ghostSettings: PropTypes.object.isRequired,
  }).isRequired,
};

const SubscribeQuery = (props) => (
  <StaticQuery
    query={graphql`
      query GhostSettingsForSubscribe {
        ghostSettings {
          url
          title
        }
      }
    `}
    render={(data) => <Subscribe data={data} {...props} />}
  />
);

export default SubscribeQuery;
