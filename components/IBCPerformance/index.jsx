export default function IBCPerformance() {

	const value = 53;
	let segment = 0;
	const points = ['Very Poor', 'Poor', 'Fair', 'Good', 'Excellent'];
	const segments = [[0,20], [21,40], [41,60], [61,80], [81,100]];

	for (let i = 0; i < segments.length; i++) {
		let a = [];
		for (let j = segments[i][0]; j < segments[i][1]; j++) {
			a.push(j);
		}
		if (a.filter(b => b === value).length) {
			segment = i;
		}
	}

	return (
		<>
			<div className="floater">
				<div className="floater-row">
					{
						points.map((point, index) => (
							<div className={`floater-row-item ${index === segment ? 'is-active' : ''}`} key={index}>
								<div className="floater-point"/>
								<span className="floater-label font-secondary-bold">{point}</span>
							</div>
						))
					}
				</div>
				<div className="floater-way">
					<div className="floater-way-mark" style={{ left: value + '%' }}>
						<svg width="35" height="26" viewBox="0 0 35 26">
							<path d="M19.1465 24.6125C18.3515 25.7653 16.6485 25.7653 15.8535 24.6125L1.04268 3.13542C0.127722 1.80865 1.07748 4.99405e-07 2.68914 6.403e-07L32.3109 3.22991e-06C33.9225 3.37081e-06 34.8723 1.80865 33.9573 3.13542L19.1465 24.6125Z" fill="currentColor"/>
						</svg>
					</div>
				</div>
			</div>
		</>
	)
}