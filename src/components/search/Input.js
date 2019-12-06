import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchBox } from 'react-instantsearch-dom'

export default connectSearchBox(({ refine, ...rest }) => (
    <div>
        <SearchBox
            searchAsYouType={true}
            placeholder="Search"
            aria-label="Search"
            onChange={e => refine(e.target.value)}
            {...rest}
        />
        <FontAwesomeIcon icon={[`far`, `search`]} size="xs" />
    </div>
))
