import PropTypes from 'prop-types';



export default function Dropdown({ label, prefix }) {
	return (
		<div className="dropdown">
			<div className="dropdown-title">
				<span className="dropdown-title-label">{prefix} {label}</span>
				<span className="dropdown-title-icon">
				<svg width="8" height="9" viewBox="0 0 8 9">
					<path d="M4.5 1C4.5 0.723858 4.27614 0.5 4 0.5C3.72386 0.5 3.5 0.723858 3.5 1L4.5 1ZM3.64645 8.35355C3.84171 8.54882 4.15829 8.54882 4.35355 8.35355L7.53553 5.17157C7.7308 4.97631 7.7308 4.65973 7.53553 4.46447C7.34027 4.2692 7.02369 4.2692 6.82843 4.46447L4 7.29289L1.17157 4.46447C0.976311 4.2692 0.659728 4.2692 0.464466 4.46447C0.269204 4.65973 0.269204 4.97631 0.464466 5.17157L3.64645 8.35355ZM3.5 1L3.5 8L4.5 8L4.5 1L3.5 1Z" fill="currentColor"/>
				</svg>
			</span>
			</div>
		</div>
	)
}

Dropdown.propTypes = {
	label: PropTypes.string.isRequired,
	prefix: PropTypes.string,
};