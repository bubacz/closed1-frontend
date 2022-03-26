import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserFriends,
    faUsers,
    faMailBulk,
    faAddressBook,
} from "@fortawesome/free-solid-svg-icons";

const VerticalTabs = styled.div`
    background: white;
    padding: 2rem;
    text-align: center;
`;

const Switch = styled.div`
  border: 1px solid;
  border-radius: 10px;
  font-size: 20px;
  margin: 10px;
  text-align: left;
  padding-left: 30%;
  &:hover{
      cursor: pointer;
      color: white;
      background:${props => props.theme.green}
  }
  &.active{
    color: white;
    background:${props => props.theme.green}
  }
`;

const SwitchResults = (props) => {
    const { current, switchTo } = props;
    return <VerticalTabs>
        <h2>Search Results</h2>
        <hr />
        <h3>Filters</h3>
        <Switch
            className={current === "1" ? 'active' : ''}
            onClick={() => switchTo("1")}>
            <FontAwesomeIcon icon={faUsers} /> People
        </Switch>
        <Switch
            className={current === "2" ? 'active' : ''}
            onClick={() => switchTo("2")}>
            <FontAwesomeIcon icon={faMailBulk} /> Feed
        </Switch>
        <Switch
            className={current === "3" ? 'active' : ''}
            onClick={() => switchTo("3")}>
            <FontAwesomeIcon icon={faAddressBook} /> Rolodex
        </Switch>
        <Switch
            className={current === "4" ? 'active' : ''}
            onClick={() => switchTo("4")}>
            <FontAwesomeIcon icon={faUserFriends} /> Friends
        </Switch>
    </VerticalTabs>
}

export default SwitchResults;