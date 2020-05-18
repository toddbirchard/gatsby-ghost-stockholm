import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { FaTag } from 'react-icons/fa'


const InfoCard = ({ tag, count }) => {

return (
  <>
    <header className="info-card">
      <div className="info-card-wrapper">
        {tag.feature_image
          ? <img src={tag.feature_image} alt={tag.name} className="tag-image" />
          : <FaTag />}
        <div>
          <div className="page-title-card">
            <h1>{tag.name}{count && <span>{` (page ${count})`}</span>}</h1>
          </div>
          {tag.description ? <p className="tag-description">{tag.description}</p> : null }
      </div>
    </div>
    </header>
  </>
  )
}

export default InfoCard
