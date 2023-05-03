import Image from 'next/image';
import NumberFormat from 'react-number-format';
import useTranslation from 'next-translate/useTranslation';
import Input from 'ui/components/Input';
import SelectCustom from 'ui/components/Select';
import {getInfoForDenom} from "utils/formatting/chain";
import {CHAIN} from "config/chain";

export default function Assets({ balances }) {

	const { t } = useTranslation();
	
	const handleChange = (e) => {
		console.log(e);
	};

	const options = [
		{ value: 'chocolate', label: 'All' },
		{ value: 'strawberry', label: 'Native' },
		{ value: 'vanilla', label: 'IBC' }
	];

	return (
		<div className="table-box mb-2">
			<div className="table-header mb-4">
				<div className="row">
					<div className="col-sm-4">
						<p className="font-20 font-bold">{t('common:box-assets')}</p>
					</div>
					<div className="col-sm-8">
						<div className="d-flex align-items-center justify-content-sm-end">
							<p className="color-grey mr-3">{t('labels:asset-type')}:</p>
							<SelectCustom options={options} onChange={handleChange}/>
						</div>
					</div>
				</div>
			</div>
			{/*<div className="table">*/}
			{/*	<Input search/>*/}
			{/*</div>*/}
			<table className="table mt-4">
				<thead>
					<tr>
						<th>{t('labels:asset')}</th>
						<th>{t('labels:amount')}</th>
						<th><div className="text-right">{t('labels:total-value')}</div></th>
					</tr>
				</thead>
				<tbody>
				{
					Object.entries(balances).map(([index, value]) => {
						const assetData = getInfoForDenom(index);
						return(
							<tr key={index}>
								<td data-title={t('labels:asset')}>
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
								<td data-title={t('labels:amount')}>
									<span>{ value / (10 ** assetData.exponent)}</span>
								</td>
								<td data-title={t('labels:total-value')}>
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