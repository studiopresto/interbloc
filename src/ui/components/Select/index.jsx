import PropTypes from 'prop-types';
import Select from 'react-select';
import arrow from '../../../../public/static/images/arrow.svg';

export default function SelectCustom({ options, onChange, defaultValue, placeholder = 'Select...' }) {
	const customStyles = {
		container: (provided) => ({
			...provided,
			width: 280,
		}),
		option: (provided, state) => ({
			...provided,
			color: '#E3EBEF',
			cursor: 'pointer',
			backgroundColor: 'transparent',
			padding: '10px 20px',
			fontFamily: 'Nexa-Bold',
				'&:hover': {
					backgroundColor: 'transparent',
					color: '#A7A7A7',
				},
		}),
		singleValue: (provided) => ({
			...provided,
			color: '#E3EBEF',
			fontFamily: 'Nexa-Bold',
		}),
		valueContainer: (provided) => ({
			...provided,
			padding: '0 20px',
		}),
		control: (provided, { menuIsOpen }) => ({
			...provided,
			minHeight: 46,
			backgroundColor: '#2C2C2C',
			borderRadius: menuIsOpen ? '23px 23px 0 0' : 23,
			borderColor: 'transparent',
			boxShadow: 'none',
			cursor: 'pointer',
				'&:hover': {
					borderColor: 'transparent',
				},
				'&:focus': {
					outline: 'none',
				},
				'& []': {

				},
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: '#2C2C2C',
			borderRadius: '0 0 23px 23px',
			margin: 0,
			paddingBottom: 10,
			boxShadow: 'none',
		}),
		menuList: (provided) => ({
			...provided,
		}),
		indicatorSeparator: () => ({
			display: 'none',
		}),
		indicatorsContainer: (provided) => ({
			...provided,
			width: 38,
			height: 38,
			borderWidth: 1,
			borderStyle: 'solid',
			borderColor: '#47D0FE',
			borderRadius: '50%',
			marginTop: 3,
			marginRight: 3,
			backgroundRepeat: 'no-repeat',
			backgroundImage: `url(${arrow.src})`,
			backgroundPosition: 'center center',
			backgroundSize: 8,
				'& svg': {
					display: 'none',
				},
		}),
		placeholder: (provided) => ({
			...provided,
			color: '#E3EBEF',
			fontFamily: 'Nexa-Bold',
		}),
		input: (provided) => ({
			...provided,
			color: '#E3EBEF',
			fontFamily: 'Nexa-Bold',
		}),
	}

	return (
		<Select
			instanceId={new Date().getTime()}
			id={new Date().getTime()}
			options={options}
			styles={customStyles}
			onChange={onChange}
			defaultValue={defaultValue}
			placeholder={placeholder}
			isSearchable={false}
			width="100%"
		/>
	);
}

Select.propTypes = {
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	defaultValue: PropTypes.object,
};