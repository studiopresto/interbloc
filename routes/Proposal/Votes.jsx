import Image from 'next/image';
import placeholder from '~static/images/placeholder.svg';
/*
Components
 */
import SelectCustom from '~ui/components/Select';
import Input from '~ui/components/Input';



export default function Votes() {

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
						<p className="font-20 font-bold">Votes</p>
					</div>
					<div className="col-8">
						<div className="d-flex align-items-center justify-content-end">
							<p className="color-grey mr-3">Select by Decision:</p>
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
					<th>Address</th>
					<th>Vote</th>
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
									<span className="font-secondary-bold">0xc6fcvzc6fsdf68678z0xc6fcvzc6fsdf68678z</span>
								</div>
							</td>
							<td>
								{
									index % 2 === 0
										? <span style={{ color: '#4D8C2F' }}>Yes</span>
										: <span style={{ color: '#A75145' }}>No</span>
								}
							</td>
						</tr>
					))
				}
				</tbody>
			</table>
		</div>
	)
}