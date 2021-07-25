const canViewPost = (myUser, ownerUser) => {
  const myId = myUser.id;
  const ownerId = ownerUser.id;
  const myFriendIds = myUser.friends.map(frnd => frnd.id);
  const ownerFriendIds = ownerUser.friends.map(frnd => frnd.id);
  return isMutualFriend(myId, ownerId, myFriendIds, ownerFriendIds) || isOwner(myId, ownerId);
};

const canUpdatePost = (myUser, ownerUser) => {
  const myId = myUser.id;
  const ownerId = ownerUser.id;
  return isOwner(myId, ownerId);
};

const canComment = (myUser, ownerUser) => {
  const myId = myUser.id;
  const ownerId = ownerUser.id;
  const myFriendIds = myUser.friends.map(frnd => frnd.id);
  const ownerFriendIds = ownerUser.friends.map(frnd => frnd.id);
  return isMutualFriend(myId, ownerId, myFriendIds, ownerFriendIds) || isFriend(myId, ownerFriendIds) || isOwner(myId, ownerId);
};

const isMutualFriend = (id1, id2, friendIdList1, friendIdList2) => {
  return isFriend(id1, friendIdList2) && isFriend(id2, friendIdList1);
};

const isFriend = (id, friendIdList) => {
  return friendIdList.includes(id);
};

const isOwner = (id1, id2) => {
  return id1 === id2;
};

export {
  canViewPost,
  canUpdatePost,
  canComment,
  isMutualFriend,
  isFriend,
  isOwner,
};