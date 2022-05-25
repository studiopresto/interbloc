import dynamic from 'next/dynamic';
/*
Components
 */
import Hash from '~ui/components/Hash';
import Preloader from '~ui/components/Preloader';
import ProgressMultiple from '~ui/components/ProgressMultiple';
import Box from '~ui/components/Box';
/*
Icons
 */
import DirectoryIcon from '~ui/icons/Directory';
/*
Lazy components
 */
const Assets = dynamic(async () => {
	return await import('~components/Assets');
}, { ssr: false, loading: () => <Preloader/> });



export default function InterBlocPage() {

	const ust = [
		{
			title: 'Atom',
			value: 42,
		},
		{
			title: 'Camo',
			value: 70,
		},
		{
			title: 'UST',
			value: 100,
		},
	];
	const reward = [
		{
			title: 'Delegated',
			value: 33,
		},
		{
			title: 'Available',
			value: 55,
		},
		{
			title: 'Reward',
			value: 100,
		},
	];

	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __violet">
					<DirectoryIcon/>
				</div>
				<div>
					<h1 className="h-2">Interbloc</h1>
					<p className="font-16 font-secondary-bold">Eth: <span className="color-violet">$3,093,59</span> (+3.81%)</p>
				</div>
			</div>
			<div className="page-body">
				<Hash title="Address" value="0xc6fcvzc6fsdf68678z3345v6546zc578zcv99790987987"/>
				<div className="row">
					<div className="col-6">
						<Assets/>
						<ProgressMultiple data={ust} label="bottom"/>
					</div>
					<div className="col-6">
						<Box>
							<div className="tabs">
								<div className="tabs-buttons">
									<div className="tabs-buttons-item">
										<div className="tabs-button is-active">Delegations</div>
									</div>
									<div className="tabs-buttons-item">
										<div className="tabs-button">Unbondings</div>
									</div>
									<div className="tabs-buttons-item">
										<div className="tabs-button">Redelegations</div>
									</div>
									<div className="tabs-buttons-item">
										<div className="tabs-button">Vestings</div>
									</div>
								</div>
								<div className="tabs-content">

								</div>
							</div>
						</Box>
						<ProgressMultiple data={reward} label="bottom"/>
					</div>
				</div>
			</div>
		</>
	)
}