import PleaseSignIn from "../components/PleaseSignIn";
import MainSearch from "../components/SearchResultsPage/mainSearch";

const searchResults = (props) => (
    <PleaseSignIn>
        <MainSearch searchTerm={props.query.searchTerm} />
    </PleaseSignIn>
  );

export default searchResults;