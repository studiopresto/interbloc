import Link from 'next/link';



export default function FourOhFour() {
	return (
		<>
			<h1>404</h1>
			<br/>
			<Link href="/">
				<a>Go back home</a>
			</Link>
		</>
	)
}