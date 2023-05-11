import TransactionList from 'components/TransactionList';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import {
	fetchTransactionsByAccount,
	fetchSortedTransactionsByAccount,
	selectTransactionsByAccount
} from '../../store/slices/getTransactionsByAccountSlice';

const TransactionsByAccount = ({ address }) => {
	
	const dispatch = useDispatch();
	const {data, status} = useSelector(selectTransactionsByAccount);
	const [sort, setSort] = useState({
		order_by: 'height',
		order_direction: 'asc',
	});
	
	useEffect(() => {
		if (!!address) {
			dispatch(fetchTransactionsByAccount({ addressSlug: address }))
		}
	}, [dispatch])
	
	const handleSort = ((newSort) => {
		setSort(newSort);
		dispatch(fetchSortedTransactionsByAccount({
			addressSlug: address,
			order_by: newSort.order_by,
			order_direction: newSort.order_direction
		}));
	})
	
	return <TransactionList data={data} status={status} onSort={handleSort} sort={sort} address={address}/>
}

export default TransactionsByAccount