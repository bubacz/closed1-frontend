import React from "react";
import styled from "styled-components";
import User from "../Assets/user.png";
import Router from "next/router";
import SendConnection from "./Connections/SendConnection";
import Closed1Button from "./styles/Closed1Button";
import CancelRequest from "./Connections/CancelRequest";
import RemoveFriend from "./Connections/RemoveFriend";

export const ConversationList = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	width: 800px;
	max-width: 100%;
	padding: 10px;
	border: 2px solid ${props => props.theme.lightgrey};
	border-radius: 10px;
	background: white;

  @media (max-width: 375px) {
  }

  .friend-info {
    display: flex;
    align-items: center;

    @media (max-width: 576px) {
      flex-direction: column;
    }
  }

	.conversation-list-item:hover {
		background: solid blue;
		cursor: pointer;
	}

	.conversation-photo {
		width: 70px;
		height: 70px;
		border-radius: 50%;
		object-fit: cover;
		margin-right: 10px;
	}

	.conversation-title {
		font-size: 14px;
		font-weight: bold;
		text-transform: capitalize;
		margin: 0;
		:hover {
			cursor: pointer;
			color: ${props => props.theme.green};
		}
	}

	.conversation-snippet {
		font-size: 12px;
		color: #888;
		margin: 0;
		text-overflow: initial;
		white-space: nowrap;
	}

	.connected-info {
		font-size: 10px;
	}

	.action-items {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		align-items: center;
		margin-left: auto;
		color: ${props => props.theme.green};

    @media (max-width: 375px) {
      margin: auto;
    }

    > * {
      flex-grow: 1;
      margin: 0;
    }

		.sequence-button {
			display: inline-flex;
			button {
				font-size: 14px;
			}
			width: 25%;
		}
	}
`;

export function routeToMessaging(id) {
	Router.push({
		pathname: "/messengerPage",
		query: {
			id: id
		}
	});
}

class SingleFriend extends React.Component {
	handleClick = id => {
		Router.push({
			pathname: "/userProfile",
			query: { id: id }
		});
	};

	getButtons = () => {
		const { id, data, me, isRequested } = this.props;
		const [conversation] = me.conversations
			? me.conversations.filter(conversation => {
				let participants = conversation.participants.map(a => a.id);
				if (participants.includes(data.id)) {
					return conversation.id;
				}
				return null;
			})
			: "";
		switch (id) {
			case "FindNew":
				return (
					<>
						{isRequested ? (
							<div className="sequence-button">
								<Closed1Button>Pending...</Closed1Button>
								<CancelRequest userId={data.id} />
							</div>
						) : (
							<SendConnection user={data} me={this.props.me} />
						)}
					</>
				);
			case "FriendsList":
				return (
					<>
						<Closed1Button className="btn-secondary" onClick={() => routeToMessaging(conversation?.id)}>
							Message
						</Closed1Button>
						<RemoveFriend userId={data.id} conversationId={conversation?.id} />
					</>
				);
			default:
				return null;
		}
	};

	render() {
		const user = this.props.data;
		return (
			<ConversationList>
				<div className="friend-info">
					<img className="conversation-photo" src={user.profilePic ? user.profilePic : User} />
					<div className="conversation-info">
						<h1
							className="conversation-title"
							onClick={() => {
								this.handleClick(user.id);
							}}
						>
							{user.name}
						</h1>
						{(user.title && user.company) && (
							<p className="conversation-snippet">
								{user.title} @ {user.company}
							</p>
						)}
					</div>
				</div>
				<div className="action-items">{this.getButtons()}</div>
			</ConversationList>
		);
	}
}

export default SingleFriend;
