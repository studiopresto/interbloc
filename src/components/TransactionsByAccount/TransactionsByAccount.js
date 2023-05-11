import TransactionList from 'components/TransactionList';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
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
	
	return <TransactionList data={data} status={status} onSort={handleSort} sort={sort} address={address} loading={loading}/>
}

export default TransactionsByAccount