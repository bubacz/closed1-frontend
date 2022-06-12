import styled from "styled-components";

const NavStyles = styled.ul`
	display: flex;
	margin: 0;
	padding: 0;
	overflow-x: auto;
	font-size: 1.5rem;
	font-family: Arial, sans-serif;
	justify-self: end;
	> * {
		flex: 0 0 auto;
	}
	a {
		svg {
			width: 25px !important;
			height: 25px;
		}
	}
	a,
	button {
		padding: 0.5rem 3rem;
		display: grid;
		align-items: center;
		position: relative;
		text-transform: uppercase;
		font-size: 0.8em;
		background: none;
		border: 0;
		cursor: pointer;
		color: white;
		justify-items: center !important;
    gap: 3px;
		@media (max-width: 700px) {
			&:not(.dropdown-item) {
				padding: 0;
			}
		}
		&:before {
			content: "";
			width: 2px;
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			bottom: 0;
		}
		&:after {
			height: 2px;
			background: ${props => props.theme.green};
			content: "";
			width: 0;
			position: absolute;
			transform: translateX(-50%);
			transition: width 0.4s;
			transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
			left: 50%;
			margin-top: 2rem;
		}
		&:hover,
		&:focus {
			outline: none;
			color: ${props => props.theme.lightgrey};
			// &:after {
			//   width: calc(100% - 100px);
			// }
		}
	}
	@media (max-width: 1300px) {
		justify-content: space-around;
		width: 100%;
		font-size: 1.5rem;
	}
	.notification-badge {
		position: absolute;
		top: 5px;
		right: 2px;
		padding: 4px 8px;
		border-radius: 50%;
		background: #e3b504;
		color: #26a69a;
	}
`;

export default NavStyles;
