import {useEffect} from 'react';
import {useRouter} from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import {useDispatch, useSelector} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {fetchTransaction, selectTransaction} from 'store/slices/getTransactionSlice';
import Hash from 'ui/components/Hash';
import Preloader from 'ui/components/Preloader';
import List from 'ui/components/List';
import ErrorBlock from 'ui/components/Error';
import Box from 'ui/components/Box';
import Button from 'ui/components/Button';
import TransactionsIcon from 'ui/icons/Transactions';
import FileIcon from 'ui/icons/File';
import PercentIcon from 'ui/icons/Percent';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import {PrettyPrintJson} from 'utils/formatting/json'
import {STATUS} from 'config/constants';
import {getDateDifferent} from "utils/date/getDateDifferent";
import {formatMessageToReadableArray} from "utils/formatting/transactions";
import {formatDenomToString, formatFromBaseDenom, formatFromDenom} from "utils/formatting/coins";
import coinConfig from "../../../coin.config";
import {fetchChainStats, selectChainStats} from "store/slices/getChainStats";

export default function TransactionPage() {

	const dispatch = useDispatch();
	const router = useRouter();
	const { transactionSlug } = router.query;
	const { data, status } = useSelector(selectTransaction);
	const { data: chainData, status: chainStatus } = useSelector(selectChainStats);
	const { t } = useTranslation();

	useEffect(() => {
		if (!!transactionSlug) {
			dispatch(fetchTransaction({ transactionSlug }));
			dispatch(fetchChainStats());
		}
	}, [transactionSlug, dispatch]);

	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __orange">
					<TransactionsIcon/>
				</div>
				<div>
					<h1 className="h-2">Transactions</h1>
				</div>
			</div>
			{ isEmptyObject(data) && status === STATUS.PENDING ? <Preloader/> : null }
			{
				!isEmptyObject(data) && status === STATUS.FULFILLED ? (
					<div className="page-body">
						<Hash title="Hash" value={transactionSlug}/>
						<br/>
						<Box>
							<Tabs className="tabs">
								<TabList className="tabs-buttons">
									<Tab className="tabs-buttons-item">
										<div className="tabs-button">{t('labels:overview')}</div>
									</Tab>
									<Tab className="tabs-buttons-item">
										<div className="tabs-button">{t('labels:logs')}</div>
									</Tab>
									<Tab className="tabs-buttons-item">
										<div className="tabs-button">{t('labels:comments')}</div>
									</Tab>
								</TabList>
								<TabPanel className="tabs-content pt-4">
									<ul className="list-custom">
										<li>
											<span className="color-grey font-16">{t('labels:transaction-hash')}:</span>
											<span className="font-16 font-secondary-bold">{data.txhash}
												<span className="ml-4">
													<Button icon>
														<FileIcon/>
													</Button>
												</span>
											</span>
										</li>
										<li>
											<span className="color-grey font-16">{t('labels:status')}:</span>
											<span className="font-16 font-secondary-bold">
												<span className="table-status font-bold" style={{color: data.code === 0 ? '#2BBF6F' : '#cc0000'}}>
													{data.code === 0 ? t('labels:success') : t('labels:error')}
												</span>
											</span>
										</li>
										{data.code !== 0 &&
											<li>
												<span className="color-grey font-16">{t('labels:error')}:</span>
												<span className="font-16 font-secondary-bold text-right">
													<span className="font-bold" style={{color: '#cc0000'}}>
														{data.rawLog}
													</span>
												</span>
											</li>
										}
										<li>
											<span className="color-grey font-16">{t('labels:block')}:</span>
											<span className="font-16 font-secondary-bold">
											{data.height}
												{/* <span className="font-attention font-12 font-bold ml-2">1 Block Confirmation</span>*/}
											</span>
										</li>
										<li>
											<span className="color-grey font-16">{t('labels:timestamp')}:</span>
											<span className="font-16 font-secondary-bold">{getDateDifferent(data.unixTimestamp * 1000, new Date())} ago ({new Date(data.unixTimestamp * 1000).toLocaleString()})
											</span>
										</li>
										<li>
											<span className="color-grey font-16">{t('labels:transaction-fee')}:</span>
											<span className="font-16 font-secondary-bold">
												{
													data.authInfo.fee.amount ?
														formatDenomToString(data.authInfo.fee.amount[0].amount , data.authInfo.fee.amount[0].denom) :
														formatDenomToString(0, coinConfig.denom)
												}
												{data.authInfo.fee.amount[0].denom === coinConfig.denom ? ` (\$${Math.round(chainData.fiatPrice * formatFromBaseDenom(data.authInfo.fee.amount[0].amount) * 100) / 100})` : ''}
											</span>
										</li>
									</ul>
									<br/>
									{/*<div className="d-flex justify-content-center">
										<button className="btn btn-md btn-more">
											<svg width="8" height="9" viewBox="0 0 8 9">
												<path
													d="M4.5 1C4.5 0.723858 4.27614 0.5 4 0.5C3.72386 0.5 3.5 0.723858 3.5 1L4.5 1ZM3.64645 8.35355C3.84171 8.54882 4.15829 8.54882 4.35355 8.35355L7.53553 5.17157C7.7308 4.97631 7.7308 4.65973 7.53553 4.46447C7.34027 4.2692 7.02369 4.2692 6.82843 4.46447L4 7.29289L1.17157 4.46447C0.976311 4.2692 0.659728 4.2692 0.464466 4.46447C0.269204 4.65973 0.269204 4.97631 0.464466 5.17157L3.64645 8.35355ZM3.5 1L3.5 8L4.5 8L4.5 1L3.5 1Z"
													fill="currentColor"/>
											</svg>
											<span className="btn-title">See more</span>
											<svg width="8" height="9" viewBox="0 0 8 9">
												<path
													d="M4.5 1C4.5 0.723858 4.27614 0.5 4 0.5C3.72386 0.5 3.5 0.723858 3.5 1L4.5 1ZM3.64645 8.35355C3.84171 8.54882 4.15829 8.54882 4.35355 8.35355L7.53553 5.17157C7.7308 4.97631 7.7308 4.65973 7.53553 4.46447C7.34027 4.2692 7.02369 4.2692 6.82843 4.46447L4 7.29289L1.17157 4.46447C0.976311 4.2692 0.659728 4.2692 0.464466 4.46447C0.269204 4.65973 0.269204 4.97631 0.464466 5.17157L3.64645 8.35355ZM3.5 1L3.5 8L4.5 8L4.5 1L3.5 1Z"
													fill="currentColor"/>
											</svg>
										</button>
									</div>*/}
								</TabPanel>
								<TabPanel className="tabs-content pt-4">
									{ data.logs ?
										(PrettyPrintJson(data.logs))
										 :
										("No logs to parse")
									}
								</TabPanel>
								<TabPanel className="tabs-content pt-4">
								
								</TabPanel>
							</Tabs>
						</Box>
						<Box title="Messages" adaptiveHeight>
							<div className="row">
								{data.tx.body.messages.map( (txdata, index) => (
									<div key={index} className="col-lg-6">
										<div className="d-flex align-items-center mt-3">
											<div className="box-header-thumb color-orange __30 mr-3">
												<PercentIcon/>
											</div>
											<p className="font-book">{formatMessageToReadableArray(txdata)[1]}</p>
										</div>
										<hr className="hr"/>
										{formatMessageToReadableArray(txdata)[0]
											? <List data={formatMessageToReadableArray(txdata)[2]}/>
											: PrettyPrintJson(txdata)}
									</div>
								))}
							</div>
						</Box>
					</div>
				) : <ErrorBlock/>
			}
		</>
	)
}
