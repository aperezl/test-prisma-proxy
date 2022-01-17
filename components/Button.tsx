import styled from 'styled-components'

export const Button = styled.button`
  background-color: white;
  cursor: pointer;
  font-size: 1em;
  margin: 1em;
  padding: 4px 12px;
  border: 1px solid #09f;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #09f;
    color: white;
  }
`