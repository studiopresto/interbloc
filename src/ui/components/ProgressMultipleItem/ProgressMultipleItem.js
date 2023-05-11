import {useEffect, useRef, useState} from 'react';

const ProgressMultipleItem = ({ option, label }) => {
	
	const ref = useRef();
	const [xPosition, setXPosition] = useState(0);
	
	useEffect(() => {
		const element = ref.current;
		setXPosition(element.offsetLeft + element.clientWidth);
	}, [ref, setXPosition])
	
	return (
		<div
			ref={ref}
			className="progress-multiple-bar"
			style={{ width: option.value + '%'}}>
			{!!label
				? <div
					className={`progress-multiple-label __${label}`}
					style={{ left: xPosition < 200 ? 0 : 'auto' }}>{option.title}</div>
				: null}
		</div>
	)
}

export default ProgressMultipleItem