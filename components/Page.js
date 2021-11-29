import React, { Component } from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import Header from "./Header";
import Meta from "./Meta";
import AOS from "aos";
import { AnimatePresence } from "framer-motion";

const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  green: "#26A69A",
  lightgreen: "#69ddd1",
  orange: "#e3b504",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
};

const StyledPage = styled.div`
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
  @font-face {
    font-family: Arial, sans-serif;
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: Arial, sans-serif;
    background-color: #eee;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: Arial, sans-serif; }


/* Positioning, Sizing, Borders */
  .w-100 {width:100%!important}
  .h-100 {width:100%!important}
  .m-0{margin:0!important}.mt-0{margin-top:0!important}.mb-0{margin-bottom:0!important}.mx-0{margin-left:0!important;margin-right:0!important}.my-0{margin-top:0!important;margin-bottom:0!important}
  .p-0{padding:0!important}.pt-0{padding-top:0!important}.pb-0{padding-bottom:0!important}.px-0{padding-left:0!important;padding-right:0!important}.py-0{padding-top:0!important;padding-bottom:0!important}
  .border-0{border:0!important}.border-top-0{border-top:0!important}.border-bottom-0{border-bottom:0!important}.border-left-0{border-left:0!important}.border-right-0{border-right:0!important}


/* Text Formatting */
  .text-primary{color: ${theme.green} !important}
  .text-light{color:#fff!important}
  .text-secondary {color: ${theme.black} !important}
  .font-weight-black{font-weight:900!important}
  .font-weight-bold{font-weight:600!important}
  .font-weight-normal{font-weight:300!important}


/* Forms + Buttons */
  .form-control {
    display: block;
    width: 100%;
    padding: 1rem 1.25rem;
    font-size: medium;
    font-family: Arial, sans-serif;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-bottom: 1rem;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .5rem;
    margin: 0.5rem;
    text-transform: uppercase;
    font-size: medium;
    padding: 0.5rem 1.5rem;
    transition: all 0.5s;
    line-height: 1.5;
    :hover {
      cursor: pointer;
    }
  }
  a:hover{
    color: ${theme.green};
    text-decoration: underline;
  }

  .btn-primary {
    background-color: ${theme.green};
    color: #fff;
    border: solid ${theme.green} 1px;

    :hover {
      color: #fff;
      background-color: ${theme.lightgreen};
      border-color: ${theme.lightgreen};
    }
  }

  .btn-light {
    background-color: #fff;
    color: ${theme.green};
    border: solid ${theme.green} 1px;

    :hover {
      color: ${theme.lightgreen};
      background-color: #fff;
      border-color: ${theme.lightgreen};
    }
  }


/* Display */
  .d-none { display: none !important; }
  .d-inline { display: inline !important; }
  .d-inline-block { display: inline-block !important; }
  .d-block { display: block !important; }
  .d-flex { display: flex !important; }
  .d-grid { display: grid !important; }

  @media (min-width: 576px) {
    .d-sm-none { display: none !important; }
    .d-sm-inline { display: inline !important; }
    .d-sm-inline-block { display: inline-block !important; }
    .d-sm-block { display: block !important; }
    .d-sm-flex { display: flex !important; }
    .d-sm-grid { display: grid !important; }
  }

  @media (min-width: 768px) {
    .d-md-none { display: none !important; }
    .d-md-inline { display: inline !important; }
    .d-md-inline-block { display: inline-block !important; }
    .d-md-block { display: block !important; }
    .d-md-flex { display: flex !important; }
    .d-md-grid { display: grid !important; }
  }

  @media (min-width: 992px) {
    .d-lg-none { display: none !important; }
    .d-lg-inline { display: inline !important; }
    .d-lg-inline-block { display: inline-block !important; }
    .d-lg-block { display: block !important; }
    .d-lg-flex { display: flex !important; }
    .d-lg-grid { display: grid !important; }
  }

  @media (min-width: 1200px) {
    .d-xl-none { display: none !important; }
    .d-xl-inline { display: inline !important; }
    .d-xl-inline-block { display: inline-block !important; }
    .d-xl-block { display: block !important; }
    .d-xl-flex { display: flex !important; }
    .d-xl-grid { display: grid !important; }
  }


/* Grid Components */
  .grid-template {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
  }
    @media (min-width : 768px) {
      .grid-template { 
        grid-template-columns: 1fr 2fr;
        column-gap: 1rem;
      }
    }

  .grid-template-columns-1 { grid-template-columns: 1fr; }
  .grid-template-columns-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-template-columns-3 { grid-template-columns: repeat(3, 1fr); }
    @media (min-width: 576px) {
      .grid-sm-template-columns-1 { grid-column: 1; }
      .grid-sm-template-columns-2 { grid-template-columns: repeat(2, 1fr); }
      .grid-sm-template-columns-3 { grid-template-columns: repeat(3, 1fr); }
    }
    @media (min-width: 768px) {
      .grid-md-template-columns-1 { grid-column: 1; }
      .grid-md-template-columns-2 { grid-template-columns: repeat(2, 1fr); }
      .grid-md-template-columns-3 { grid-template-columns: repeat(3, 1fr); }
    }
    @media (min-width: 992px) {
      .grid-lg-template-columns-1 { grid-column: 1; }
      .grid-lg-template-columns-2 { grid-template-columns: repeat(2, 1fr); }
      .grid-lg-template-columns-3 { grid-template-columns: repeat(3, 1fr); }
    }
    @media (min-width: 1200px) {
      .grid-xl-template-columns-1 { grid-column: 1; }
      .grid-xl-template-columns-2 { grid-template-columns: repeat(2, 1fr); }
      .grid-xl-template-columns-3 { grid-template-columns: repeat(3, 1fr); }
    }

  .grid-col-1 { grid-column: 1; }
  .grid-col-2 { grid-column: 1 / span 2; }
  .grid-col-3 { grid-column: 1 / span 3; }
  .grid-row-1 { grid-row: 1; }
  .grid-row-2 { grid-row: 1 / span 2;}
  .grid-row-3 { grid-row: 1 / span 3; }
    @media (min-width: 576px) {
      .grid-sm-col-1 { grid-column: 1; }
      .grid-sm-col-2 { grid-column: 1 / span 2;}
      .grid-sm-col-3 { grid-column: 1 / span 3; }
      .grid-sm-row-2 { grid-row: 1 / span 2;}
      .grid-sm-row-3 { grid-row: 1 / span 3; }
    }
    @media (min-width: 768px) {
      .grid-md-col-1 { grid-column: 1; }
      .grid-md-col-2 { grid-column: 1 / span 2;}
      .grid-md-col-3 { grid-column: 1 / span 3; }
      .grid-md-row-2 { grid-row: 1 / span 2;}
      .grid-md-row-3 { grid-row: 1 / span 3; }
    }
    @media (min-width: 992px) {
      .grid-lg-col-1 { grid-column: 1; }
      .grid-lg-col-2 { grid-column: 1 / span 2;}
      .grid-lg-col-3 { grid-column: 1 / span 3; }
      .grid-lg-row-2 { grid-row: 1 / span 2;}
      .grid-lg-row-3 { grid-row: 1 / span 3; }
    }
    @media (min-width: 1200px) {
      .grid-xl-col-1 { grid-column: 1; }
      .grid-xl-col-2 { grid-column: 1 / span 2;}
      .grid-xl-col-3 { grid-column: 1 / span 3; }
      .grid-xl-row-2 { grid-row: 1 / span 2;}
      .grid-xl-row-3 { grid-row: 1 / span 3; }
    }


/* Flex Components */
  .flex-column {
    flex-direction: column !important;
  }

  .col-autofill {
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
  }
  
  .justify-content-between {
    justify-content: space-between !important;
  }

  .flex-single-column {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

    @media (min-width : 768px) {
      .flex-single-column {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }

  
/* Card Component */
  .card {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 1rem;
  }
  
  .card-header,
  .card-body,
  .card-footer {
    background-clip: content-box;
  }
  
  .card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 2rem;
  }
  
  .card-title {
    margin-bottom: 0.75rem;
  }
  
  .card-header {
    padding: 2rem;
  }
  
  .card-footer {
    padding: 0.75rem 1.25rem;
  }

  
/* Navbar Component */
  .navbar {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }
  
  .navbar > .container,
  .navbar > .container-fluid {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  .pg-viewer-wrapper .document-container {
    width: 1150px !important;
  }
  `;


class Page extends Component {

  componentDidMount() {
    AOS.init({
      duration: 2000,
    });
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage data-aos="fade-up">
          <Meta />
          <Header pageName={this.props.children.key}/>
          <AnimatePresence>
            <Inner style={{maxWidth: this.props.children.key === '/messengerPage' ? null : '1200px'}}>
            {this.props.children}
            </Inner>
            </AnimatePresence>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
