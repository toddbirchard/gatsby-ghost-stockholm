export const authorTwitterAccounts = `{
  allGhostAuthor(filter: {twitter: {ne: null}}) {
    edges {
      node {
        slug
        twitter
      }
    }
  }
}`;

export const authorWebsites = `{
  allGhostAuthor(filter: {website: {ne: null}}) {
    edges {
      node {
        slug
        website
      }
    }
  }
}`;
