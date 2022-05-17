import NumberFormat from 'react-number-format';



export default function BlocksLatest() {
	return (
		<div className="h-100 d-flex flex-column justify-content-end pb-2">
			<p className="font-16 color-grey font-bold">Latest Block:</p>
			<NumberFormat
				value={5510127}
				displayType="text"
				thousandSeparator={true}
				renderText={(value, props) => {
					return <p className="h-2 mb-4" {...props}>{value}</p>
				}}/>
			<p className="font-16 color-grey font-bold">Average Block Time:</p>
			<p className="h-2">5.95 s</p>
		</div>
	)
}