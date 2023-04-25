import Header from 'components/Header';
import VerticalNav from 'components/VerticalNav';

export default function Layout({ children }) {
	return (
		<main id="wrapper">
			<div className="wrapper-layout">
				<div className="wrapper-layout-sidebar">
					<VerticalNav/>
				</div>
				<div className="wrapper-layout-body" onTouchEnd={e => console.log('move ', e.targetTouches)}>
					<Header/>
					{children}
				</div>
			</div>
		</main>
	)
}