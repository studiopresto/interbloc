import SearchForm from "~components/SearchForm";

export default function Header() {
	return (
		<header className="header">
			<div className="header-panel">
				<div className="header-panel-search">
					<SearchForm/>
				</div>
				<div className="header-panel-action">

				</div>
			</div>
		</header>
	)
}