import Image from 'next/image';
import logo from '~static/images/logo-white.png';
import NumberFormat from 'react-number-format';
/*
Components
 */
import UnionIcon from '~ui/icons/Union';
import Button from '~ui/components/Button';
/*
Icons
 */
import ArrowLongIcon from '~ui/icons/ArrowLong';
import Box from '~ui/components/Box';
import BlocksIcon from '~ui/icons/Blocks';
import RSSIcon from '~ui/icons/RSS';
import PhoneIcon from '~ui/icons/Phone';
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
						<div className="h-100 d-flex flex-column justify-content-end pb-2">
							<p className="font-16 color-grey font-bold">Latest Block:</p>
							<NumberFormat
								value={5510127}
								displayType="text"
								thousandSeparator={true}
								renderText={(value, props) => {
									return <p className="h-2 mb-4" {...props}>{value}</p>
								}}/>
							<p className="font-16 color-grey font-bold">Average Block Time:</p>
							<p className="h-2">5.95 s</p>
						</div>
					</Box>
				</div>
				<div className="col-3">
					<Box title="Tokenomics" theme={2} icon={<UnionIcon/>} color="orange">
						<div className="row">
							<div className="col-6">
								<p className="color-grey font-bold">Bonded:</p>
								<NumberFormat
									value={45349414}
									displayType="text"
									thousandSeparator={true}
									renderText={(value, props) => {
										return <p className="font-16 font-secondary-bold color-orange" {...props}>{value}</p>
									}}/>
								<p className="color-grey font-secondary-bold font-12">BTSG</p>
								<p className="mt-2">36.07 %</p>
							</div>
							<div className="col-6">
								<p className="color-grey font-bold">Unbonded:</p>
								<NumberFormat
									value={79978477}
									displayType="text"
									thousandSeparator={true}
									renderText={(value, props) => {
										return <p className="font-16 font-secondary-bold color-violet" {...props}>{value}</p>
									}}/>
								<p className="color-grey font-secondary-bold font-12">BTSG</p>
								<p className="mt-2">63.62 %</p>
							</div>
						</div>
					</Box>
				</div>
				<div className="col-3">
					<Box title="Relayers" theme={3} icon={<RSSIcon/>} color="blue" staticHeight>
						<div className="h-100 d-flex flex-column justify-content-end">
							<p className="font-16 color-grey font-bold">Packets Pending:</p>
							<p className="h-2 mb-4">27</p>
							<p className="color-grey font-bold">Osmosis Channel - 1:</p>
							<p className="color-grey font-bold">Osmosis Channel - 2:</p>
						</div>
					</Box>
				</div>
				<div className="col-3">
					<Box title="Mempool" theme={3} icon={<PhoneIcon/>} color="violet">
						<p className="font-16 color-grey font-bold">Transactions pending:</p>
						<p className="h-2">5</p>
					</Box>
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