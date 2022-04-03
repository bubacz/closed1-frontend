import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import ConnectionRequests from "./Connections/ConnectionRequests";
import FindNew from "./FindNew";
import InviteFriend from "./InviteFriend";
import Friends from "./Friends";
import { Query } from "react-apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "./LoadingSpinner";
import { faUserFriends, faBell, faSearchPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";

const Stages = styled.div`
	width: 800px;
	max-width: 100%;
	margin: auto;
	.header {
		display: flex;

		a {
			display: flex;
			flex: 0 0 25%;
			justify-content: center;
			align-items: center;
			padding: 1rem;
			border: solid 1px;
			font-size: 1.8rem;
			cursor: pointer;
			gap: 0.5rem;

			:hover {
				background: ${props => props.theme.lightgreen};
				color: white;
			}

			&.active {
				border-color: ${props => props.theme.green};
			}

			@media (max-width: 768px) {
				flex-direction: column;
				height: 100%;

				.button-text {
					display: none;
				}
			}
		}
	}

	.active {
		background-color: ${props => props.theme.green};
		color: white;
		border-color: ${props => props.theme.lightgreen};
		min-width: 200fpx;
		height: 6.2rem;
	}

	.notification-badge {
		position: absolute;
		top: 5px;
		font-size: 15px;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background: #ffdd22;
		color: #26a69a;
		z-index: 2;
	}
`;

const GET_USER_DATA_QUERY = gql`
	query {
		me {
			id
			name
			email
			profilePic
			conversations {
				id
				participants {
					id
				}
			}
			friends {
				id
				name
				title
				company
				profilePic
			}
			sent {
				id
			}
			received {
				id
				name
				title
				profilePic
			}
		}
	}
`;
class MultiStage extends Component {
	state = {
		id: "1"
	};

	componentDidMount() {}

	handleClick = e => {
		e.preventDefault();
		this.setState({ id: e.target.id });
	};

	fetchComponent = me => {
		const { id } = this.state;
		// const list ={hidden:{scale:.8, opacity:0}, visible:{ scale:1, opacity:1, transition:{delay:.5}}};
		switch (id) {
			case "1":
				return <Friends friendsList={me.friends} user={me} />;
			case "2":
				return <ConnectionRequests user={me} />;
			case "3":
				return <FindNew currentUser={me} />;
			case "4":
				return <InviteFriend />;
			default:
				return null;
		}
	};
	render() {
		const { id } = this.state;
		return (
			<Query query={GET_USER_DATA_QUERY} fetchPolicy="cache-and-network">
				{({ error, loading, data }) => {
					if (loading) return <LoadingSpinner />;
					if (data)
						return (
							<Stages data-aos="fade-up">
								<div className="header">
									<a id="1" onClick={this.handleClick} className={id === "1" ? "active" : ""}>
										<FontAwesomeIcon icon={faUserFriends} />
										<span className="button-text">Friends</span>
									</a>
									<a id="2" onClick={this.handleClick} className={id === "2" ? "active" : ""}>
										<FontAwesomeIcon icon={faBell} />
										<span className="button-text">Requests</span>
										{data.me.received.length > 0 ? (
											<span className="notification-badge">{data.me.received.length}</span>
										) : (
											""
										)}
									</a>
									<a id="3" onClick={this.handleClick} className={id === "3" ? "active" : ""}>
										<FontAwesomeIcon icon={faSearchPlus} />
										<span className="button-text">Find New</span>
									</a>
									<a id="4" onClick={this.handleClick} className={id === "4" ? "active" : ""}>
										<FontAwesomeIcon icon={faUserPlus} />
										<span className="button-text">Invite Friends</span>
									</a>
								</div>
								<div className="content-section">
									<AnimatePresence>
										<>{this.fetchComponent(data.me)}</>
									</AnimatePresence>
								</div>
							</Stages>
						);
				}}
			</Query>
		);
	}
}

export default MultiStage;
