import dynamic from 'next/dynamic';
/*
Icons
 */
import BlocksIcon from '~ui/icons/Blocks';
import EyeIcon from "~ui/icons/Eye";
import SortDirectionIcon from '~ui/icons/SortDirection';
/*
Components
 */
import Hash from '~ui/components/Hash';
import ProgressMultiple from '~ui/components/ProgressMultiple';
import Box from '~ui/components/Box';
import List from '~ui/components/List';
import Preloader from '~ui/components/Preloader';
import Button from "~ui/components/Button";
/*
Lazy components
 */
const TransactionTypes = dynamic(async () => {
	return await import('~components/TransactionTypes');
}, { ssr: false, loading: () => <Preloader/> });



export default function BlockOpenPage() {

	const gas = [
		{
			title: 'Gas Used',
			value: 47,
		},
		{
			title: 'Gas Limit',
			value: 100,
		},
	];
	const sign = [
		{
			title: 'Signed',
			value: 81,
		},
		{
			title: 'Missed',
			value: 100,
		},
	];
	const info = [
		['Chain id', 'cosmoshub-4'],
		['Height', '101987859'],
		['Block Time', '1m ago (2022-04-21 10:13:18)'],
		['Block Hash', '357hjkDF34KJJH4J37H7L'],
		['Number of Tx ', '1'],
		['Gas', '12312314231 out of 24234342443'],
		['Consensus Time', '6,5 seconds'],
		['Proposer', 'Everstake'],
	]

	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __turquoise">
					<BlocksIcon/>
				</div>
				<div>
					<h1 className="h-2">Block:2652342</h1>
				</div>
			</div>
			<div className="page-body">
				<Hash title="Hash" value="0xc6fcvzc6fsdf68678z3345v6546zc578zcv99790987987"/>
				<div className="row">
					<div className="col-6">
						<ProgressMultiple data={gas} label="top"/>
					</div>
					<div className="col-6">
						<ProgressMultiple data={sign} label="top"/>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<Box title="Block Info">
							<List data={info}/>
						</Box>
						<Box title="Transaction Types">
							<TransactionTypes/>
						</Box>
					</div>
					<div className="col-6">
						<Box title="Signatures">
							<div className="overflow-auto" style={{ maxHeight: 867 }}>
								<table className="table">
									<thead>
										<tr>
											<th>Validator</th>
											<th>Period</th>
										</tr>
									</thead>
									<tbody>
									{
										Array.from({ length: 22 }).map((_, index) => (
											<tr key={index}>
												<td>
													<div className="d-inline-flex align-items-center">
														<div className="thumb size-30 position-left">
															<img src="https://seeklogo.com/images/C/coinmarketcap-logo-064D167A0E-seeklogo.com.png" alt="Ping"/>
														</div>
														<span className="font-secondary-bold">Osmo</span>
													</div>
												</td>
												<td><span className="font-book">9s ago</span></td>
											</tr>
										))
									}
									</tbody>
								</table>
							</div>
						</Box>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="table-box">
							<div className="table-header">
								<p className="font-16">
									<span className="mr-3">
										<SortDirectionIcon/>
									</span>
									Latest 25 from a total of
									<span className="color-turquoise">232</span> transaction  ( +1 <span className="color-turquoise">Pending</span> )
								</p>
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