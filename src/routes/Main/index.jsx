import dynamic from 'next/dynamic';
import Image from 'next/image';
import logo from '../../../public/static/images/logo-white.png';
import Preloader from 'ui/components/Preloader';
import Box from 'ui/components/Box';
import BlocksIcon from 'ui/icons/Blocks';
import RSSIcon from 'ui/icons/RSS';
import PhoneIcon from 'ui/icons/Phone';
import UnionIcon from 'ui/icons/Union';
import useTranslation from 'next-translate/useTranslation';

const BlocksLatest = dynamic(async () => {
	return await import('components/BlocksLatest');
}, { ssr: false, loading: () => <Preloader/> });
const Tokenomics = dynamic(async () => {
	return  await import('components/Tokenomics');
}, { ssr: false, loading: () => <Preloader/> });
const Mempool = dynamic(async () => {
	return await import('components/Mempool');
}, { ssr: false, loading: () => <Preloader/> });
const Prices = dynamic(async () => {
	return await import('components/Prices');
}, { ssr: false, loading: () => <Preloader/> });
const Consensus = dynamic(async () => {
	return await import('components/Consensus');
}, { ssr: false, loading: () => <Preloader/> });
const NodeLocations = dynamic(async () => {
	return await import('components/NodeLocations');
}, { ssr: false, loading: () => <Preloader/> });
const TransactionsMain = dynamic(async () => {
	return await import('./Transactions');
}, { ssr: false, loading: () => <Preloader/> });
const BlocksMain = dynamic(async () => {
	return await import('./Blocks');
}, { ssr: false, loading: () => <Preloader/> });

export default function MainPage() {
	
	const { t } = useTranslation();
	
	return (
		<>
			<div className="page-header">
				<div className="d-md-flex align-items-md-center">
					<div className="page-header-icon">
						<Image src={logo} width={132} height={31}/>
					</div>
					<div>
						<h1 className="h-1">{t('home:page-title')}</h1>
						<p className="h-3">{t('home:page-subtitle')}</p>
					</div>
				</div>
				{/*<Button href="#" label="Projects" color="primary" withIcon>*/}
				{/*	<ArrowLongIcon/>*/}
				{/*</Button>*/}
			</div>
			<div className="row">
				<div className="col-xl-3 col-md-6">
					<Box title={t('common:box-blocks')} theme={1} icon={<BlocksIcon/>} color="turquoise" staticHeight>
						<BlocksLatest/>
					</Box>
				</div>
				<div className="col-xl-3 col-md-6">
					<Box title={t('common:box-tokenomics')} theme={2} icon={<UnionIcon/>} color="orange">
						<Tokenomics/>
					</Box>
				</div>
				<div className="col-xl-3 col-md-6">
					<Box title={t('common:box-relayers')} theme={3} icon={<RSSIcon/>} color="blue" staticHeight>
						<div className="h-100">
							<div className="d-flex flex-column justify-content-end">
								<p className="font-16 color-grey font-bold">{t('labels:packets-pending')}:</p>
								<p className="h-2 mb-4">{t('labels:soon')}</p>
								<div className="dot-row">
									<p className="color-grey font-bold dot-row-title">Osmosis {t('labels:channel')} - 1:</p>
									<div className="dot-row-item">
										<div className="dot-row-icon bg-success"/>
									</div>
								</div>
								<div className="dot-row mt-3">
									<p className="color-grey font-bold dot-row-title">Juno {t('labels:channel')} - 2:</p>
									<div className="dot-row-item">
										<div className="dot-row-icon bg-danger"/>
									</div>
								</div>
							</div>
						</div>
					</Box>
				</div>
				<div className="col-xl-3 col-md-6">
					<Box title={t('common:box-mempool')} theme={4} icon={<PhoneIcon/>} color="violet">
						<Mempool/>
					</Box>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-6">
					<Box title={t('common:box-price-statistics')} theme={1}>
						<Prices/>
					</Box>
				</div>
				<div className="col-xl-3 col-md-6">
					<Box title={t('common:box-consensus')} theme={3}>
						<Consensus/>
					</Box>
				</div>
				<div className="col-xl-3 col-md-6">
					<Box title={t('common:box-node-locations')} theme={4}>
						<NodeLocations/>
					</Box>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-6">
					<Box title={t('common:box-transactions')}>
						<TransactionsMain/>
					</Box>
				</div>
				<div className="col-xl-6">
					<Box title={t('common:box-blocks')}>
						<BlocksMain/>
					</Box>
				</div>
			</div>
		</>
	)
}
