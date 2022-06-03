import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
/*
Store
 */
import {fetchTransaction, selectTransaction} from '~store/slices/getTransactionSlice';
/*
Components
 */
import Hash from '~ui/components/Hash';
import Preloader from '~ui/components/Preloader';
import List from '~ui/components/List';
import ErrorBlock from '~ui/components/Error';
import Box from '~ui/components/Box';
import Button from '~ui/components/Button';
/*
Icons
 */
import TransactionsIcon from '~ui/icons/Transactions';
import FileIcon from '~ui/icons/File';
import PercentIcon from '~ui/icons/Percent';
import SendIcon from '~ui/icons/Send';
/*
Utils
 */
import {isEmptyObject} from '~utils/object/detectEmptyObject';
/*
Config
 */
import {STATUS} from '~config/constants';



export default function TransactionPage() {

	const dispatch = useDispatch();
	const router = useRouter();
	const { transactionSlug } = router.query;
	const { data, status } = useSelector(selectTransaction);

	useEffect(() => {
		if (!!transactionSlug) {
			dispatch(fetchTransaction({ transactionSlug }));
		}
	}, [transactionSlug, dispatch]);

	const reward = [
		['Delegator Address', 'cosmosh1fkjhdasa1fsdkalkjhlgjhdkjhglkjhj4559adjfj;lf'],
		['Validator Address', `cosmosvaloper140lfgdfas342525lkslfgklkl52ll2k2lklgglh; <br/> (Craft Airdrop Bo..)`],
		['Amount', '0.217814 ATOM'],
	];
	const send = [
		['From Address', 'cosmoshub3113188fggdfsgtk342cvx9422cva14'],
		['To Address', 'cosmow1wqyb45kcjvlslgjfskfgbnvbxjlqwrqlj'],
		['Amount', '62.00453 ATOM'],
	];

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
										<div className="tabs-button">Overview</div>
									</Tab>
									<Tab className="tabs-buttons-item">
										<div className="tabs-button">Logs (4)</div>
									</Tab>
									<Tab className="tabs-buttons-item">
										<div className="tabs-button">Comments</div>
									</Tab>
								</TabList>
								<TabPanel className="tabs-content pt-4">
									<ul className="list-custom">
										<li>
											<span className="color-grey font-16">Transaction Hash:</span>
											<span className="font-16 font-secondary-bold">
										{data.hash}
												<span className="ml-4">
										<Button icon>
											<FileIcon/>
										</Button>
									</span>
								</span>
										</li>
										<li>
											<span className="color-grey font-16">Status:</span>
											<span className="font-16 font-secondary-bold">
									<span className="table-status font-bold" style={{color: '#2BBF6F'}}>Success</span>
								</span>
										</li>
										<li>
											<span className="color-grey font-16">Block:</span>
											<span className="font-16 font-secondary-bold">
									14685683
									<span className="font-attention font-12 font-bold ml-2">1 Block Confirmation</span>
								</span>
										</li>
										<li>
											<span className="color-grey font-16">Timestamp:</span>
											<span className="font-16 font-secondary-bold">
									36 secs ago (Apr-30-2022 12:48:51 PM+UTC)
									<span className="font-attention font-12 font-bold ml-2">Confirmed within 30 secs</span>
								</span>
										</li>
										<li>
											<span className="color-grey font-16">Value:</span>
											<span className="font-16 font-secondary-bold">
									($935.74)
									<span className="font-attention font-12 font-bold ml-2">0.331 Ether</span>
								</span>
										</li>
										<li>
											<span className="color-grey font-16">Transaction Fee:</span>
											<span className="font-16 font-secondary-bold">0.0000344342425777456335353 Ether ($13.51)</span>
										</li>
									</ul>
									<br/>
									<div className="d-flex justify-content-center">
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
									</div>
								</TabPanel>
								<TabPanel className="tabs-content pt-4">
									#2
								</TabPanel>
								<TabPanel className="tabs-content pt-4">
									#3
								</TabPanel>
							</Tabs>
						</Box>
						<Box title="Messages" adaptiveHeight>
							<div className="row">
								<div className="col-lg-6">
									<div className="d-flex align-items-center mt-3">
										<div className="box-header-thumb color-orange __30 mr-3">
											<PercentIcon/>
										</div>
										<p className="font-book">Get Reward</p>
									</div>
									<hr className="hr"/>
									<List data={reward}/>
								</div>
								<div className="col-lg-6">
									<div className="d-flex align-items-center mt-3">
										<div className="box-header-thumb color-blue __30 mr-3">
											<SendIcon/>
										</div>
										<p className="font-book">Send</p>
									</div>
									<hr className="hr"/>
									<List data={send}/>
								</div>
							</div>
						</Box>
					</div>
				) : (
					<ErrorBlock/>
				)
			}
		</>
	)
}