import {useEffect} from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import {useDispatch, useSelector} from 'react-redux';
import Link from 'next/link';
import routes from 'config/routes';
import {fetchBlock, selectBlock} from 'store/slices/getBlockSlice';
import BlocksIcon from 'ui/icons/Blocks';
import EyeIcon from 'ui/icons/Eye';
import SortDirectionIcon from 'ui/icons/SortDirection';
import Hash from 'ui/components/Hash';
import ProgressMultiple from 'ui/components/ProgressMultiple';
import Box from 'ui/components/Box';
import List from 'ui/components/List2';
import Preloader from 'ui/components/Preloader';
import Button from 'ui/components/Button';
import {STATUS} from 'config/constants';
import ErrorBlock from 'ui/components/Error';
import {formatMessageToObject} from 'utils/formatting/transactions';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import {extractBlockData} from 'utils/formatting/block';
import {getDateDifferent} from 'utils/date/getDateDifferent';
import {formatCoinArrayToString, formatDenomToString} from 'utils/formatting/coins';
import {
	fetchValidatorsAddressConversion,
	selectValidatorsAddressConversion
} from 'store/slices/getValidatorsAddressConversion';
import Thumbnail from 'ui/components/Thumbnail/Thumbnail';

const TransactionTypes = dynamic(async () => {
	return await import('components/TransactionTypes');
}, {ssr: false, loading: () => <Preloader/>});

