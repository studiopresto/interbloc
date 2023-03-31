import PropTypes from 'prop-types';
/*
Icons
 */
import HashIcon from '~ui/icons/Hash';
import Button from '~ui/components/Button';
import FileIcon from '~ui/icons/File';
import GridSolidIcon from '~ui/icons/GridSolid';



export default function Hash({ title = 'Hash', value }) {

	if (!!value) {
		return (
			<div className="hash">
				<div className="hash-icon">
					<HashIcon/>
				</div>
				<span className="h-4 hash-title">{title}:</span>
				<span className="hash-value font-base text-break">{value}</span>
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
	return null
}

Hash.propTypes = {
	title: PropTypes.string,
	value: PropTypes.string.isRequired,
};