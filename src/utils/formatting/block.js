import {getDateDifferent} from 'utils/date/getDateDifferent';
import hashShortening from 'utils/string/hashShortening';
import routes from 'config/routes';

export const extractBlockData = (b, a, t) => {
	const header = b.header;
	return [
		{
			label: t('labels:chain-id'),
			value: {
				title: header.chainId,
			}
		},
		{
			label: t('labels:height'),
			value: {
				title: header.height,
			}
		},
		{
			label: t('labels:block-time'),
			value: {
				title: `${getDateDifferent(header.time * 1000, new Date())} ago (${new Date(header.time * 1000).toLocaleString()})`,
			}
		},
		{
			label: t('labels:block-hash'),
			value: {
				title: hashShortening(b.hash),
			}
		},
		{
			label: t('labels:number-tx'),
			value: {
				title: a.total,
			}
		},
		{
			label: t('labels:gas'),
			value: {
				title: t('labels:out-of', {count: a.gas.used, total: a.gas.wanted}),
			}
		},
		{
			label: t('labels:consensus-time'),
			value: {
				title: t('labels:soon'),
			}
		},
		{
			label: t('labels:proposer'),
			value: {
				title: header.proposerAddress.toUpperCase(),
				href: `${routes.public.account}/${header.proposerAddress.toUpperCase()}`,
				newTab: true,
			}
		},
	]
}
