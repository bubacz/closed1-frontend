import Link from 'next/link';
import styled from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import Nav from './Nav';
import Close from '../Assets/closed_logo.png';
import AutoComplete from './Search';
import User from "./User";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const StyledHeader = styled.header`
  .bar {
    background: ${props => props.theme.green};
    line-height: 1;
    @media (max-width: 1300px) {
      justify-content: center;
    }
  }
  .sub-bar {
    display: flex;
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

const Header = (props) => (
  <User>
    {({ data }) => {
      const me = data ? data.me : null;
      return <StyledHeader>
        <div className="bar navbar">
          <Link href="/posts">
            <img className="photo" src={Close} />
          </Link>
          {me && 
          <div className="sub-bar">
            <AutoComplete />
          </div> 
          }
          <Nav user={me} />
        </div>
        
      </StyledHeader>
    }}
  </User>
);

export default Header;
