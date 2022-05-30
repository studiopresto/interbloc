import Image from 'next/image';
import NumberFormat from 'react-number-format';
import placeholder from '~static/images/placeholder.svg';
/*
Components
 */
import Input from '~ui/components/Input';
import SelectCustom from '~ui/components/Select';



export default function Assets() {

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
						<p className="font-20 font-bold">Assets</p>
					</div>
					<div className="col-8">
						<div className="d-flex align-items-center justify-content-end">
							<p className="color-grey mr-3">Asset Type:</p>
							<SelectCustom options={options} onChange={handleChange}/>
						</div>
					</div>
				</div>
			</div>
			<div className="table">
				<Input search/>
			</div>
			<table className="table mt-4">
				<thead>
					<tr>
						<th>Validator</th>
						<th>Amount</th>
						<th><div className="text-right">Total Value</div></th>
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
									<span className="font-secondary-bold">STARS</span>
								</div>
							</td>
							<td>
								<span>{4.3424145185 * ( index + 1 )}</span>
							</td>
							<td>
								<div className="d-flex flex-column align-items-end">
									<span className="font-bold">$
										<NumberFormat
											value={2431278.78 * index + 2}
											displayType="text"
											thousandSeparator={true}
											renderText={(value, props) => {
												return <span {...props}>{value}</span>
											}}/>
									</span>
									<span className="font-12 color-grey font-bold">${(5.56 * index + 3).toFixed(2)}</span>
								</div>
							</td>
						</tr>
					))
				}
				</tbody>
			</table>
		</div>
	)
}