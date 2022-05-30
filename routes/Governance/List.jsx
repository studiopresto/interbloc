/*
Components
 */
import SelectCustom from '~ui/components/Select';
import Pagination from '~components/Pagination';
import Dot from '~ui/components/Dot';
/*
Icons
 */
import SortIcon from '~ui/icons/Sort';
import NumberFormat from "react-number-format";



export default function GovernanceList() {

	const options = [
		{ value: 'status', label: 'Status' },
		{ value: 'time', label: 'Time' },
		{ value: 'deposit', label: 'Deposit' }
	];

	const handleChange = (e) => {
		console.log(e);
	};

	return (
		<div className="table-box mt-2">
			<div className="table-header mb-4">
				<div className="row">
					<div className="col-4">
						<p className="font-20 font-bold">List of Governance</p>
					</div>
					<div className="col-8">
						<div className="d-flex align-items-center justify-content-end">
							<p className="color-grey mr-3">Filter by:</p>
							<SelectCustom options={options} onChange={handleChange}/>
						</div>
					</div>
				</div>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th>#ID</th>
						<th>Title</th>
						<th>
							<div className="d-flex align-items-center">
								Status
								<Dot>
									<SortIcon/>
								</Dot>
							</div>
						</th>
						<th>
							<div className="d-flex align-items-center">
								Voting Start
								<Dot>
									<SortIcon/>
								</Dot>
							</div>
						</th>
						<th>
							<div className="d-flex align-items-center">
								Submit Time
								<Dot>
									<SortIcon/>
								</Dot>
							</div>
						</th>
						<th>
							<div className="d-flex align-items-center">
								Total Deposit
								<Dot>
									<SortIcon/>
								</Dot>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
				{
					Array.from({ length: 7 }).map((_, index) => (
						<tr key={index}>
							<td><span className="color-grey font-book">#{68 - index}</span></td>
							<td>
								<span className="color-turquoise font-secondary-bold">Markus Cosmos Hub the Lead Sponsor of Cosmoverse 2022</span>
							</td>
							<td>
								<span className="table-status font-bold" style={{ color: index % 2 === 0 ? '#2BBF6F' : '#329DB5' }}>
									{ index % 2 === 0 ? 'Passed' : 'Voting Period' }
								</span>
							</td>
							<td><span className="font-book">2022-04-21 22:11:55</span></td>
							<td><span className="font-book">2022-05-21 22:11:55</span></td>
							<td>
								<NumberFormat
									value={65000000 * ( index + 1 )}
									displayType="text"
									thousandSeparator={true}
									renderText={(value, props) => {
										return <span className="font-book" {...props}>{value} ATOM</span>;
									}}/>
							</td>
						</tr>
					))
				}
				</tbody>
			</table>
			<div className="d-flex justify-content-center pt-5">
				<Pagination/>
			</div>
		</div>
	)
}