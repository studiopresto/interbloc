import {useEffect} from 'react';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {useRouter} from 'next/router';
import Hash from 'ui/components/Hash';
import Preloader from 'ui/components/Preloader';
import ProgressMultiple from 'ui/components/ProgressMultiple';
import Box from 'ui/components/Box';
import DirectoryIcon from 'ui/icons/Directory';
import coinConfig from '../../../coin.config';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAccount, selectAccount} from 'store/slices/getAccount';
import {STATUS} from 'config/constants';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import {formatFromBaseDenom} from 'utils/formatting/coins';
import {fetchTransactionsByAccount, selectTransactionsByAccount} from 'store/slices/getTransactionsByAccountSlice';
import {getInfoForDenom} from 'utils/formatting/chain';
import TransactionList from 'components/TransactionList';
import {fetchChainStats, selectChainStats} from 'store/slices/getChainStats';

const Assets = dynamic(async () => {
	return await import('components/Assets');
}, {ssr: false, loading: () => <Preloader/>});


export default function AccountPage() {
	
	const per_page = 10;
	const router = useRouter();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	
	const {addressSlug} = router.query;
	const {data, status} = useSelector(selectAccount)
	const {data: transactionData, status: transactionsStatus} = useSelector(selectTransactionsByAccount)
	const {data: chainData, status: chainStatus} = useSelector(selectChainStats)
	
	useEffect(() => {
		if (!!addressSlug) {
			dispatch(fetchAccount({accountSlug: addressSlug}))
			dispatch(fetchTransactionsByAccount({addressSlug: addressSlug, per_page: per_page}))
		}
		dispatch(fetchChainStats());
		
	}, [dispatch, addressSlug])
	
	if (isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>;
	}
	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		const delegationsProgress = () => {
			const unbondings = data.unbondings.reduce((pv, cv) => pv + Number(cv.amount), 0);
			const delegations = data.delegations.reduce((pv, cv) => pv + Number(cv.amount), 0);
			const redelegations = data.redelegations.reduce((pv, cv) => pv + Number(cv.amount), 0);
			const total = unbondings + delegations + redelegations
			return [
				{
					title: 'Delegated',
					value: (delegations > 0) ? Math.round((delegations / total) * 10000) / 100 : 0,
				},
				{
					title: 'Unbondings',
					value: (unbondings > 0) ? Math.round((unbondings / total) * 10000) / 100 : 0,
					
				},
				{
					title: 'Redelegations',
					value: (redelegations > 0) ? Math.round((redelegations / total) * 10000) / 100 : 0,
				},
			];
		}
		
		const balanceProgress = () => {
			let rawBalances = [];
			let totalBalance = 0;
			Object.entries(data.balances).map(([index, value]) => {
				const assetData = getInfoForDenom(index)
				if (assetData.ticker !== index) {
					rawBalances.push({
						title: assetData.ticker,
						value: value / (10 ** assetData.exponent)
					})
					totalBalance = totalBalance + (value / (10 ** assetData.exponent))
				}
			})
			
			rawBalances.map((element, index) => {
				element.value = Math.round((element.value / totalBalance) * 10000) / 100;
				rawBalances[index] = element;
			})
			return rawBalances
		}
		
		return (
			<>
				<div className="page-header-inner">
					<div className="page-header-thumb __violet">
						<DirectoryIcon/>
					</div>
					<div>
						<h1 className="h-2 word-break-all">{addressSlug}</h1>
						<p className="font-16 font-secondary-bold">{coinConfig.ticker}: <span className="color-violet">${chainStatus === STATUS.FULFILLED ? chainData.fiatPrice : 'Loading'}</span></p>
					</div>
				</div>
				<div className="page-body">
					<Hash title={t('labels:address')} value={addressSlug}/>
					<div className="row">
						<div className="col-lg-6">
							<Assets balances={data.balances}/>
						</div>
						<div className="col-lg-6">
							<div className="h-100">
								<Box>
									<Tabs className="tabs">
										<TabList className="tabs-buttons">
											<Tab className="tabs-buttons-item">
												<div className="tabs-button">{t('labels:delegations')}</div>
											</Tab>
											<Tab className="tabs-buttons-item">
												<div className="tabs-button">{t('labels:unbondings')}</div>
											</Tab>
											<Tab className="tabs-buttons-item">
												<div className="tabs-button">{t('labels:redelegations')}</div>
											</Tab>
											<Tab className="tabs-buttons-item">
												<div className="tabs-button">{t('labels:vestings')}</div>
											</Tab>
										</TabList>
										<TabPanel className="tabs-content pt-2">
											<table className="table">
												<thead>
													<tr>
														<th>{t('labels:validator')}</th>
														<th>{t('labels:amount')}</th>
													</tr>
												</thead>
												<tbody>
												{
													data.delegations.map((delegation, index) => {
														return (
															<tr key={index}>
																<td data-title={t('labels:validator')}>
																	<span className="font-secondary-bold">Everstake</span>
																</td>
																<td data-title={t('labels:amount')}>
																	<span className="font-bold">{formatFromBaseDenom(delegation.amount)} {coinConfig.ticker}</span>
																</td>
															</tr>
														)
													})
												}
												</tbody>
											</table>
										</TabPanel>
										<TabPanel className="tabs-content pt-2">
											<table className="table">
												<thead>
												<tr>
													<th>{t('labels:validator')}</th>
													<th>{t('labels:amount')}</th>
												</tr>
												</thead>
												<tbody>
												{
													data.unbondings.map((delegation, index) => {
														return (
															<tr key={index}>
																<td data-title={t('labels:validator')}>
																	<span className="font-secondary-bold">Everstake</span>
																</td>
																<td data-title={t('labels:amount')}>
																	<span className="font-bold">{formatFromBaseDenom(delegation.amount)} {coinConfig.ticker}</span>
																</td>
															</tr>
														)
													})
												}
												</tbody>
											</table>
										</TabPanel>
										<TabPanel className="tabs-content pt-2">
											<table className="table">
												<thead>
												<tr>
													<th>{t('labels:validator')}</th>
													<th>{t('labels:amount')}</th>
													<th>{t('labels:reward')}</th>
												</tr>
												</thead>
												<tbody>
												{
													
													data.redelegations.map((delegation, index) => {
														return (
															<tr key={index}>
																<td data-title={t('labels:validator')}>
																	<span className="font-secondary-bold">Everstake</span>
																</td>
																<td data-title={t('labels:amount')}>
																	<span className="font-bold">{formatFromBaseDenom(delegation.amount)} {coinConfig.ticker}</span>
																</td>
																<td data-title={t('labels:reward')}>
																	<span className="font-bold">0,00001 ATOM</span>
																</td>
															</tr>
														)
													})
												}
												</tbody>
											</table>
										</TabPanel>
										<TabPanel className="tabs-content pt-2">
											<table className="table">
												<thead>
												<tr>
													<th>{t('labels:validator')}</th>
													<th>{t('labels:amount')}</th>
												</tr>
												</thead>
												<tbody>
												{
													Array.from({length: 0}).map((_, index) => (
														<tr key={index}>
															<td data-title={t('labels:validator')}>
																<span className="font-secondary-bold">Digital</span>
															</td>
															<td data-title={t('labels:amount')}>
																<span className="font-bold">5,5000 ATOM</span>
															</td>
														</tr>
													))
												}
												</tbody>
											</table>
										</TabPanel>
									</Tabs>
								</Box>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<ProgressMultiple data={balanceProgress()} label="bottom"/>
						</div>
						<div className="col-6">
							<ProgressMultiple data={delegationsProgress()} label="bottom"/>
						</div>
					</div>
					<div className="row">
						<TransactionList transactionData={transactionData} address={addressSlug}/>
					</div>
				</div>
			</>
		)
	}
}
