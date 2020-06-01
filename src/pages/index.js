import Head from "next/head";
import { useEffect } from "react";
import { loadIssues } from "src/slices/issue";
import { wrapper } from "src/store";
import { END } from "redux-saga";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadIssues());
  }, [dispatch])
  return <div className="container"></div>;
}

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   store.dispatch(loadIssues());
// });
