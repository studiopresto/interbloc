/*
Icons
 */
import HashIcon from '~ui/icons/Hash';
import Button from '~ui/components/Button';
import FileIcon from '~ui/icons/File';
import GridSolidIcon from '~ui/icons/GridSolid';



export default function Hash({ title, value }) {
	return (
		<div className="hash">
			<div className="hash-icon">
				<HashIcon/>
			</div>
			<span className="h-4 hash-title">Hash:</span>
			<span className="hash-value font-base">0xc6fcvzc6fsdf68678z3345v6546zc578zcv99790987987</span>
			<div className="hash-action">
				<Button icon>
					<FileIcon/>
				</Button>
				<Button icon>
					<GridSolidIcon/>
				</Button>
			</div>
		</div>
	)
}