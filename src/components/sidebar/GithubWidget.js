import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
* Github widget
*/

const GithubWidget = ({ data }) => {
  const githubOrg = data.githubOrganization
  const githubRepos = data.githubOrganization.itemShowcase.items.edges

  return (
    <>
      <div className="widget github">
        <div className="github-header">
          <FontAwesomeIcon icon={[`fab`, `github`]} size="xs" className="github-avatar" />
          <div className="profile-details">
            <a href={githubOrg.url} className="github-name" target="_blank" rel="noopener noreferrer">{`@${githubOrg.login}`}</a>
            <div className="github-org-meta">
              <div className="meta-item"><FontAwesomeIcon icon={[`fad`, `users`]} size="xs" /> {githubOrg.membersWithRole.totalCount} Members</div>
              <div className="meta-item"><FontAwesomeIcon icon={[`fad`, `project-diagram`]} size="xs" /> {githubOrg.repositories.totalCount} Repos</div>
            </div>
          </div>
        </div>
        <div className="repos">
          {githubRepos.map(({ node }) => (
            <a href={node.url} className="github-repo" key={`${node.id}-link`} rel="nofollow noreferrer">
              <div className="repo-name">{node.name}</div>
              <div className="repo-description">{node.description.split(`: `).pop()}</div>
              <div className="repo-meta">
                <div className="repo-lang meta-item" style={{ color: node.primaryLanguage.color }}><FontAwesomeIcon icon={[`fad`, `code`]} size="xs" /> {node.primaryLanguage.name}</div>
                <div className="repo-stargazers meta-item"><FontAwesomeIcon icon={[`fad`, `star`]} size="xs" swapOpacity /> {node.stargazers.totalCount}</div>
                <div className="repo-forks meta-item"><FontAwesomeIcon icon={[`fad`, `code-branch`]} size="xs" swapOpacity /> {node.forkCount}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

GithubWidget.propTypes = {
  data: PropTypes.shape({
    githubOrganization: PropTypes.object,
  }),
}

const GithubWidgetQuery = props => (
  <StaticQuery
    query={graphql`
          query githubOrg {
            githubOrganization {
              name
              description
              url
              login
              membersWithRole{
                totalCount
              }
              repositories {
                totalCount
              }
              itemShowcase {
                items {
                  edges {
                    node {
                      id
                      description
                      name
                      forkCount
                      primaryLanguage {
                        color
                        name
                      }
                      stargazers {
                        totalCount
                      }
                      url
                    }
                  }
                }
              }
            }
          }`}
    render={data => <GithubWidget data={data} {...props} />}
  />
)

export default GithubWidgetQuery
