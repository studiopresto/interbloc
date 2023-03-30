import {useState} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
/*
Components
 */
import Input from '~ui/components/Input';
/*
Icons
 */
import CalendarIcon from '~ui/icons/Calendar';
/*
Hooks
 */
import UseOutsideDetector from '~hooks/useOutsideDetector';
import dynamic from "next/dynamic";

const Calendar = dynamic(
	() => import('react-calendar'),
	{ ssr: false }
)


export default function Datepicker({ defaultValue = undefined, size = null }) {

	const [value, setValue] = useState(defaultValue);
	const [isDisplayCalendar, setIsDisplayCalendar] = useState(false);

	const handleChange = (date) => {
		setIsDisplayCalendar(false);
		setValue(moment(date).format('DD/MM/YYYY'));
	}

	return (
		<UseOutsideDetector onClickAway={() => setIsDisplayCalendar(false)}>
			<div className="datepicker" onClick={() => setIsDisplayCalendar(true)}>
				<div className="datepicker-icon"><CalendarIcon/></div>
				<Input size={size} placeholder="dd/mm/yyyy" value={value} readonly/>
				<div className="datepicker-calendar" style={{ display: `${isDisplayCalendar ? 'block' : 'none'}` }}>
					<Calendar onChange={handleChange}/>
				</div>

			</div>
		</UseOutsideDetector>
	)
}

Datepicker.propTypes = {
	defaultValue: PropTypes.string,
	size: PropTypes.oneOf(['md']),
}