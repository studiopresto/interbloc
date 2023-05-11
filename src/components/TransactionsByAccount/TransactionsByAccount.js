import TransactionList from 'components/TransactionList';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import {
	fetchTransactionsByAccount,
	selectTransactionsByAccount
} from 'store/slices/getTransactionsByAccountSlice';

const TransactionsByAccount = ({ address }) => {
	
	const dispatch = useDispatch();
	const {data, status} = useSelector(selectTransactionsByAccount);
	const [loading, setLoading] = useState(false);
	const [sort, setSort] = useState({
		order_by: 'height',
		order_direction: 'asc',
	});
	
	useEffect(() => {
		if (!!address) {
			dispatch(fetchTransactionsByAccount({ addressSlug: address, ...sort }))
		}
	}, [dispatch, sort])
	
	const handleSort = ((newSort) => {
		setLoading(true);
		setSort(newSort);
	})
	
	useEffect(() => {
		if (data?.transactions) {
			setLoading(false)
		}
	}, [data])
	
	const handleSortSelect = useCallback((e) => {
		setLoading(true);
		setSort(prevState => {
			return {...prevState, order_by: e.value}
		})
	}, [setSort])
	
	return <TransactionList data={data} status={status} onSort={handleSort} sort={sort} address={address} loading={loading} onSortSelect={handleSortSelect}/>
}

export default TransactionsByAccount