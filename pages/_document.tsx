import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta content="BrandU" property="og:title" />
          <meta content="https://brandu.shop/" property="og:url" />
          <meta content="당신을 위한 친환경 브랜딩" property="og:description" />
          <meta content="/images/logo.png" property="og:image" />
        </Head>
        <body className="bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
