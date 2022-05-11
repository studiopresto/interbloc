import Input from '~ui/components/Input';
import Button from '~ui/components/Button';
import ArrowIcon from "~ui/icons/Arrow";



export default function SearchForm() {
	return (
		<form className="search-form">
			<Input placeholder="Search for transactions, addresses, blocks and ambedded text data..." search/>
			<Button type="button" color="primary" fullHeight variant="outline">
				<ArrowIcon/>
			</Button>
		</form>
	)
}