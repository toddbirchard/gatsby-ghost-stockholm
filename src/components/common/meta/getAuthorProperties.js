import _ from 'lodash';
import PropTypes from 'prop-types';
import { twitter, facebook } from '@tryghost/social-urls';

export const getAuthorProperties = (primaryAuthor) => {
  let authorProfiles = [];

  authorProfiles.push(
    primaryAuthor.website && primaryAuthor.website,
    primaryAuthor.twitter && twitter(primaryAuthor.twitter),
    primaryAuthor.facebook && facebook(primaryAuthor.facebook),
  );

  authorProfiles = _.compact(authorProfiles);

  return {
    name: primaryAuthor.name || null,
    sameAsArray: authorProfiles.length
      ? `["${_.join(authorProfiles, `", "`)}"]`
      : null,
    image: primaryAuthor.profile_image || null,
    facebookUrl: primaryAuthor.facebook && primaryAuthor.facebook,
    twitterUrl: primaryAuthor.twitter && primaryAuthor.twitter,
  };
};

getAuthorProperties.defaultProps = {
  fetchAuthorData: false,
};

getAuthorProperties.PropTypes = {
  primaryAuthor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profile_image: PropTypes.string,
    website: PropTypes.string,
    twitter: PropTypes.string,
    facebook: PropTypes.string,
  }).isRequired,
};

export default getAuthorProperties;
