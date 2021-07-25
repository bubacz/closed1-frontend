import styled from 'styled-components';

const PaginationStyles = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  background:${props => props.theme.green};
  color: white;
  border: 1px solid ${props => props.theme.lightgrey};
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid ${props => props.theme.offWhite};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: ${props => props.theme.offWhite};
    pointer-events: none;
  }
`;

export default PaginationStyles;
