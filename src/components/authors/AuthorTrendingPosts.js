import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FaChartLine } from 'react-icons/fa';
import config from '../../utils/siteConfig';

const AuthorTrendingPosts = ({ authorData }) => {
  const topPages = authorData.authorTrendingPosts.edges;

  return (
    <div className="widget trending">
      <div className="widget-header">
        <div className="label trending">
          <FaChartLine /> <span>Trending</span>
        </div>
        <div className="trend-type">Top Posts This Month</div>
      </div>
      <div className="widget-content">
        {topPages.map(({ node }) => (
          <Link
            to={`${node.url.split(config.siteUrl).pop()}`}
            className="link"
            key={node.title}
          >{`${node.title.split(` | `)[0].split(` - `)[0]}`}</Link>
        ))}
      </div>
    </div>
  );
};

AuthorTrendingPosts.propTypes = {
  authorData: PropTypes.shape({
    authorTrendingPosts: PropTypes.object.isRequired,
  }).isRequired,
};

export default AuthorTrendingPosts;
