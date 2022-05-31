import dynamic from 'next/dynamic';
import {data} from './data';
/*
Components
 */
import Preloader from '~ui/components/Preloader';
/*
Icons
 */
import EyeIcon from '~ui/icons/Eye';
/*
Lazy components
 */
const GovernanceChart = dynamic(async () => {
	return await import('~components/GovernanceChart');
}, { ssr: false, loading: () => <Preloader/> });
const GovernanceList = dynamic(async () => {
	return await import('~routes/Governance/List');
}, { ssr: false, loading: () => <Preloader/> });



export default function GovernancePage() {
	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __turquoise">
					<EyeIcon/>
				</div>
				<div>
					<h1 className="h-2">Governance Overview</h1>
				</div>
			</div>
			<div className="page-body">
				<div className="row">
					{
						data.map((option, key) => (
							<div className="col-md-6" key={key}>
								<div className="governance-box">
									<GovernanceChart data={option}/>
								</div>
							</div>
						))
					}
				</div>
				<div className="row">
					<div className="col-12">
						<GovernanceList/>
					</div>
				</div>
			</div>
		</>
	)
}