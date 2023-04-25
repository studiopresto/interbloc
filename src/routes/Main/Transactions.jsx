import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NumberFormat from 'react-number-format';
import useTranslation from 'next-translate/useTranslation';
import {fetchTransactions, selectTransactions} from 'store/slices/getTransactionsSlice';
import Preloader from 'ui/components/Preloader';
import ErrorBlock from 'ui/components/Error';
import hashShortening from 'utils/string/hashShortening';
import {getDateDifferent} from 'utils/date/getDateDifferent';
import {STATUS} from 'config/constants';
import routes from "config/routes";
import Link from "next/link";
import {formatDenomToString} from "utils/formatting/coins";
import coinConfig from "../../../coin.config";
import {isEmptyObject} from "utils/object/detectEmptyObject";

export default function TransactionsMain() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectTransactions);
	const { t } = useTranslation();


	useEffect(() => {
		dispatch(fetchTransactions({ limit: 6, per_page: 6, page: 1 }));
	}, [dispatch]);

	if (isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>
	}
	
	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		return (
			<div className="table-box">
				<table className="table">
					<thead>
					<tr>
						<th>{t('labels:hash')}</th>
						<th>{t('labels:block')}</th>
						<th>{t('labels:type')}</th>
						<th>{t('labels:fee')}</th>
						<th>{t('labels:time')}</th>
					</tr>
					</thead>
					<tbody>
					{
						data.transactions.map((option, index) => (
							<tr key={index}>
								<td data-title={t('labels:hash')}>
									<Link href={`${routes.public.transactions}/${option.txhash}`}>
										<a>
											<span className="font-secondary-bold color-turquoise">{hashShortening(option.txhash)}</span>
										</a>
									</Link>
								</td>
								<td data-title={t('labels:block')}>
									<Link href={`${routes.public.blocks}/${option.height}`}>
										<a>
											<NumberFormat
												value={option.height}
												displayType="text"
												thousandSeparator={true}
												renderText={(value, props) => {
													return <span className="font-book" {...props}>{value}</span>;
												}}/>
										</a>
									</Link>
								</td>
								<td data-title={t('labels:type')}>
									<span className="font-book">{option.type || '-'}</span>
								</td>
								<td data-title={t('labels:fee')}>
									<span className="font-book">
										{option.authInfo.fee.amount
											? formatDenomToString(option.authInfo.fee.amount[0].amount , option.authInfo.fee.amount[0].denom)
											: formatDenomToString(0, coinConfig.denom)}
									</span>
								</td>
								<td data-title={t('labels:time')}>
									<span className="font-book">{getDateDifferent(option.unixTimestamp * 1000, new Date())} ago</span>
								</td>
							</tr>
						))
					}
					</tbody>
				</table>
			</div>
		)
	}

	return <ErrorBlock/>;
}
