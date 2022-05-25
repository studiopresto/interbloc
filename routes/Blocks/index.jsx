import NumberFormat from 'react-number-format';
/*
Icons
 */
import BlocksIcon from '~ui/icons/Blocks';
/*
Utils
 */
import hashShortening from '~utils/string/hashShortening';



export default function BlocksPage() {
	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __turquoise">
					<BlocksIcon/>
				</div>
				<div>
					<h1 className="h-2">Blocks</h1>
					<p className="h-6">Last Actuals Blocks</p>
				</div>
			</div>
			<div className="page-body">
				<div className="table-box">
					<table className="table">
						<thead>
							<tr>
								<th>Height</th>
								<th>Proposer</th>
								<th>Hash</th>
								<th>Txs</th>
								<th>Time</th>
							</tr>
						</thead>
						<tbody>
						{
							Array.from({ length: 22 }).map((_, index) => (
								<tr key={index}>
									<td>
										<NumberFormat
											value={5522818 * ( index + 1 )}
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
									<td>
										<p className="font-book">{hashShortening('0xc6fcvzc6fsdf68678z3345v6546zc578zcv99790987987')}</p>
									</td>
									<td><span className="font-book">0</span></td>
									<td><span className="font-book">9s ago</span></td>
								</tr>
							))
						}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}