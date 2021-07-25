import { Search } from "../components/MessengerStyles";
export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  render() {
    return (
      <Search>
        <input
          type="search"
          className="form-control"
          placeholder="Search..."
          onChange={(e) => {
            const { value } = e.target;
            this.setState({ input: value });
            this.props.onChange(value);
          }}
          value={this.state.input}
        />
      </Search>
    );
  }
}
