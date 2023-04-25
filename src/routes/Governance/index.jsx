import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import Link from "next/link";
import Preloader from 'ui/components/Preloader';
import EyeIcon from 'ui/icons/Eye';
import {STATUS} from "config/constants";
import ErrorBlock from "ui/components/Error";
import {fetchGovernanceProposals, selectGovernanceProposals} from "store/slices/getGovernanceProposals";
import routes from "config/routes";

const GovernanceChart = dynamic(async () => {
	return await import('components/GovernanceChart');
}, { ssr: false, loading: () => <Preloader/> });
const GovernanceList = dynamic(async () => {
	return await import('./List');
}, { ssr: false, loading: () => <Preloader/> });

export default function GovernancePage() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectGovernanceProposals);
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(fetchGovernanceProposals({ per_page: 500, page: 1 }));
	}, [dispatch]);
	if (data == null && status === STATUS.REJECTED) {
		return <ErrorBlock/>
	}

	if (!data.length && status === STATUS.PENDING) {
		return <Preloader/>;
	}
	if (status === STATUS.FULFILLED && data.proposals.length) {
		return (
			<>
				<div className="page-header-inner">
					<div className="page-header-thumb __turquoise">
						<EyeIcon/>
					</div>
					<div>
						<h1 className="h-2">{t('governance:page-title')}</h1>
					</div>
				</div>
				<div className="page-body">
					<div className="row">
						{
							data.proposals.slice(0, 6).map((option, key) => (
								<div className="col-12 col-lg-6" key={key}>
									<div className="governance-box">
										<Link href={`${routes.public.proposal}/${option.proposalId}`}>
											<a className={"w-100"}>
												<GovernanceChart data={option}/>
											</a>
										</Link>
									</div>
								</div>
							))
						}
					</div>
					<div className="row">
						<div className="col-12">
							<GovernanceList/>
						</div>
					</div>
				</div>
			</>
		)
	}
}