import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { FaGithub, FaCode, FaStar, FaCodeBranch, FaProjectDiagram } from 'react-icons/fa'

/**
* Github widget
*/
/*
const GithubWidget = ({ data }) => {
  const githubOrg = data.githubOrganization
  const githubRepos = data.githubOrganization.itemShowcase.items.edges
  const githubRepoSummary = githubOrg.repositories.totalCount + ` Repos`

  return (
    <>
      <div className="widget github">
        <div className="github-header">
          <FaGithub className="github-avatar" />
          <div className="profile-details">
            <a
              href={githubOrg.url}
              className="github-name"
              target="_blank"
              rel="noopener noreferrer">
              {`@${githubOrg.login}`}
            </a>
            <div className="github-org-meta meta-item">
              <FaProjectDiagram /> <span>{githubRepoSummary}</span>
            </div>
          </div>
        </div>
        <div className="repos">
          {githubRepos.map(({ node }) => (
            <a
              href={node.url}
              className="github-repo"
              key={`${node.id}-link`}
              rel="nofollow noreferrer"
            >
              <div className="repo-name">{node.name}</div>
              <div className="repo-description">{node.description.split(`: `).pop()}</div>
              <div className="repo-meta">
                <div className="repo-lang meta-item">
                  <FaCode /> <span>{node.primaryLanguage.name}</span>
                </div>
                <div className="repo-stargazers meta-item">
                  <FaStar /> <span>{node.stargazers.totalCount}</span>
                </div>
                <div className="repo-forks meta-item">
                  <FaCodeBranch /> <span>{node.forkCount}</span>
                </div>
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
    itemShowcase: PropTypes.shape({
      items: PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.object.isRequired,
          })
        ),
      }),
    }),
    repositories: PropTypes.shape({
      totalCount: PropTypes.number,
    }),
    stargazers: PropTypes.shape({
      totalCount: PropTypes.number,
    }),
  }),
}

const GithubWidgetQuery = props => (
  <StaticQuery
    query={graphql`
          query githubOrg {
            organization(login: "hackersandslackers") {
              repositories(orderBy: {field: STARGAZERS, direction: DESC}, first: 5, privacy: PUBLIC) {
                edges {
                  node {
                    name
                    description
                    url
                    forks {
                      totalCount
                    }
                    stargazers {
                      totalCount
                    }
                    watchers {
                      totalCount
                    }
                    primaryLanguage {
                      name
                      color
                    }
                  }
                }
                totalCount
              }
            }
       }`
    }
    render={data => <GithubWidget data={data} {...props} />}
  />
)

export default GithubWidgetQuery
*/
