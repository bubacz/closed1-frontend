import React from "react";
import { Query } from "react-apollo";
import Head from "next/head";
import Link from "next/link";
import PaginationStyles from "../styles/PaginationStyles";
import { perPage } from "../../config";
import LoadingSpinner from "../LoadingSpinner";


const Pagination = (props) => (
  <Query query={props.query} fetchPolicy="cache-and-network">
    {({ data, loading, error }) => {
      if (loading) return <LoadingSpinner />;
      const connections = data[props.values] || {
        aggregate: { count: 0 },
      };
      const count = connections.aggregate.count;
      const pages = Math.ceil(count / perPage) || 1;
      const page = props.page;
      return (
        <PaginationStyles data-test="pagination">
          <Head>
            <title>
              Closed1 — Page {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathname: props.pathName,
              query: { page: page - 1 },
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              ← Prev
            </a>
          </Link>
          <p>
            Page {props.page} of
            <span className="totalPages"> {pages}</span>
          </p>
          <p>{count} Posts Total</p>
          <Link
            prefetch
            href={{
              pathname: props.pathName,
              query: { page: page + 1 },
            }}
          >
            <a className="next" aria-disabled={page >= pages}>
              Next →
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
