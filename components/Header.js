import Link from 'next/link';
import styled from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import Nav from './Nav';
import Close from '../Assets/closed_logo.png';
import AutoComplete from './Search';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.green};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    background: ${props => props.theme.green};
    line-height: 1;
    @media (max-width: 1300px) {
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
  .photo {
    padding: 5px 10px;
    height: 50px;
    :hover {
      cursor: pointer;
    }
}
`;


const Header = () => (
  <StyledHeader>
    <div className="bar navbar">
      <Link href="/posts">
      <img className="photo" src={Close} />
      </Link>
      <Nav />
    </div>
    <div className="sub-bar">
      <AutoComplete />
    </div>
  </StyledHeader>
);

export default Header;
