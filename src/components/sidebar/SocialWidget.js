import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import {
  AiOutlineTwitter,
  AiFillMediumSquare,
  AiOutlineGithub,
  AiFillFacebook,
} from 'react-icons/ai';
import { FaDev } from 'react-icons/fa';
import { FiRss } from 'react-icons/fi';
import { BiCoffeeTogo } from 'react-icons/bi';

/**
 * Social widget
 */

const SocialWidget = ({ data }) => {
  const socialNav = data.ghostSettings.secondary_navigation;
  const icons = {
    twitter: <AiOutlineTwitter />,
    facebook: <AiFillFacebook />,
    github: <AiOutlineGithub />,
    buymeacoffee: <BiCoffeeTogo />,
    medium: <AiFillMediumSquare />,
    'dev.to': <FaDev />,
    rss: <FiRss />,
  };

  return (
    <>
      <div className="widget social">
        {socialNav.map((node) => (
          <a
            href={node.url}
            className={node.label}
            key={`${node.label}-social-link`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button aria-label={node.label}>{icons[`${node.label}`]}</button>
          </a>
        ))}
      </div>
    </>
  );
};

SocialWidget.propTypes = {
  data: PropTypes.shape({
    ghostSettings: PropTypes.shape({
      secondary_navigation: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          url: PropTypes.string.isRequired,
        }),
      ),
    }),
  }),
};

const SocialWidgetQuery = (props) => (
  <StaticQuery
    query={graphql`
      query secondaryNav {
        ghostSettings {
          secondary_navigation {
            label
            url
          }
        }
      }
    `}
    render={(data) => <SocialWidget data={data} {...props} />}
  />
);

export default SocialWidgetQuery;
