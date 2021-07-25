import styled from 'styled-components';

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
  a {
    background: #fff;
    color: ${(props) => props.theme.green};
    display: inline;
    font-weight: 400;
  }
`;

export default Title;
