import SelectCustom from "~ui/components/Select";
import Image from "next/image";
import placeholder from "~static/images/placeholder.svg";
import Dot from "~ui/components/Dot";
import SortIcon from "~ui/icons/Sort";

export default function Channels() {

	const handleChange = (e) => {
		console.log(e);
	};

	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	];

	return (
		<div className="table-box mt-2">
			<div className="table-header mb-4">
				<div className="row">
					<div className="col-4">
						<p className="font-20 font-bold">Channels</p>
					</div>
					<div className="col-8">
						<div className="d-flex align-items-center justify-content-end">
							<p className="color-grey mr-3">Select by Decision:</p>
							<SelectCustom options={options} onChange={handleChange}/>
						</div>
					</div>
				</div>
			</div>
			<table className="table mt-4">
				<thead>
				<tr>
					<th>
						<div className="d-flex align-items-center">
							Coin
							<Dot>
								<SortIcon/>
							</Dot>
						</div>
					</th>
					<th>Status</th>
					<th>
						<div className="d-flex align-items-center">
							Pending
							<Dot>
								<SortIcon/>
							</Dot>
						</div>
					</th>
					<th>
						<div className="d-flex align-items-center">
							Amount
							<Dot>
								<SortIcon/>
							</Dot>
						</div>
					</th>
					<th>
						<div className="d-flex align-items-center">
							Total Value
							<Dot>
								<SortIcon/>
							</Dot>
						</div>
					</th>
				</tr>
				</thead>
				<tbody>
				{
					Array.from({ length: 5 }).map((_, index) => (
						<tr key={index}>
							<td>
								<div className="d-inline-flex align-items-center">
									<div className="thumb size-30 position-left">
										<Image
											src={placeholder}
											width={30}
											height={30}
											alt="Alt"/>
									</div>
									<span className="font-secondary-bold">KalpaTech</span>
								</div>
							</td>
							<td>
								<div>
									<span className="table-status-icon" style={{ color: '#4D8C2F' }}/>
								</div>
							</td>
							<td>
								<span className="font-bold">3</span>
							</td>
							<td>
								<span className="font-bold">4,0232131</span>
							</td>
							<td>
								<p className="font-bold">$ 24,312.78</p>
								<p className="font-bold font-12 color-grey">$ 5.78</p>
							</td>
						</tr>
					))
				}
				</tbody>
			</table>
		</div>
	)
}