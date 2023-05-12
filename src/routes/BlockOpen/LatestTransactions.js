import {useCallback, useMemo, useState} from 'react';
import SortDirectionIcon from 'ui/icons/SortDirection';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Button from 'ui/components/Button';
import EyeIcon from 'ui/icons/Eye';
import {formatMessageToObject, formatMessageToReadableArray} from 'utils/formatting/transactions';
import {formatCoinArrayToString} from 'utils/formatting/coins';
import SortButton from 'components/SortButton';
import SelectCustom from 'ui/components/Select';
import routes from 'config/routes';
import _ from 'lodash';

const LatestTransactions = ({ transactions = [], aggregated = {} }) => {
	
	const {t} = useTranslation();
	
	const [sort, setSort] = useState({
		order_by: 'value',
		order_direction: 'asc',
	});
	
	const sortOptions = [
		{value: 'value', label: t('labels:value')},
		{value: 'txnFee', label: t('labels:txn-fee')},
	];
	
	const transformedTransactions = useMemo(() => {
		let array = [];
		transactions.map(transaction => {
			
			const type = formatMessageToReadableArray(transaction.tx.body.messages[0])[1];
			const amount = formatMessageToObject(transaction.tx.body.messages[0]).amount;
			const value = Object.keys(transaction.tx.body.messages[0]).includes('amount') && amount
				? amount.title
				: t('labels:not-identifiable');
			const txnFee = transaction.authInfo.fee.amount
				? formatCoinArrayToString(transaction.authInfo.fee.amount)
				: formatCoinArrayToString(0);
			
			array.push({
				txhash: transaction.txhash,
				height: transaction.height,
				method: formatMessageToObject(transaction.tx.body.messages[0]).title,
				code: transaction.code,
				type,
				from: type === 'Send' ? transaction.tx.body.messages[0]['fromAddress'] : null,
				to: type === 'Send' ? transaction.tx.body.messages[0]['toAddress'] : null,
				value,
				txnFee
			})
		});
		
		return array
	}, [transactions])
	
	const sortedData = useMemo(() => {
		if (sort.order_by !== '' && transformedTransactions.length) {
			return _.orderBy(transformedTransactions, [sort.order_by], [sort.order_direction])
		}
		return transformedTransactions
	}, [transformedTransactions, sort])
	
	const handleSort = (newSort) => {
		setSort(newSort)
	}
	
	const handleSortSelect = useCallback((e) => {
		setSort(prevState => {
			return {...prevState, order_by: e.value}
		})
	}, [setSort])
	
	return (
		<div className="table-box block">
			<div className="table-header d-flex">
				<p className="font-16">
          <span className="mr-3">
            <SortDirectionIcon direction={sort.order_direction === 'desc' ? 'down' : 'up'}/>
          </span>
					<span className="color-turquoise">{transactions.length ? transactions.length : (0)}</span> {t('labels:transactions')} ( {aggregated.failed}
					<span className="color-danger"> Failed</span> )
				</p>
				<div className="table-header-actions">
					<div className="table-header-action __sort">
						<p className="color-grey mr-3">{t('labels:sort-by')}:</p>
						<SelectCustom
							options={sortOptions}
							onChange={handleSortSelect}
							defaultValue={sortOptions[0]}/>
						<SortButton
							onSort={handleSort}
							sort={sort}
							value={sort.order_by}/>
					</div>
				</div>
			</div>
			<table className="table table-large">
				<thead>
					<tr>
						<th/>
						<th>{t('labels:txs-hash')}</th>
						<th>{t('labels:method')}</th>
						<th>{t('labels:status')}</th>
						<th>{t('labels:from')}</th>
						<th>{t('labels:to')}</th>
						<th>
							<SortButton label={t('labels:value')} sort={sort} value="value" onSort={handleSort}/>
						</th>
						<th>
							<SortButton label={t('labels:txn-fee')} sort={sort} value="txnFee" onSort={handleSort}/>
						</th>
						<th/>
					</tr>
				</thead>
				<tbody>
				{sortedData.map((transaction, index) => {
					return (
						<tr key={index}>
							<td className="hidden-sm">
								<Link href={`${routes.public.transactions}/${transaction.txhash}`}>
									<a>
										<Button icon color="transparent">
											<EyeIcon/>
										</Button>
									</a>
								</Link>
							</td>
							<td data-title={t('labels:txs-hash')}>
								<Link href={`${routes.public.transactions}/${transaction.txhash}`}>
									<a className="color-turquoise font-secondary-bold font-hash">{transaction.txhash}</a>
								</Link>
							</td>
							<td data-title={t('labels:method')}>
              <span className="color-violet font-12 font-bold status">
                {transaction.method}
              </span>
							</td>
							<td data-title={t('labels:status')}>
								{transaction.code === 0
									? <span className="font-book color-success">Success</span>
									: <span className="font-book color-danger">Error</span>
								}
							</td>
							{transaction.type === 'Send'
								? (
									<>
										<td data-title={t('labels:from')}>
											<span className="font-book font-hash">{transaction.from}</span>
										</td>
										<td data-title={t('labels:to')}>
											<span className="font-book font-hash">{transaction.to}</span>
										</td>
									</>
								)
								: (
									<>
										<td data-title={t('labels:from')} colSpan={2} className="text-center-xxl">
											<span className="status font-book">{t('labels:not-transfer')}</span>
										</td>
									</>
								)}
							<td data-title={t('labels:value')}>
                <span className="font-book">{transaction.value}</span>
							</td>
							<td data-title={t('labels:txn-fee')}>
                <span className="font-book">{transaction.txnFee}
              </span>
							</td>
							<td/>
						</tr>
					)
				})}
				</tbody>
			</table>
		</div>
	)
}

export default LatestTransactions