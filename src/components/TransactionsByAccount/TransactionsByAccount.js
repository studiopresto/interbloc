import TransactionList from 'components/TransactionList';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
	fetchTransactionsByAccount,
	selectTransactionsByAccount
} from '../../store/slices/getTransactionsByAccountSlice';

const TransactionsByAccount = ({ address }) => {
	
	const dispatch = useDispatch();
	const {data, status} = useSelector(selectTransactionsByAccount)
	
	useEffect(() => {
		if (!!address) {
			dispatch(fetchTransactionsByAccount({ addressSlug: address }))
		}
	}, [dispatch])
	
	return <TransactionList data={data} status={status}/>
}

export default TransactionsByAccount