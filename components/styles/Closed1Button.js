import styled from "styled-components";

const Closed1Button = styled.button`
	border-radius: 5px;
	text-transform: uppercase;
	font-size: medium;
	padding: 5px;
	display: inline-block;
	transition: all 0.5s;
	font-weight: 300;

	background: #26a69a;
	color: white;
	border: 1px solid ${props => props.theme.green};
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
		border: 1px solid ${props => props.theme.lightgreen};
		background: ${props => props.theme.lightgreen};
		cursor: pointer;
	}

	&.btn-secondary {
		border: 1px solid ${props => props.theme.green};
		color: ${props => props.theme.green};
		background: none;

		:hover {
			border: 1px solid ${props => props.theme.lightgreen};
			color: white;
			background: ${props => props.theme.lightgreen};
		}
	}
`;

export default Closed1Button;
