import {useDispatch, useSelector} from "react-redux";
import SelectCustom from 'ui/components/Select';
import Input from 'ui/components/Input';
import {fetchGovernanceProposal, selectGovernanceProposal} from "store/slices/getGovernanceProposal";

export default function Votes() {

	const { data, status } = useSelector(selectGovernanceProposal);
	const handleChange = (e) => {
		console.log(e);
	};

	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	];

	const prettifyOption = {
		yes: "Yes",
		no: "No",
		abstain: "Abstain",
		noWithBeto: "No With Veto"
	}
	const optionColour = {
		yes: "#4D8C2F",
		no: "#A75145",
		abstain: "#717D89",
		noWithBeto: "#D75145"
	}

	return (
		<div className="table-box mt-2">
			<div className="table-header mb-4">
				<div className="row">
					<div className="col-4">
						<p className="font-20 font-bold">Votes</p>
					</div>
					<div className="search-bar col-8">
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
					<th className='font-7'>Address</th>
					<th className='font-7'>Vote</th>
				</tr>
				</thead>
				<tbody>
				{
					Object.keys(data.votes).slice(0, 5).map((address, index) => (
						<tr key={index}>
							<td data-title= "Address" className='font-7 space-text'>
								<div className="d-inline-flex align-items-center">
									{/*<div className="thumb size-30 position-left image">
										<Image
											src={placeholder}
											width={30}
											height={30}
											alt="Alt"/>
									</div>*/}
									<span className="font-secondary-bold text-break">{address}</span>
								</div>
							</td>
							<td data-title= "Vote" className='font-7 space-text'>

									<span style={{ color: optionColour[data.votes[address].option] }}>{prettifyOption[data.votes[address].option]}</span>

							</td>
						</tr>
					))
				}
				</tbody>
			</table>
		</div>
	)
}