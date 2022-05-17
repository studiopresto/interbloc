import dynamic from 'next/dynamic';
import NumberFormat from 'react-number-format';

const TokenomicsChart = dynamic(async () => {
	return  await import('~components/Tokenomics/TokenomicsChart');
}, { ssr: false });



export default function Tokenomics() {
	return (
		<>
			<div className="row">
				<div className="col-6">
					<p className="color-grey font-bold">Bonded:</p>
					<NumberFormat
						value={45349414}
						displayType="text"
						thousandSeparator={true}
						renderText={(value, props) => {
							return <p className="font-16 font-secondary-bold color-orange" {...props}>{value}</p>
						}}/>
					<p className="color-grey font-secondary-bold font-12">BTSG</p>
					<p className="mt-2">36.07 %</p>
				</div>
				<div className="col-6">
					<p className="color-grey font-bold">Unbonded:</p>
					<NumberFormat
						value={79978477}
						displayType="text"
						thousandSeparator={true}
						renderText={(value, props) => {
							return <p className="font-16 font-secondary-bold color-violet" {...props}>{value}</p>
						}}/>
					<p className="color-grey font-secondary-bold font-12">BTSG</p>
					<p className="mt-2">63.62 %</p>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<TokenomicsChart/>
				</div>
			</div>
		</>
	)
}