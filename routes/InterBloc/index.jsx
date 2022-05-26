import dynamic from 'next/dynamic';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
/*
Components
 */
import Hash from '~ui/components/Hash';
import Preloader from '~ui/components/Preloader';
import ProgressMultiple from '~ui/components/ProgressMultiple';
import Box from '~ui/components/Box';
import Button from '~ui/components/Button';
/*
Icons
 */
import DirectoryIcon from '~ui/icons/Directory';
import SortDirectionIcon from '~ui/icons/SortDirection';
import EyeIcon from '~ui/icons/Eye';
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
					</div>
					<div className="col-6">
						<div className="h-100">
							<Box>
								<Tabs className="tabs">
									<TabList className="tabs-buttons">
										<Tab className="tabs-buttons-item">
											<div className="tabs-button">Delegations</div>
										</Tab>
										<Tab className="tabs-buttons-item">
											<div className="tabs-button">Unbondings</div>
										</Tab>
										<Tab className="tabs-buttons-item">
											<div className="tabs-button">Redelegations</div>
										</Tab>
										<Tab className="tabs-buttons-item">
											<div className="tabs-button">Vestings</div>
										</Tab>
									</TabList>
									<TabPanel className="tabs-content pt-2">
										<table className="table">
											<thead>
												<tr>
													<th>Validator</th>
													<th>Amount</th>
													<th>Reward</th>
												</tr>
											</thead>
											<tbody>
											{
												Array.from({ length: 2 }).map((_, index) => (
													<tr key={index}>
														<td>
															<span className="font-secondary-bold">Everstake</span>
														</td>
														<td>
															<span className="font-bold">1,0000 ATOM</span>
														</td>
														<td>
															<span className="font-bold">0,00001 ATOM</span>
														</td>
													</tr>
												))
											}
											</tbody>
										</table>
									</TabPanel>
									<TabPanel>
										<table className="table">
											<thead>
											<tr>
												<th>Validator</th>
												<th>Amount</th>
												<th>Reward</th>
											</tr>
											</thead>
											<tbody>
											{
												Array.from({ length: 3 }).map((_, index) => (
													<tr key={index}>
														<td>
															<span className="font-secondary-bold">Onil</span>
														</td>
														<td>
															<span className="font-bold">2,0000 ATOM</span>
														</td>
														<td>
															<span className="font-bold">0,0005 ATOM</span>
														</td>
													</tr>
												))
											}
											</tbody>
										</table>
									</TabPanel>
									<TabPanel>
										<table className="table">
											<thead>
											<tr>
												<th>Validator</th>
												<th>Amount</th>
												<th>Reward</th>
											</tr>
											</thead>
											<tbody>
											{
												Array.from({ length: 1 }).map((_, index) => (
													<tr key={index}>
														<td>
															<span className="font-secondary-bold">Present</span>
														</td>
														<td>
															<span className="font-bold">9,0000 ATOM</span>
														</td>
														<td>
															<span className="font-bold">0,00008 ATOM</span>
														</td>
													</tr>
												))
											}
											</tbody>
										</table>
									</TabPanel>
									<TabPanel>
										<table className="table">
											<thead>
											<tr>
												<th>Validator</th>
												<th>Amount</th>
												<th>Reward</th>
											</tr>
											</thead>
											<tbody>
											{
												Array.from({ length: 4 }).map((_, index) => (
													<tr key={index}>
														<td>
															<span className="font-secondary-bold">Digital</span>
														</td>
														<td>
															<span className="font-bold">5,5000 ATOM</span>
														</td>
														<td>
															<span className="font-bold">0,00012 ATOM</span>
														</td>
													</tr>
												))
											}
											</tbody>
										</table>
									</TabPanel>
								</Tabs>
							</Box>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<ProgressMultiple data={ust} label="bottom"/>
					</div>
					<div className="col-6">
						<ProgressMultiple data={reward} label="bottom"/>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="table-box mt-5">
							<div className="table-header d-flex align-items-center justify-content-between">
								<p className="font-16">
									<span className="mr-3">
										<SortDirectionIcon/>
									</span>
									Latest 25 from a total of
									<span className="color-turquoise"> 232</span> transaction  ( +1 <span className="color-turquoise">Pending</span> )
								</p>
								<div>
									<div className="btns-group">
										<Button size="md" color="blue">Filter</Button>
										<Button size="md">Clear</Button>
									</div>
								</div>
							</div>
							<table className="table">
								<thead>
								<tr>
									<th/>
									<th>Txs Hash</th>
									<th>Method</th>
									<th>Status</th>
									<th>From</th>
									<th>To</th>
									<th>Value</th>
									<th>Txn Fee</th>
									<th/>
								</tr>
								</thead>
								<tbody>
								{
									Array.from({ length: 5 }).map((_, index) => (
										<tr key={index}>
											<td>
												<Button icon color="transparent">
													<EyeIcon/>
												</Button>
											</td>
											<td>
												<span className="color-turquoise font-secondary-bold font-hash">0xc6fcvzc6fsdf68678z3345v6546zc578zcv99790987987</span>
											</td>
											<td>
												<span className="color-violet font-12 font-bold status">Deposit</span>
											</td>
											<td>
												<span className="font-book color-success">Success</span>
											</td>
											<td>
												<span className="font-book font-hash">0xc6fcvzc6fsdf68678z3345v6546zc578zcv99790987987</span>
											</td>
											<td>
												<span className="font-book font-hash">0xc6fcvzc6fsdf68678z3345v6546zc578zcv99790987987</span>
											</td>
											<td>
												<span className="font-book">0.054 Ether</span>
											</td>
											<td>
												<span className="font-book">0.00034556781244</span>
											</td>
											<td/>
										</tr>
									))
								}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}