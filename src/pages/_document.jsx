import Document, { Html, Head, Main, NextScript } from 'next/document';



class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
					<link rel="manifest" href="/favicon/site.webmanifest"/>
					<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#FFFFFF"/>

					<meta name="msapplication-TileColor" content="#FFFFFF"/>
					<meta name="theme-color" content="#151616"/>
					<meta name="msapplication-navbutton-color" content="#151616"/>
					<meta name="apple-mobile-web-app-capable" content="yes"/>
					<meta name="apple-mobile-web-app-status-bar-style" content="#151616"/>
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</Html>
		)
	}
}

export default MyDocument;