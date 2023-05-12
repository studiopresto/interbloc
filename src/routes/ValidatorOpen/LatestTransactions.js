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
	
	const handleSortSelect = useCallback((e) => {
		setSort(prevState => {
			return {...prevState, order_by: e.value}
		})
	}, [setSort])
	
	return <TransactionList data={sortedData} status={status} onSort={handleSort} sort={sort} onSortSelect={handleSortSelect}/>
}

LatestTransactions.propTypes = {
	data: PropTypes.object.isRequired,
	status: PropTypes.string.isRequired,
}

export default LatestTransactions