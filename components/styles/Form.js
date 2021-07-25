import styled, { keyframes } from "styled-components";

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
   {
    label {
      display: block;
      margin-bottom: 1rem;
    }
    input,
    textarea,
    select {
      width: 100%;
      padding: 0.8rem;
      font-size: 2.2rem;
      border: 2px solid black;
      &:focus {
        outline: 0;
        border-color: ${(props) => props.theme.green};
      }

      &[disabled] {
        opacity: 0.2;
      }

      border-radius: 0.4em;
    }
    input[type="submit"] {
      width: auto;
      background: ${(props) => props.theme.green};
      color: white;
      border: 0;
      font-size: medium;
      margin: 0.3rem;
    }

    input[type="checkbox"] {
      width: 20px;
      height: 20px;
    }


    button {border-radius: 5px;
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
    }
    fieldset {
      border: 0;
      padding: 0;

      &[disabled] {
        opacity: 0.5;
      }
      &::before {
        height: 0px;
        content: "";
        display: block;
        background-image: linear-gradient(
          to right,
          ${(props) => props.theme.green} 0%,
          ${(props) => props.theme.lightgreen} 50%,
          ${(props) => props.theme.green} 100%
        );
      }
      &[aria-busy="true"]::before {
        background-size: 50% auto;
        animation: ${loading} 0.5s linear infinite;
      }
    }

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

    .btn-primary {
      background-color: ${(props) => props.theme.green};
      border: solid ${(props) => props.theme.green} 1px;

      :hover {
        border-color: ${props => props.theme.lightgreen};
      }
    }

    .btn-light {
      background-color: #fff;
      border: solid ${(props) => props.theme.green} 1px;
      color: ${(props) => props.theme.green};

      :hover {
        color: #fff;
        border-color: ${props => props.theme.lightgreen};
      }
    }

  }
`;

export default Form;