export default function BlockOpenPage() {
	const router = useRouter();
	const dispatch = useDispatch();
	const {blockSlug} = router.query;
	const {data, status} = useSelector(selectBlock);
	const {data: addressConversion, status: addressConversionStatus} = useSelector(selectValidatorsAddressConversion);
	const {t} = useTranslation();
	
	useEffect(() => {
			if (!!blockSlug) {
				dispatch(fetchBlock({blockSlug, include_transaction_data: true}));
				dispatch(fetchValidatorsAddressConversion({height: blockSlug}));
			}
		},
		[blockSlug, dispatch]);
	
	const gas = [{title: t('labels:gas-used'), value: 100}, {title: t('labels:gas-wanted'), value: 0}];
	let sign = [{title: t('labels:signed'), value: 100}, {title: t('labels:missed'), value: 0}];
	let info = []
	let aggregated = {
		'types': {},
		'failed': 0,
		'total': 0,
		'gas': {
			'used': 0,
			'wanted': 0
		}
		
	}
	
	
	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		if (Object.keys(data.data).includes('txs')) {
			let gasWanted = 0;
			let gasUsed = 0;
			for (const [key, value] of Object.entries(data.data.txs)) {
				value.code !== 0 ? aggregated.failed++ : null; // Increase failed counter if code is not 0
				aggregated.total++
				
				// Add gas to aggregated data
				gasUsed += parseInt(value.gasUsed)
				gasWanted += parseInt(value.gasWanted)
				
				// Loop through all messages in transaction to get transaction types
				Object.values(value.tx.body.messages).forEach(x => {
					let type = formatMessageToObject(x).title
					Object.keys(aggregated.types).includes(type) ? aggregated.types[type]++ : aggregated.types[type] = 1;
				});
			}
			// Update gas
			aggregated.gas.used = gasUsed
			aggregated.gas.wanted = gasWanted
			
			const gasUsedRatio = gasUsed / gasWanted
			gas[0].value = gasUsedRatio * 100;
			gas[1].value = (1 - gasUsedRatio) * 100;
			
			
		}
		if (Object.keys(data).includes('signatures')) {
			let signed = 0;
			let missed = 0;
			
			for (const [key, signature] of Object.entries(data.signatures)) {
				signature.blockIdFlag === 'BLOCK_ID_FLAG_COMMIT' ? signed++ : missed++;
				
			}
			// Make signed and missed a percentage
			let signaturesTotal = signed + missed;
			sign[0].value = signed / signaturesTotal * 100;
			sign[1].value = missed / signaturesTotal * 100;
		}
		
		
		info = extractBlockData(data, aggregated, t)
		if (addressConversionStatus === STATUS.FULFILLED) {
			info[7].value.title = info[7].value.title in addressConversion ? addressConversion[info[7].value.title].description.moniker : info[7].value.title;
		}
	}
	
	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __turquoise">
					<BlocksIcon/>
				</div>
				<div>
					<h1 className="h-2">{t('common:page-block')}: {data?.header?.height ? data.header.height : null}</h1>
				</div>
			</div>
			{status === STATUS.PENDING || status === STATUS.IDLE ? <Preloader/> : null}
			{isEmptyObject(data) || status === STATUS.REJECTED ? <ErrorBlock/> : null}
			{!isEmptyObject(data) && status === STATUS.FULFILLED ? (
				<div className="page-body">
					<Hash title="Hash" value={data.hash}/>
					<div className="row">
						<div className="col-md-6">
							<ProgressMultiple data={gas} label="top"/>
						</div>
						<div className="col-md-6">
							<ProgressMultiple data={sign} label="top"/>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6">
							<Box title={t('common:box-block-info')}>
								<List data={info}/>
							</Box>
							<Box title={t('common:transaction-types')}>
								{Object.keys(aggregated.types).length === 0
									? <span>There are no transactions in this block</span>
									: <TransactionTypes types={aggregated.types}/>}
							</Box>
						</div>
						<div className="col-lg-6">
							<Box title={t('common:box-signatures')}>
								<div className="overflow-auto" style={{maxHeight: 867}}>
									{isEmptyObject(addressConversion) ? <Preloader/>
										: (
											<table className="table">
												<thead>
												<tr>
													<th>{t('labels:validator')}</th>
													<th>{t('labels:period')}</th>
												</tr>
												</thead>
												<tbody>
												{data.signatures.map((signature, index) => (<tr key={index}>
														{signature.blockIdFlag !== 'BLOCK_ID_FLAG_ABSENT' ? (<>
																<td data-title={t('labels:validator')}>
																	<div className="d-inline-flex align-items-center">
																		<div className="thumb size-30 position-left">
																			{signature.validatorAddress in addressConversion
																				? <Thumbnail src={`validator/keybase/image/${addressConversion[signature.validatorAddress].description.identity}`} alt={addressConversion[signature.validatorAddress].description.moniker + ' logo'} id={addressConversion[signature.validatorAddress].description.identity}/>
																				: null}
																		</div>
																		<span className="font-secondary-bold">
																		{signature.validatorAddress in addressConversion
																			? addressConversion[signature.validatorAddress].description.moniker
																			: signature.validatorAddress}
																	</span>
																	</div>
																</td>
																<td data-title={t('labels:period')}>
																	<span className="font-book">{getDateDifferent(signature.timestamp, new Date())}</span>
																</td>
															</>
														) : null}
													</tr>
												))}
												</tbody>
											</table>
										)}
								</div>
							</Box>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<div className="table-box">
								<div className="table-header">
									<p className="font-16">
                    <span className="mr-3">
	                    <SortDirectionIcon/>
                    </span>
										<span className="color-turquoise">{Object.keys(data.data).includes('txs') ? (data.data.txs.length) : (0)}</span> transaction(s) ( {aggregated.failed}
										<span className="color-danger">Failed</span> )
									</p>
								</div>
								<table className="table">
									<thead>
									<tr>
										<th/>
										<th>{t('labels:txs-hash')}</th>
										<th>{t('labels:method')}</th>
										<th>{t('labels:status')}</th>
										<th>{t('labels:value')}</th>
										<th>{t('labels:txn-fee')}</th>
										<th/>
									</tr>
									</thead>
									<tbody>
									{Object.keys(data.data).includes('txs') ? (data.data.txs.map((txdata, index) => (
										<tr key={index}>
											<td className="hidden-sm">
												<Link href={`${routes.public.transactions}/${txdata.txhash}`}>
													<a>
														<Button icon color="transparent">
															<EyeIcon/>
														</Button>
													</a>
												</Link>
											</td>
											<td data-title={t('labels:txs-hash')}>
												<Link href={`${routes.public.transactions}/${txdata.txhash}`}>
                          <a className="color-turquoise font-secondary-bold font-hash">{txdata.txhash}</a>
												</Link>
											</td>
											<td data-title={t('labels:method')}>
                        <span className="color-violet font-12 font-bold status">
	                        {formatMessageToObject(txdata.tx.body.messages[0]).title}
                        </span>
											</td>
											<td data-title={t('labels:status')}>
												{txdata.code === 0 ? (<span
													className="font-book color-success">Success</span>) : (
													<span className="font-book color-danger">Error</span>
												)}
											</td>
											<td data-title={t('labels:value')}>
                        <span className="font-book">
	                        {
		                        Object.keys(txdata.tx.body.messages[0]).includes('amount') &&
		                        formatMessageToObject(txdata.tx.body.messages[0]).amount
			                        ? (formatMessageToObject(txdata.tx.body.messages[0]).amount.title)
			                        : 'Not identifiable'
	                        }
                        </span>
											</td>
											<td data-title={t('labels:txn-fee')}>
                        <span className="font-book">
                            {
	                            txdata.authInfo.fee.amount ?
		                            formatCoinArrayToString(txdata.authInfo.fee.amount) :
		                            formatCoinArrayToString(0)
                            }
                        </span>
											</td>
											<td/>
										</tr>))) : ('')}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	)
}

