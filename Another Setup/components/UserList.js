// import Avatar from "./ui/Avatar";

export default class UserList extends React.Component {

  componentDidMount() {
    this.props.subscribeToNewUsers();
  }

  render() {
    const { loading, error, users, onClick } = this.props;

    return (
      <ul className="list-reset">
        <li className="font-bold m-4">Users</li>
        {users.map(user => (
          <li
            key={user.id}
            className="px-4 py-2 hover:bg-grey-lightest cursor-pointer flex items-center"
            onClick={e => {
              onClick(user);
            }}
          >
            <div className="text-sm flex-1">
              <div className="font-bold">{user.name}</div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
