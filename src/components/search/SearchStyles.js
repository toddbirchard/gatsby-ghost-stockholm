import styled from "styled-components"

export const Root = styled.div`
  position: relative;
  display: block;
  grid-gap: 1em;
`

export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  max-height: 80vh;
  border: 1px solid #dcdcdc;
  overflow: hidden;
  padding: 20px !important;
  z-index: 2;
  position: absolute;
  right: 0;
  top: calc(100% + 0.1em);
  width: 350px;
  background: white;
`
