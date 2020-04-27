import styled, { css } from "styled-components"

export const Root = styled.div`
  position: relative;
  display: block;
  grid-gap: 1em;
`

const focus = css`
  background: white;
  cursor: text;
  width: 5em;
`

const collapse = css`
  width: 0;
  cursor: pointer;
  ${props => props.focus && focus}
  margin-left: ${props => (props.focus ? `-1.6em` : `-1em`)};
  padding-left: ${props => (props.focus ? `1.6em` : `1em`)};
  ::placeholder {
  }
`

const expand = css`
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
`

export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  {highlight-next-line}
  ${props => (props.collapse ? collapse : expand)};
`

export const InputContainer = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
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
  > * + * {
    padding-top: 1em !important;
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
  }
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  mark {
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: white;
      padding: 0.1em 0.4em;
    }
  }
  h3 {
    margin: 0 0 0.5em;
  }
  h4 {
    margin-bottom: 0.3em;
  }
`
