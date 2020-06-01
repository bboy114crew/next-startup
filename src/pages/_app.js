import App from "next/app";
import { END } from "redux-saga";
import { wrapper } from "src/redux/store";

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };

    if (ctx.req) {
      console.log('Saga is executing on server, we will wait');
      ctx.store.dispatch(END);
      await ctx.store.sagaTask.toPromise();
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(CustomApp);
