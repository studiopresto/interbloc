/*
Components
 */
import SearchForm from '~components/SearchForm';
import Button from '~ui/components/Button';
import Dropdown from '~ui/components/Dropdown';
/*
Icons
 */
import CaseIcon from "~ui/icons/Case";




export default function Header() {
	return (
		<header className="header">
			<div className="header-panel">
				<div className="header-panel-search">
					<SearchForm/>
				</div>
				<div className="header-panel-action">
					<div className="header-action-item">
						<Dropdown label="USD" prefix="$"/>
					</div>
					<div className="header-action-item">
						<Dropdown label="ENG"/>
					</div>
					<div className="header-action-item">
						<Button icon color="transparent">
							<CaseIcon/>
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}