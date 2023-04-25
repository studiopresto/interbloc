import Image from 'next/image';
import NumberFormat from 'react-number-format';
import Input from 'ui/components/Input';
import SelectCustom from 'ui/components/Select';
import {getInfoForDenom} from "utils/formatting/chain";
import {CHAIN} from "config/chain";

export default function Assets({ balances }) {

	const handleChange = (e) => {
		console.log(e);
	};

	const options = [
		{ value: 'chocolate', label: 'All' },
		{ value: 'strawberry', label: 'Native' },
		{ value: 'vanilla', label: 'IBC' }
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
						<th>Asset</th>
						<th>Amount</th>
						<th><div className="text-right">Total Value</div></th>
					</tr>
				</thead>
				<tbody>
				{
					Object.entries(balances).map(([index, value]) => {
						const assetData = getInfoForDenom(index)
						return(
							<tr key={index}>
								<td>
									<div className="d-inline-flex align-items-center">
										<div className="thumb size-30 position-left">
											<Image
												src={assetData.logo}
												width={30}
												height={30}
												alt="Alt"/>
										</div>
										<span className="font-secondary-bold">{assetData.ticker}</span>
									</div>
								</td>
								<td>
									<span>{ value / (10 ** assetData.exponent)}</span>
								</td>
								<td>
									<div className="d-flex flex-column align-items-end">
									<span className="font-bold">$
										<NumberFormat
											value={value}
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
						)

					})
				}
				</tbody>
			</table>
		</div>
	)
}