const getTimeStampUtil = (timeStamp) => {
    const localDate = new Date(timeStamp).toLocaleString();
    return localDate;
  };

const getTimeSince = (utcDate) =>{
    const timeStamp = new Date(utcDate);
    const now = new Date();
    const secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if (secondsPast < 60) {
      return parseInt(secondsPast) + ' seconds ago';
    }
    if (secondsPast < 3600) {
      return parseInt(secondsPast / 60) + ' mins ago';
    }
    if (secondsPast <= 86400) {
      return parseInt(secondsPast / 3600) + ' hours ago';
    }
    if (secondsPast > 86400) {
      const day = timeStamp.getDate();
      const month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
      const year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
      return 'on '+ day + " " + month + year;
    }
  }

  const getTimeSinceComment = (utcDate) =>{
    const timeStamp = new Date(utcDate);
    const now = new Date();
    const secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if (secondsPast < 60) {
      return parseInt(secondsPast) + ' s';
    }
    if (secondsPast < 3600) {
      return parseInt(secondsPast / 60) + ' m';
    }
    if (secondsPast <= 86400) {
      return parseInt(secondsPast / 3600) + ' h';
    }
    if (secondsPast > 86400) {
      const day = timeStamp.getDate();
      const month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
      const year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
      return  day + " " + month + year;
    }
  }
  
  const getTimeSinceLastMesssage = (utcDate) =>{
    const timeStamp = new Date(utcDate);
    const now = new Date();
    const secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if (secondsPast > 86400) {
      return true;
    }
    return false;
  }

  const sortByRecentPosts = (posts) =>{
   const sortedposts = posts.sort((a,b) =>{
      return b.createdAt.localeCompare(a.createdAt);
    })
    return sortedposts;
  }

  const sortByRecentMessages = (conversations) =>{
    const sortedConversations = conversations.sort((a,b) =>{
      return b.texts.slice(-1)[0].createdAt.localeCompare(a.texts.slice(-1)[0].createdAt);
    })
     return sortedConversations;
   }

  export {
    getTimeStampUtil,
    getTimeSince,
    getTimeSinceComment,
    getTimeSinceLastMesssage,
    sortByRecentPosts,
    sortByRecentMessages,
  }