import {useEffect} from 'react';
import Image from 'next/image';
import Link from "next/link";
import {useDispatch, useSelector} from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import NumberFormat from 'react-number-format';
import placeholder from '../../../public/static/images/placeholder.svg';
import {fetchBlocks, selectBlocks} from 'store/slices/getBlocksSlice';
import {fetchValidatorsAddressConversion, selectValidatorsAddressConversion} from "store/slices/getValidatorsAddressConversion";
import Preloader from 'ui/components/Preloader';
import ErrorBlock from 'ui/components/Error';
import {getDateDifferent} from 'utils/date/getDateDifferent';
import {STATUS} from "config/constants";
import routes from "config/routes";
import {isEmptyObject} from "utils/object/detectEmptyObject";

export default function BlocksMain() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectBlocks);
	const { data: validatorData, status: validatorStatus } = useSelector(selectValidatorsAddressConversion);
	const { t } = useTranslation();
	
	useEffect(() => {
		dispatch(fetchBlocks({ limit: 6, per_page: 6, page: 1 }))
		dispatch(fetchValidatorsAddressConversion({ height: 0 }));
	}, [dispatch]);

	if (isEmptyObject(data) || (isEmptyObject(data) && status === STATUS.PENDING)) {
		return <Preloader/>;
	}

	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		
		return (
			<div className="table-box-wrap">
				<div className="table-box">
					<table className="table">
						<thead>
						<tr>
							<th>{t('labels:height')}</th>
							<th>{t('labels:proposer')}</th>
							<th>{t('labels:time')}</th>
						</tr>
						</thead>
						<tbody>
						{
							data.blocks.map((option, index) => (
								<tr key={index}>
									<td data-title={t('labels:height')}>
										<Link href={`${routes.public.blocks}/${option.header.height}`}>
											<a>
												<NumberFormat
													value={option.header.height}
													displayType="text"
													thousandSeparator={true}
													renderText={(value, props) => {
														return <span className="font-secondary-bold color-turquoise" {...props}>{value}</span>;
													}}
												/>
											</a>
										</Link>
									</td>
									<td data-title={t('labels:proposer')}>
										<div className="d-inline-flex align-items-center">
											<div className="thumb size-30 position-left">
												{ validatorData[option.header.proposerAddress.toUpperCase()] && validatorData[option.header.proposerAddress.toUpperCase()].description.identity
													? <Image
														src={process.env.API_SERVER + "validator/keybase/image/" + validatorData[option.header.proposerAddress.toUpperCase()].description.identity}
														width={30}
														height={30}
														alt={validatorData[option.header.proposerAddress.toUpperCase()].description.moniker + " logo"}
														loading={"lazy"}
													/>
													: <Image
														src={placeholder}
														width={30}
														height={30}
														alt={option.blockproposer}
														loading={"lazy"}
													/>}
											</div>
											<span className="font-secondary-bold">
												{validatorStatus !== STATUS.FULFILLED || !(option.header.proposerAddress.toUpperCase() in validatorData)
													? option.header.proposerAddress.toUpperCase()
													: validatorData[option.header.proposerAddress.toUpperCase()].description.moniker}
											</span>
										</div>
									</td>
									<td data-title={t('labels:time')}>
										<span className="font-book">{getDateDifferent(option.header.time * 1000, new Date())} ago</span>
									</td>
								</tr>
							))
						}
						</tbody>
					</table>
				</div>
			</div>
		)
	}

	return <ErrorBlock/>;
}
