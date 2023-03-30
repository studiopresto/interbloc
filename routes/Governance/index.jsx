import dynamic from 'next/dynamic';
/*
Components
 */
import Preloader from '~ui/components/Preloader';
/*
Icons
 */
import EyeIcon from '~ui/icons/Eye';
import {useEffect} from "react";
import {STATUS} from "~config/constants";
import ErrorBlock from "~ui/components/Error";
import {useDispatch, useSelector} from "react-redux";
import {data} from "./data";
/*
Store
 */
import {fetchGovernanceProposals, selectGovernanceProposals} from "~store/slices/getGovernanceProposals";
import Link from "next/link";
import routes from "~config/routes";

/*
Lazy components
 */
const GovernanceChart = dynamic(async () => {
	return await import('~components/GovernanceChart');
}, { ssr: false, loading: () => <Preloader/> });
const GovernanceList = dynamic(async () => {
	return await import('~routes/Governance/List');
}, { ssr: false, loading: () => <Preloader/> });



export default function GovernancePage() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectGovernanceProposals);

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
						<h1 className="h-2">Governance Overview</h1>
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