import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import {STATUS} from 'config/constants';
import SortDirectionIcon from 'ui/icons/SortDirection';
import Datepicker from 'ui/components/Datepicker';
import Button from 'ui/components/Button';
import Tooltip from 'ui/components/Tooltip';
import Dot from 'ui/components/Dot';
import InfoIcon from 'ui/icons/Info';
import SortIcon from 'ui/icons/Sort';
import {formatMessageToReadableArray} from 'utils/formatting/transactions';
import routes from 'config/routes';
import EyeIcon from 'ui/icons/Eye';
import EmptyBlock from 'ui/components/Empty/EmptyBlock';
import {getDateDifferent} from 'utils/date/getDateDifferent';
import {formatCoinArrayToString, formatDenomToString} from 'utils/formatting/coins';
import Preloader from 'ui/components/Preloader';
import coinConfig from '../../../coin.config';

export default function TransactionList({ data, per_page = 10, address, status }) {
	
	const { t } = useTranslation();
	
	return (
		<div className="col-12">
			<div className="table-box mt-5">
				{isEmptyObject(data) || !data?.transactions.length || status === STATUS.PENDING ? <Preloader/> : null}
				{!isEmptyObject(data) && data?.transactions.length && status === STATUS.FULFILLED
					? (
						<>
							<div className="table-header d-flex">
								<p className="font-16 mb-2 mb-md-0">
										<span className="mr-3">
											<SortDirectionIcon/>
										</span>
									{t('labels:latest-count-of', {
										count: (data.pagination.total < per_page)
											? data.pagination.total
											: per_page
									})}
									<span className="color-turquoise"> {data.pagination.total}</span> {t('labels:transactions')}
								</p>
								<div className="table-header-actions">
									{/*<div className="table-header-datepicker">*/}
									{/*	<p className="color-grey">{t('labels:from')}:</p>*/}
									{/*	<Datepicker size="md"/>*/}
									{/*</div>*/}
									{/*<div className="table-header-datepicker">*/}
									{/*	<p className="color-grey">{t('labels:to')}:</p>*/}
									{/*	<Datepicker size="md"/>*/}
									{/*</div>*/}
									{/*<div className="btns-group">*/}
									{/*	<Button size="md" color="blue">{t('actions:filter')}</Button>*/}
									{/*	<Button size="md">{t('actions:clear')}</Button>*/}
									{/*</div>*/}
								</div>
							</div>
							<table className="table table-large">
								<thead>
								<tr>
									<th/>
									<th>{t('labels:txs-hash')}</th>
									<th>
										<div className="d-flex align-items-center">
											{t('labels:method')}
											<Tooltip
												text={t('texts:method-description')}>
												<Dot>
													<InfoIcon/>
												</Dot>
											</Tooltip>
										</div>
									</th>
									<th>
										<div className="d-flex align-items-center">
											
											{t('labels:block')}
											<Dot>
												<SortIcon/>
											</Dot>
										</div>
									</th>
									<th>
										<div className="d-flex align-items-center">
											{t('labels:age')}
											<Dot>
												<SortIcon/>
											</Dot>
										</div>
									</th>
									<th>{t('labels:from')}</th>
									<th/>
									<th>{t('labels:to')}</th>
									<th>{t('labels:value')}</th>
									<th>{t('labels:txn-fee')}</th>
									<th/>
								</tr>
								</thead>
								<tbody>
								{
									data.transactions.map((tx, index) => {
										const type = formatMessageToReadableArray(tx.tx.body.messages[0])[1]
										const from = (type === 'Send') ? tx.tx.body.messages[0]['fromAddress'] : ''
										const to = (type === 'Send') ? tx.tx.body.messages[0]['toAddress'] : ''
										const inOrOut = (type !== 'Send') ? undefined : (tx.tx.body.messages[0]['fromAddress'] === address) ? 'out' : 'in'
										const value = (type === 'Send') ? tx.tx.body.messages[0]['amount'][0] : ''
										return (
											<tr key={index}>
												<td className="hidden-xxl">
													<Link href={`${routes.public.transactions}/${tx.txhash}`}>
														<a>
															<Button icon color="transparent">
																<EyeIcon/>
															</Button>
														</a>
													</Link>
												</td>
												<td data-title={t('labels:txs-hash')}>
													<Link href={`${routes.public.transactions}/${tx.txhash}`}>
														<a className=" color-turquoise font-secondary-bold font-hash ">
															{tx.txhash}
														</a>
													</Link>
												</td>
												<td data-title={t('labels:method')}>
													<span className="color-violet font-12 font-bold status">{type} {(tx.tx.body.messages.length > 1) ? '+' + (tx.tx.body.messages.length - 1).toString() : ''}</span>
												</td>
												<td data-title={t('labels:block')}>
													<span className="font-book">{tx.height}</span>
												</td>
												<td data-title={t('labels:age')}>
                            <span className="font-book">
                              {getDateDifferent(tx.unixTimestamp * 1000, new Date())} ago</span>
												</td>
												{
													type === 'Send' ? (
														<>
															<td data-title={t('labels:from')}>
																<span className="font-book font-hash">{from}</span>
															</td>
															<td>
																<span className="font-12 font-bold status status-md" style={{color: inOrOut === 'in' ? '#4D8C2F' : '#BCB96C'}}>{inOrOut === 'in' ? 'In' : (inOrOut === 'out' ? 'Out' : '')}</span>
															</td>
															<td data-title={t('labels:to')}>
																<span className="font-book font-hash">{to}</span>
															</td>
															<td data-title={t('labels:value')}>
																<span className="font-book">{formatCoinArrayToString(value)}</span>
															</td>
														</>
													) : (
														<>
															<td data-title={t('labels:from')} colSpan={4} className="text-center-xxl">
																<span className="status font-book">Not a transfer</span>
															</td>
														</>
													)
												}
												<td data-title={t('labels:txs-hash')}>
													<span className="font-book">{tx.authInfo.fee.amount ? formatDenomToString(tx.authInfo.fee.amount[0].amount, tx.authInfo.fee.amount[0].denom) : formatDenomToString(0, coinConfig.denom)}</span>
												</td>
												<td/>
											</tr>
										)
									})
								}
								</tbody>
							</table>
						</>
					) : <EmptyBlock/>
				}
			</div>
		</div>
	
	)
}