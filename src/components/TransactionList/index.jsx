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
import {getDateDifferent} from 'utils/date/getDateDifferent';
import {formatCoinArrayToString, formatDenomToString} from 'utils/formatting/coins';
import Preloader from 'ui/components/Preloader';
import coinConfig from '../../../coin.config';

export default function TransactionList({transactionData, transactionStatus, per_page = 10, address}) {
	
	const { t } = useTranslation();
	
	return (
		<div className="col-12">
			<div className="table-box mt-5">
				{
					(!isEmptyObject(transactionData) && transactionData.transactions.length > 0) ?
						(
							<>
								<div className="table-header d-flex align-items-center justify-content-between">
									<p className="font-16">
										<span className="mr-3">
											<SortDirectionIcon/>
										</span>
										Latest
										{(transactionData.pagination.total < per_page) ? transactionData.pagination.total : per_page}
										from a total of
										<span className="color-turquoise"> {transactionData.pagination.total}</span> transaction(s)
										{/* ( +1 <span
                                                    className="color-turquoise">Pending</span>  */}
									</p>
									<div className="d-flex align-items-center">
										<p className="color-grey mr-2">{t('labels:from')}:</p>
										<Datepicker size="md"/>
										<p className="color-grey mr-2 ml-4">{t('labels:to')}:</p>
										<Datepicker size="md"/>
										<div className="btns-group ml-4">
											<Button size="md" color="blue">{t('actions:filter')}</Button>
											<Button size="md">{t('actions:clear')}</Button>
										</div>
									</div>
								</div>
								<table className="table large-table">
									<thead>
										<tr>
											<th/>
											<th>{t('labels:txs-hash')}</th>
											<th>
												<div className="d-flex align-items-center">
													{t('labels:method')}
													<Tooltip
														text="On recommend tolerably my belonging or am. Mutual has cannot beauty indeed now sussex merely you. It possible no husbands jennings ye offended packages pleasant he. Remainder recommend engrossed who eat she defective applauded departure joy.">
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
										transactionData.transactions.map((tx, index) => {
											const type = formatMessageToReadableArray(tx.tx.body.messages[0])[1]
											const from = (type === 'Send') ? tx.tx.body.messages[0]['fromAddress'] : ''
											const to = (type === 'Send') ? tx.tx.body.messages[0]['toAddress'] : ''
											const inOrOut = (type !== 'Send') ? undefined : (tx.tx.body.messages[0]['fromAddress'] === address) ? 'out' : 'in'
											const value = (type === 'Send') ? tx.tx.body.messages[0]['amount'][0] : ''
											return (
												<tr key={index}>
													<td data-title="Txs Hash">
														<Link href={`${routes.public.transactions}/${tx.txhash}`}>
															<a>
																<Button icon color="transparent">
																	<EyeIcon/>
																</Button>
															</a>
														</Link>
													</td>
													<td data-title="Method">
														<Link href={`${routes.public.transactions}/${tx.txhash}`}>
															<a className=" color-turquoise font-secondary-bold font-hash ">
																{tx.txhash}
															</a>
														</Link>
													</td>
													<td data-title="Block">
													  <span className="color-violet font-12 font-bold status">{type} {(tx.tx.body.messages.length > 1) ? '+' + (tx.tx.body.messages.length - 1).toString() : ''}</span>
													</td>
													<td data-title="Age">
														<span className="font-book">{tx.height}</span>
													</td>
													<td data-title="from">
                            <span className="font-book">
                              {getDateDifferent(tx.unixTimestamp * 1000, new Date())} ago</span>
													</td>
													{
														type === 'Send' ? (
															<>
																<td data-title="To">
																	<span className="font-book font-hash">{from}</span>
																</td>
																<td>
                                  <span className="font-12 font-bold status status-md" style={{color: inOrOut === 'in' ? '#4D8C2F' : '#BCB96C'}}>{inOrOut === 'in' ? 'In' : (inOrOut === 'out' ? 'Out' : '')}</span>
																</td>
																<td data-title="Value">
																	<span className="font-book font-hash">{to}</span>
																</td>
																<td data-title="Txn Fee">
																	<span className="font-book">{formatCoinArrayToString(value)}</span>
																</td>
															</>
														) : (
															<>
																<td colSpan={4} className="text-center">
																	<span className="status font-book">Not a transfer</span>
																</td>
															</>
														)
													}
													<td>
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
						) :
						(!isEmptyObject(transactionData) && transactionData.transactions.length === 0 && transactionStatus === STATUS.FULFILLED) ?
							(<div className="preloader">
								No transactions
							</div>)
							: <Preloader/>
				}
			</div>
		</div>
	
	)
}