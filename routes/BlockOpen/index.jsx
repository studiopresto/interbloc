import BlocksIcon from "~ui/icons/Blocks";
import Hash from '~ui/components/Hash';

export default function BlockOpenPage() {
	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __turquoise">
					<BlocksIcon/>
				</div>
				<div>
					<h1 className="h-2">Block:2652342</h1>
				</div>
			</div>
			<div className="page-body">
				<Hash/>
			</div>
		</>
	)
}