import Input from '~ui/components/Input';
import Button from '~ui/components/Button';
import ArrowIcon from "~ui/icons/Arrow";
import coinConfig from "../../coin.config";
import {useState} from "react";
import {useRouter} from "next/router";
import routes from "~config/routes";



export default function SearchForm() {
	const router = useRouter()
	const [route, setRoute] = useState()

	function containsOnlyNumbers(str) {
		return /^\d+$/.test(str);
	}

	function processSearch(event) {
		const term = (event.target[0].value)
		if(term.startsWith(coinConfig.addrPrefix)){
			router.push(routes.public.account + "/" + term)
		} else if (containsOnlyNumbers(term)){
			router.push(routes.public.blocks + "/" + term)
		} else if (term.length === 64 ) {
			router.push((routes.public.transactions + "/" + term))
		} else {
			alert("No result found.");
		}
	}

	return (
		
		<form onSubmit={(input) => processSearch(input)} className="search-form">
			<Input  placeholder="Search for transactions, addresses, blocks and ambedded text data..." readonly={false} search/>
			<Button type="button" color="primary" fullHeight variant="outline">
				<ArrowIcon/>
			</Button>
		</form>
		
	)
}