import {useCallback, useState, useMemo} from 'react';
import NumberFormat from 'react-number-format';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import Box from 'ui/components/Box';
import SelectCustom from 'ui/components/Select';
import SortButton from 'components/SortButton';
import {formatFromBaseDenom} from 'utils/formatting/coins';
import {getDateFromTimestamp} from 'utils/date/getDateFromTimestamp';
import routes from 'config/routes';
import coinConfig from '../../../coin.config';
import _ from 'lodash';

const Depositors = ({ depositors = [] }) => {
	
	const {t} = useTranslation();
	const [sort, setSort] = useState({
		order_by: '',
		order_direction: 'asc',
	});
	
	const sortOptions = [
		{ value: 'amount', label: t('labels:amount') },
		{ value: 'time', label: t('labels:time') }
	]
	
	const handleSort = useCallback((newSort) => {
		setSort(newSort);
	}, [setSort, sort])
	
	const handleSortSelect = useCallback((e) =>{
		setSort(prevState => {
			return {...prevState, order_by: e.value}
		})
	}, [setSort])
	
	const sortedData = useMemo(() => {
		if (sort.order_by !== '') {
			return _.orderBy(depositors, [sort.order_by], [sort.order_direction])
		}
		return depositors;
	}, [depositors, sort])
	
	return (
		<Box title={t('common:box-depositors')}>
			<div className="proposal-table-filters">
				<p className="color-grey mr-3">{t('labels:sort-by')}:</p>
				<SelectCustom
					options={sortOptions}
					defaultValue={sortOptions.filter(option => option.value === sort.order_by)[0]}
					onChange={handleSortSelect}/>
				<div className="ml-3">
					<SortButton onSort={handleSort} sort={sort} value={sort.order_by}/>
				</div>
			</div>
			<div className="table-box">
				<table className="table table-large">
					<thead>
						<tr>
							<th>{t('labels:depositor')}</th>
							<th>{t('labels:txs-hash')}</th>
							<th>
								<SortButton sort={sort} onSort={handleSort} value="amount" label={t('labels:amount')}/>
							</th>
							<th>
								<SortButton sort={sort} onSort={handleSort} value="time" label={t('labels:time')}/>
							</th>
						</tr>
					</thead>
					<tbody>
					{sortedData.map((depositor, index) => (
						<tr key={index}>
							<td data-title={t('labels:depositor')}>
								<Link href={`${routes.public.account}/${depositor.address}`}>
									<a className="font-secondary-bold color-turquoise">{depositor.address}</a>
								</Link>
							</td>
							<td data-title={t('labels:txs-hash')}>
								<span className="font-book text-break">{depositor.hash}</span>
							</td>
							<td data-title={t('labels:amount')}>
								<NumberFormat
									value={formatFromBaseDenom(depositor.amount)}
									displayType="text"
									thousandSeparator={true}
									renderText={(value, props) => {
										return <span className="font-book" {...props}>{value} {coinConfig.ticker}</span>;
									}}/>
							</td>
							<td data-title={t('labels:time')}>
								<span className="font-book">{getDateFromTimestamp(depositor.timestamp)}</span>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</Box>
	)
}

export default Depositors