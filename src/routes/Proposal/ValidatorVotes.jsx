import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import placeholder from '../../../public/static/images/placeholder.svg';
import SelectCustom from 'ui/components/Select';
import Input from 'ui/components/Input';
import {selectGovernanceProposal} from "store/slices/getGovernanceProposal";
import {fetchValidators, selectValidators} from "store/slices/getValidatorsSlice";
import {STATUS} from "config/constants";
import Preloader from "ui/components/Preloader";
import ErrorBlock from "ui/components/Error";
import  converter from "convert-bech32-address";
import coinConfig from "../../../coin.config";

export default function ValidatorVotes() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectGovernanceProposal);
	const { data: validatorData, status: validatorStatus } = useSelector(selectValidators);
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(fetchValidators({}));
	}, [dispatch]);

	const sortedValidatorData = [...validatorData];
	sortedValidatorData.sort((a, b) => Number.parseInt(a.tokens) < Number.parseInt(b.tokens));
	let addressToValoper = {}
	validatorData.map((data, index) => {
		let valoper = data.operatorAddress;
		addressToValoper[converter.lookup(valoper, coinConfig.addrPrefix)] = valoper
	})


	// const handleChange = (e) => {
	// 	console.log(e);
	// };

	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	];

	if (validatorStatus !== STATUS.FULFILLED){
		return <Preloader></Preloader>
	}

	if (validatorStatus === STATUS.REJECTED){
		return <ErrorBlock></ErrorBlock>
	}
	return (
		<div className="table-box mt-2">
			<div className="table-header mb-4">
				<div className="row">
					<div className="col-12 col-md-4">
						<p className="font-20 font-bold">Validator Votes (Pagination Soon)</p>
					</div>
					{/*<div className="search-bar col-8">*/}
					{/*	<div className="d-flex align-items-center justify-content-end">*/}
					{/*		<p className="color-grey mr-3">Select by Decision:</p>*/}
					{/*		<SelectCustom options={options} onChange={handleChange}/>*/}
					{/*	</div>*/}
					{/*</div>*/}
				</div>
			</div>
			{/*<div className="table">*/}
			{/*	<Input search/>*/}
			{/*</div>*/}
			<table className="table mt-4">
				<thead className='font-7'>
				<tr>
					<th>{t('labels:address')}</th>
					<th>{t('labels:vote')}</th>
				</tr>
				</thead>
				<tbody>
				{
					sortedValidatorData.slice(0, 5).map((data, index) => (
						<tr key={index}>
							<td data-title={t('labels:address')} className='font-7'>
								<div className="d-inline-flex align-items-center">
									<div className="thumb size-30 position-left image">
										<Image
											src={placeholder}
											width={30}
											height={30}
											alt="Alt"/>
									</div>
									<span className="font-secondary-bold">{data.description.moniker}</span>
								</div>
							</td>
							<td data-title={t('labels:vote')} className='font-7'>
								{
									converter.lookup(data.operatorAddress, coinConfig.addrPrefix) in Object.keys(data)
										? <span style={{ color: '#4D8C2F' }}>{data[converter.lookup(data.operatorAddress, coinConfig.addrPrefix)].option}</span>
										: <span style={{ color: '#717D89' }}>Not Voted Yet</span>
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