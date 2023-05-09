import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import NumberFormat from 'react-number-format';
import Dot from 'ui/components/Dot';
import SortIcon from 'ui/icons/Sort';
import {formatFromBaseDenom} from 'utils/formatting/coins';
import {formatProposalStatus} from 'utils/formatting/governanceProposals';
import {getDateFromTimestamp} from 'utils/date/getDateFromTimestamp';
import SortButton from 'components/SortButton';
import routes from 'config/routes';

export default function GovernanceList({ data = {}, onSort = null, sort = {} }) {
	
	const {t} = useTranslation();
	
	return (
		<table className="table table-large">
			<thead>
			<tr>
				<th>
					<SortButton label={`#${t('labels:id')}`} value="proposalId" sort={sort} onSort={onSort}/>
				</th>
				<th>{t('labels:title')}</th>
				<th>
					<div className="d-flex align-items-center">
						{t('labels:status')}
						{/*<Dot>*/}
						{/*	<SortIcon/>*/}
						{/*</Dot>*/}
					</div>
				</th>
				<th>
					<SortButton label={t('labels:voting-start')} value="votingStartTime" sort={sort} onSort={onSort}/>
				</th>
				<th>
					<div className="d-flex align-items-center">
						{t('labels:submit-time')}
						{/*<Dot>*/}
						{/*	<SortIcon/>*/}
						{/*</Dot>*/}
					</div>
				</th>
				<th>
					<div className="d-flex align-items-center">
						{t('labels:total-deposit')}
						{/*<Dot>*/}
						{/*	<SortIcon/>*/}
						{/*</Dot>*/}
					</div>
				</th>
			</tr>
			</thead>
			<tbody>
			{data.proposals.map((proposal, key) => (
				<tr key={key}>
					<td data-title={`#${t('labels:id')}`}>
						<Link href={`${routes.public.proposal}/${proposal.proposalId}`}>
							<a>
								<span className="color-grey font-book">#{proposal.proposalId}</span>
							</a>
						</Link>
					</td>
					<td data-title={t('labels:title')}>
						<Link href={`${routes.public.proposal}/${proposal.proposalId}`}>
							<a>
								<span className="color-turquoise font-secondary-bold">{proposal.content.title}</span>
							</a>
						</Link>
					</td>
					<td data-title={t('labels:status')}>
						<span className="table-status font-bold" style={{color: formatProposalStatus(proposal.status).color}}>
							{formatProposalStatus(proposal.status).proposalStatus}
						</span>
					</td>
					<td data-title={t('labels:voting-start')}>
						<span className="font-book">{getDateFromTimestamp(proposal.votingStartTime * 1000)}</span>
					</td>
					<td data-title={t('labels:submit-time')}>
						<span className="font-book">{getDateFromTimestamp(proposal.votingEndTime * 100)}</span>
					</td>
					<td data-title={t('labels:total-deposit')}>
						<NumberFormat
							value={Math.round(formatFromBaseDenom(proposal.totalDeposit[0].amount * 100)) / 100}
							displayType="text"
							thousandSeparator={true}
							renderText={(value, props) => {
								return <span className="font-book" {...props}>{value} ATOM</span>;
							}}/>
					</td>
				</tr>
			))}
			</tbody>
		</table>
	)
}