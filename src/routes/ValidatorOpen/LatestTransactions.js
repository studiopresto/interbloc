import {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import TransactionList from 'components/TransactionList';
import _ from 'lodash';

const LatestTransactions = ({ data, status }) => {
	
	const [sort, setSort] = useState({
		order_by: 'height',
		order_direction: 'asc',
	});
	
	const sortedData = useMemo(() => {
		if (sort.order_by !== '' && data.transactions.length) {
			const transactions = _.orderBy(data.transactions, [sort.order_by], [sort.order_direction])
			return {...data, transactions}
		}
		return data;
	}, [data, sort])
	
	const handleSort = useCallback((newSort) => {
		setSort(newSort)
	}, [setSort, sort])
	
	return <TransactionList data={sortedData} status={status} onSort={handleSort} sort={sort}/>
}

LatestTransactions.propTypes = {
	data: PropTypes.object.isRequired,
	status: PropTypes.string.isRequired,
}

export default LatestTransactions