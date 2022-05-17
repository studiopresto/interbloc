import dynamic from 'next/dynamic';
import Image from 'next/image';
import logo from '~static/images/logo-white.png';
import NumberFormat from 'react-number-format';
/*
Components
 */
import BlocksLatest from '~components/BlocksLatest';
import Tokenomics from '~components/Tokenomics';
import Button from '~ui/components/Button';
/*
Icons
 */
import ArrowLongIcon from '~ui/icons/ArrowLong';
import Box from '~ui/components/Box';
import BlocksIcon from '~ui/icons/Blocks';
import RSSIcon from '~ui/icons/RSS';
import PhoneIcon from '~ui/icons/Phone';
import UnionIcon from '~ui/icons/Union';
/*
Utils
 */
import hashShortening from '~utils/string/hashShortening';


export default function MainPage() {

	return (
		<>
			<div className="page-header">
				<div className="d-md-flex align-items-md-center">
					<div className="page-header-icon">
						<Image src={logo} width={132} height={31}/>
					</div>
					<div>
						<h1 className="h-1">B2B blockchain services</h1>
						<p className="h-3">and consulting</p>
					</div>
				</div>
				<Button href="#" label="Projects" color="primary" withIcon>
					<ArrowLongIcon/>
				</Button>
			</div>
			<div className="row">
				<div className="col-3">
					<Box title="Blocks" theme={1} icon={<BlocksIcon/>} color="turquoise" staticHeight>
						<BlocksLatest/>
					</Box>
				</div>
				<div className="col-3">
					<Box title="Tokenomics" theme={2} icon={<UnionIcon/>} color="orange">
						<Tokenomics/>
					</Box>
				</div>
				<div className="col-3">
					<Box title="Relayers" theme={3} icon={<RSSIcon/>} color="blue" staticHeight>
						<div className="h-100 d-flex flex-column justify-content-end">
							<p className="font-16 color-grey font-bold">Packets Pending:</p>
							<p className="h-2 mb-4">27</p>
							<div className="dot-row">
								<p className="color-grey font-bold dot-row-title">Osmosis Channel - 1:</p>
								<div className="dot-row-item">
									<div className="dot-row-icon bg-success"/>
								</div>
							</div>
							<div className="dot-row mt-3">
								<p className="color-grey font-bold dot-row-title">Osmosis Channel - 2:</p>
								<div className="dot-row-item">
									<div className="dot-row-icon bg-danger"/>
								</div>
							</div>
						</div>
					</Box>
				</div>
				<div className="col-3">
					<Box title="Mempool" theme={4} icon={<PhoneIcon/>} color="violet">
						<p className="font-16 color-grey font-bold">Transactions pending:</p>
						<p className="h-2">5</p>
					</Box>
				</div>
			</div>
			<div className="row">
				<div className="col-6">
					<Box title="Price Statistics" theme={1}/>
				</div>
				<div className="col-3">
					<Box title="Consensus" theme={3}>
						<div className="row">
							<div className="col-6">
								<p className="color-grey font-bold mt-1">Voting Power <br/> Online:</p>
								<p className="font-secondary-bold color-orange font-16 mt-1">89%</p>
							</div>
							<div className="col-6">
								<p className="color-grey font-bold mt-1">Number Of <br/> Validators:</p>
								<p className="font-secondary-bold color-violet font-16 mt-1">25/40</p>
							</div>
						</div>
					</Box>
				</div>
				<div className="col-3">
					<Box title="Node Locations" theme={4}/>
				</div>
			</div>
			<div className="row">
				<div className="col-6">
					<Box title="Transactions">
						<div className="table-box">
							<table className="table">
								<thead>
								<tr>
									<th>Block</th>
									<th>Hash</th>
									<th>Type</th>
									<th>Fee</th>
									<th>Results</th>
									<th>Time</th>
								</tr>
								</thead>
								<tbody>
								{
									Array.from({ length: 6 }).map((_, index) => (
										<tr key={index}>
											<td>
												<NumberFormat
													value={5522818}
													displayType="text"
													thousandSeparator={true}
													renderText={(value, props) => {
														return <span className="font-secondary-bold color-turquoise" {...props}>{value}</span>;
													}}/>
											</td>
											<td>
												<span className="font-book">{hashShortening('0xc6fcvzc6fsdf68678z3345v6546zc578zcv99790987987')}</span>
											</td>
											<td><span className="font-book">send</span></td>
											<td><span className="font-book">0.00200token</span></td>
											<td><span className="font-book">0</span></td>
											<td><span className="font-book">9s ago</span></td>
										</tr>
									))
								}
								</tbody>
							</table>
						</div>
					</Box>
				</div>
				<div className="col-6">
					<Box title="Blocks">
						<div className="table-box">
							<table className="table">
								<thead>
								<tr>
									<th>Height</th>
									<th>Proposer</th>
									<th>Txs</th>
									<th>Time</th>
								</tr>
								</thead>
								<tbody>
								{
									Array.from({ length: 6 }).map((_, index) => (
										<tr key={index}>
											<td>
												<NumberFormat
													value={5522818}
													displayType="text"
													thousandSeparator={true}
													renderText={(value, props) => {
														return <span className="font-secondary-bold color-turquoise" {...props}>{value}</span>;
													}}/>
											</td>
											<td>
												<div className="d-inline-flex align-items-center">
													<div className="thumb size-30 position-left">
														<img src="https://seeklogo.com/images/C/coinmarketcap-logo-064D167A0E-seeklogo.com.png" alt="Ping"/>
													</div>
													<span className="font-secondary-bold">Ping</span>
												</div>
											</td>
											<td><span className="font-book">0</span></td>
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
		</>
	)
}