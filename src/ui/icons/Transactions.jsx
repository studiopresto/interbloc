import PropTypes from 'prop-types';



export default function TransactionsIcon({ color = 'currentColor' }) {
	return (
		<svg width="24" height="21" viewBox="0 0 24 21" fill="none">
			<path d="M7.22334 7.14057L8.36988 8.92408L9.89861 6.5673L9.32533 5.73924C8.36988 4.21051 6.20418 3.06396 4.35697 3.06396H0.535156V5.61184H4.35697C5.31243 5.61184 6.71376 6.37621 7.22334 7.14057Z" fill={color}/>
			<path d="M17.7333 5.61236H19.6442V8.16023L23.4661 4.33842L19.6442 0.516602V3.06448H17.7333C15.8861 3.06448 13.7204 4.21102 12.7013 5.80345L7.22334 14.2751C6.71376 15.0395 5.31243 15.8039 4.35697 15.8039H0.535156V18.3517H4.35697C6.20418 18.3517 8.36988 17.2052 9.38903 15.6128L14.867 7.14108C15.3765 6.37672 16.7779 5.61236 17.7333 5.61236Z" fill={color}/>
			<path d="M19.6439 15.8039H17.733C16.7776 15.8039 15.3763 15.0396 14.8667 14.2752L13.7201 12.4917L12.1914 14.8485L12.7647 15.6765C13.7838 17.2053 15.9495 18.4155 17.7967 18.4155H19.7076V20.9634L23.5295 17.1416L19.7076 13.3198V15.8039H19.6439Z" fill={color}/>
		</svg>
	)
}

TransactionsIcon.propTypes = {
	color: PropTypes.string,
};