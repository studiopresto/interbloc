import VerticalNav from '~components/VerticalNav';
import Header from "~components/Header";



export default function Layout({ children }) {
	return (
		<main id="wrapper">
			<div className="wrapper-layout">
				<div className="wrapper-layout-sidebar">
					<VerticalNav/>
				</div>
				<div className="wrapper-layout-body">
					<Header/>
					{children}
				</div>
			</div>
		</main>
	)
}