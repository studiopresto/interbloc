import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NumberFormat from 'react-number-format';
import useTranslation from 'next-translate/useTranslation';
import {fetchLatestBlock, selectLatestBlock} from 'store/slices/getLatestBlockSlice';
import Preloader from "ui/components/Preloader";
import ErrorBlock from "ui/components/Error";
import {STATUS} from 'config/constants';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import {getDateDifferent} from "utils/date/getDateDifferent";

export default function BlocksLatest() {

	const dispatch = useDispatch();
	const { data , status } = useSelector(selectLatestBlock);
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(fetchLatestBlock());
	}, [dispatch]);

	if (isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>
	}

	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		return (
			<div className="h-100 d-flex flex-column justify-content-end pb-2">
				<p className="font-16 color-grey font-bold">{t('labels:latest-block')}:</p>
				<NumberFormat
					value={data.header.height}
					displayType="text"
					thousandSeparator={true}
					renderText={(value, props) => {
						return <p className="h-2 mb-4" {...props}>{value}</p>
					}}/>
				<p className="font-16 color-grey font-bold">{t('labels:time')}:</p>
				<p className="h-2">{getDateDifferent(data?.header.time * 1000, new Date())}</p>
			</div>
		)
	}

	return <ErrorBlock/>;
}
