import {useMemo, useState} from 'react';
import Image from 'next/image';
import NumberFormat from 'react-number-format';
import useTranslation from 'next-translate/useTranslation';
import Input from 'ui/components/Input';
import SelectCustom from 'ui/components/Select';
import {getInfoForDenom} from "utils/formatting/chain";
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import _ from 'lodash';

export default function Assets({ balances }) {

	const { t } = useTranslation();
	const defaultFilter = { label: t('labels:all'), value: 'all' };
	const [filter, setFilter] = useState(defaultFilter);
	const [query, setQuery] = useState('');
	const [filteredBalances, setFilteredBalances] = useState(balances);
	
	// create options for select by asset
	const options = useMemo(() => {
		// first option is All, to display all assets
		let array = [defaultFilter];
		Object.keys(balances).forEach(key => {
			// get option from denom
			const { ticker = undefined, origin = undefined } = getInfoForDenom(key);
			if (ticker && origin) {
				array.push({ label: ticker, value: origin });
			}
		});
		return array
	}, [balances])
	
	const handleFilter = (filter) => {
		setFilter(filter);
		setQuery('');
		// return all balances
		if (filter.value === 'all') {
			setFilteredBalances(balances)
		} else {
			// return filtered balances
			setFilteredBalances(_.omitBy(balances, (value, key) => !key.startsWith(filter.value)));
		}
	}
	
	const handleSearch = (q) => {
		setQuery(q);
		// create array of query keys
		const searchResult = Object.keys(balances)
			.filter((key) => key.includes(q))
			.reduce((obj, key) => {
				return Object.assign(obj, {
					[key]: balances[key]
				})
			}, {});
		
		if (q !== '') {
			// return search result
			setFilteredBalances(searchResult);
			// set filter to zero option
			setFilter({ label: `${t('labels:select')} ${t('labels:asset').toLowerCase()}...`, value: '' });
		} else {
			// return all balances
			setFilteredBalances(balances);
			// set filter to All option
			setFilter(defaultFilter);
		}
	}
	
	const handleSearchReset = () => {
		setQuery('');
		setFilteredBalances(balances);
	}
	
	return (
		<div className="table-box mb-2">
			<div className="table-header mb-4">
				<div className="row">
					<div className="col-sm-4">
						<p className="font-20 font-bold">{t('common:box-assets')}</p>
					</div>
					<div className="col-sm-8">
						{options.length ? (
							<div className="d-flex align-items-center justify-content-sm-end">
								<p className="color-grey mr-3">{t('labels:asset-type')}:</p>
								<SelectCustom
									options={options}
									onChange={handleFilter}
									defaultValue={options[0]}
									value={filter}/>
							</div>
						) : null}
					</div>
				</div>
			</div>
			<div className="table">
				<Input search placeholder={`${t('labels:search')} ${t('labels:asset')}`} onChange={handleSearch} value={query} onReset={handleSearchReset}/>
			</div>
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
					!isEmptyObject(filteredBalances) ? (
						Object.entries(filteredBalances).map(([index, value]) => {
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
													loading="lazy"
													alt={assetData.ticker}/>
											</div>
											<span className="font-secondary-bold">{assetData.ticker}</span>
										</div>
									</td>
									<td data-title={t('labels:amount')}>
										<span className="font-bold">{ value / (10 ** assetData.exponent)}</span>
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
											<span className="font-12 color-grey font-bold">${(5.56 * value + 3).toFixed(2)}</span>
										</div>
									</td>
								</tr>
							)})
					) : <tr><td colSpan={3}><span className="font-16">{t('labels:no-results-found')}</span></td></tr>
				}
				</tbody>
			</table>
		</div>
	)
}