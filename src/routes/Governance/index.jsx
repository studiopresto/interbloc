import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Preloader from 'ui/components/Preloader';
import GovernanceList from './List';
import EyeIcon from 'ui/icons/Eye';
import {PROPOSAL_STATUS, STATUS} from 'config/constants';
import ErrorBlock from 'ui/components/Error';
import routes from 'config/routes';
import SelectCustom from 'ui/components/Select';
import EmptyBlock from 'ui/components/Empty/EmptyBlock';
import Pagination from 'components/Pagination';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import {fetchGovernanceProposals, selectGovernanceProposals} from 'store/slices/getGovernanceProposals';
import SortButton from '../../components/SortButton';

const GovernanceChart = dynamic(async () => {
	return await import('components/GovernanceChart');
}, {ssr: false, loading: () => <Preloader/>});

export default function GovernancePage() {
	
	const dispatch = useDispatch();
	const {query: {page = 1}} = useRouter();
	const {data, status} = useSelector(selectGovernanceProposals);
	const [sort, setSort] = useState({
		order_by: 'proposalId',
		order_direction: 'asc'
	});
	const {t} = useTranslation();
	
	const filterOptions = [
		{value: 'all', label: t('labels:all')},
		{value: PROPOSAL_STATUS.REJECTED, label: t('labels:rejected')},
		{value: PROPOSAL_STATUS.PASSED, label: t('labels:passed')},
		{value: PROPOSAL_STATUS.DEPOSIT_PERIOD, label: t('labels:deposit-period')},
		{value: PROPOSAL_STATUS.VOTING_PERIOD, label: t('labels:voting-period')}
	];
	
	const sortOptions = [
		{value: 'proposalId', label: `#${t('labels:id')}`},
		{value: 'votingStartTime', label: t('labels:voting-start')},
	];
	
	useEffect(() => {
		dispatch(fetchGovernanceProposals({page, ...sort}));
	}, [dispatch, page, sort]);
	
	const handleSort = useCallback((newSort) => {
		setSort(newSort)
	}, [setSort, sort])
	
	const handleSortSelect = useCallback((e) => {
		setSort(prevState => {
			return {...prevState, order_by: e.value}
		})
	}, [])
	
	const handleFilter = useCallback((e) => {
		console.log('filter, e', e)
	}, [])
	
	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __turquoise"><EyeIcon/></div>
				<div><h1 className="h-2">{t('governance:page-title')}</h1></div>
			</div>
			{status === STATUS.PENDING || status === STATUS.IDLE ? <Preloader/> : null}
			{isEmptyObject(data) || status === STATUS.REJECTED ? <ErrorBlock/> : null}
			{status === STATUS.FULFILLED && !data.proposals.length ? <EmptyBlock/> : null}
			{status === STATUS.FULFILLED && data.proposals.length ? (
				<div className="page-body">
					<div className="row">
						{data.proposals.slice(0, 6).map((option, key) => (
							<div className="col-12 col-lg-6" key={key}>
								<div className="governance-box">
									<Link href={`${routes.public.proposal}/${option.proposalId}`}>
										<a className={'w-100'}>
											<GovernanceChart data={option}/>
										</a>
									</Link>
								</div>
							</div>
						))}
					</div>
					<div className="row">
						<div className="col-12">
							<div className="table-box mt-2">
								<div className="table-header mb-4">
									<div className="row">
										<div className="col-12 col-md-4">
											<p className="font-20 font-bold">{t('common:box-list-governance')}</p>
										</div>
										<div className="col-12 col-md-8">
											<div className="governance-table-header">
												<div className="d-flex align-items-center governance-sort">
													<p className="color-grey mr-3">{t('labels:sort-by')}:</p>
													<SelectCustom
														options={sortOptions}
														onChange={handleSortSelect}
														defaultValue={sortOptions.filter(option => option.value === sort.order_by)[0]}/>
													<SortButton
														onSort={handleSort}
														sort={sort}
														value={sort.order_by}/>
												</div>
												{/*<div className="d-flex align-items-center">*/}
												{/*	<p className="color-grey mr-3">{t('labels:filter-by')} {t('labels:status').toLowerCase()}:</p>*/}
												{/*	<SelectCustom options={filterOptions} onChange={handleFilter} defaultValue={filterOptions[0]}/>*/}
												{/*</div>*/}
											</div>
										</div>
									</div>
								</div>
								<GovernanceList data={data} onSort={handleSort} sort={sort}/>
								<div className="d-flex justify-content-center pt-5">
									<Pagination
										pageCount={data.pagination.totalPages}
										page={page}
										limit={10}
										url={routes.public.governance}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	)
}