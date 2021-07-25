import styled from 'styled-components';

const Closed1Button = styled.button`
  border-radius: 5px;
  text-transform: uppercase;
  font-size: medium;
  padding: 5px;
  display: inline-block;
  transition: all 0.5s;
  font-weight: 300;

  background: #26A69A;
  color: white;
  border: 0;
  border-radius: 5px;
  margin: 0.5rem;
  text-transform: uppercase;
  font-size: medium;
  float: right;
  display: inline-block;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
  :hover {
    background: ${props => props.theme.lightgreen};
    cursor: pointer;
  }
`;

export default Closed1Button;
