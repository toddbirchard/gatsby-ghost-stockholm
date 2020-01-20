import React, { useState } from 'react'
import { PropTypes } from 'prop-types'

import {
    InstantSearch,
    SearchBox,
    Configure,
    Hits,
    Pagination,
    SortBy,
    MenuSelect,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch'
import qs from 'qs'

import { Layout, PostCard } from '../components/common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MetaData } from '../components/common/meta'

import '../styles/pages/postarchive.less'

const DEBOUNCE_TIME = 700
const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY,
)
const createURL = state => `?${qs.stringify(state)}`
const searchStateToUrl = ({ location }, searchState) => (searchState ? `${location.pathname}${createURL(searchState)}` : ``)
const urlToSearchState = location => qs.parse(location.search.slice(1))

const PostArchive = ({ data, location, history }) => {
    const [searchState, setSearchState] = useState(urlToSearchState(location))
    const [debouncedSetState, setDebouncedSetState] = useState(null)
    const onSearchStateChange = (updatedSearchState) => {
        clearTimeout(debouncedSetState)

        setDebouncedSetState(
            setTimeout(() => {
                history.push(searchStateToUrl(updatedSearchState), updatedSearchState)
            }, DEBOUNCE_TIME)
        )

        setSearchState(updatedSearchState)
    }

    return (
        <>
            <MetaData
                data={data}
                location={location}
                description={`Search all Hackers and Slackers posts.`}
                type="website"
            />
            <Layout template="postarchive-template" hasSidebar={false}>
                <div className="postarchive-container">
                    <InstantSearch
                        searchClient={searchClient}
                        indexName={`hackers_posts_all`}
                        createURL={createURL}
                        hitsPerPage={100}
                        analytics={true}
                        searchState={searchState}
                        onSearchStateChange={onSearchStateChange}
                    >
                        <Configure query={`allPostQuery`} hitsPerPage={100} analytics={true}/>
                        <div className="search-body">
                            <div className="postarchive-header">
                                <h1>All Posts</h1>
                                <div className="searchbar-container">
                                    <SearchBox className="searchbox"
                                        placeholder="Search"
                                        showLoadingIndicator={true}
                                    />
                                    <FontAwesomeIcon icon={[`fad`, `search`]} size="xs" />
                                </div>
                                <div className="search-bar-container">
                                    <MenuSelect
                                        attribute="tags.name"
                                        limit={40}
                                        defaultRefinement=""
                                        placeholder="Filter by tag"
                                    />
                                    <MenuSelect
                                        attribute="primary_author.name"
                                        defaultRefinement=""
                                        placeholder="Filter by author"
                                    />
                                    <SortBy
                                        items={[
                                            { value: `hackers_posts_all`, label: `Relevance` },
                                            { value: `hackers_posts_all_published_at_desc`, label: `Published (desc)` },
                                            { value: `hackers_posts_all_published_at_asc`, label: `Published (asc)` },
                                        ]}
                                        defaultRefinement="hackers_posts_all"
                                    />
                                </div>
                            </div>
                            <Hits hitComponent={Hit} />
                            <Pagination showFirst={false} />
                        </div>
                    </InstantSearch>
                </div>
            </Layout>
        </>
    )
}

const Hit = ({ hit }) => (
    <PostCard post={hit} key={hit.objectID}/>
)

Hit.propTypes = {
    hit: PropTypes.object.isRequired,
}

PostArchive.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
    location: PropTypes.object.isRequired,
    data: PropTypes.shape({
        ghostPage: PropTypes.object.isRequired,
    }).isRequired,
}

export default PostArchive
