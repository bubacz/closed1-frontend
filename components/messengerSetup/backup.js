<Query query={GET_LIST}>
{({ error, loading, data }) => {
  const info = data.me;
  return info.conversations.map((conversation) => (
    <Query query={GET_CONVERSATIONS_QUERY} variables={conversation}>
      {({ error, loading, data }) => {
        const conversation = data.conversation;
        const friend = conversation.participants.filter(obj => {
          return obj.id !== info.id;
        });
          return (
          <Query query={OTHER_USER_QUERY} variables={friend[0]}>
            {({ error, loading, data }) => {
              const merged = {...conversation, ...data.userprof };

              console.log('final layer data', merged);
              return <Messenger user= {this.props.user} conversations = {merged} />;
            }}
          </Query>
        );
      }}
    </Query>
  ));
}}
</Query>;
















return (
    <Query query={GET_LIST}>
    {({ error, loading, data }) => {
      const info = data.me;
      let convos = [];
      return info.conversations.map((conversation) => (
        <Query query={GET_CONVERSATIONS_QUERY} variables={conversation}>
          {({ error, loading, data }) => {
            const conversation = data.conversation;
            const friend = conversation.participants.filter(obj => {
              return obj.id !== info.id;
            });
              return (
              <Query query={OTHER_USER_QUERY} variables={friend[0]}>
                {({ error, loading, data }) => {
                  const merged = {...conversation, ...data.userprof };
                  convos.push(merged);
                  console.log('convos', convos);
                  return <Messenger conversations = {convos} />;
                }}
              </Query>
            );
          }}
        </Query>
      ));
    }}
    </Query>
   )