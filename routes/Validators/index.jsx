import NumberFormat from 'react-number-format';
/*
Components
 */
import Button from '~ui/components/Button';
import Input from '~ui/components/Input';
import Card from '~ui/components/Card';
/*
Icons
 */
import UserIcon from '~ui/icons/User';
import GridIcon from '~ui/icons/Grid';
import UnionIcon from '~ui/icons/Union';
import RepeatIcon from '~ui/icons/Repeat';
import Progress from "~ui/components/Progress";
import SortButton from "~components/SortButton";



export default function ValidatorsPage() {
	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __blue">
					<UserIcon/>
				</div>
				<div>
					<h1 className="h-2">Validators</h1>
					<p className="h-6">More Information About Validators</p>
				</div>
			</div>
			<div className="page-body">
				<div className="detail page-body-detail">
					<div className="detail-list">
						<div className="detail-list-item">
							<p className="font-16 font-secondary-bold mb-1">$5.8</p>
							<p className="color-grey font-bold">Price</p>
						</div>
						<div className="detail-list-item">
							<p className="font-16 font-secondary-bold mb-1">4,063,270</p>
							<p className="color-grey font-bold">Height</p>
						</div>
						<div className="detail-list-item">
							<p className="font-16 font-secondary-bold mb-1">122 M</p>
							<p className="color-grey font-bold">Bonded</p>
						</div>
						<div className="detail-list-item">
							<p className="font-16 font-secondary-bold mb-1">85.95%</p>
							<p className="color-grey font-bold">Inflation</p>
						</div>
						<div className="detail-list-item">
							<p className="font-16 font-secondary-bold mb-1">44 M</p>
							<p className="color-grey font-bold">Community Pool</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-3 col-md-6">
						<Card theme={1} icon={<GridIcon/>} color="turquoise">
							<p className="color-grey font-16 font-book">Height</p>
							<NumberFormat
								value={4062727}
								displayType="text"
								thousandSeparator={true}
								renderText={(value, props) => {
									return <p className="h-2 font-secondary-bold" {...props}>{value}</p>;
								}}/>
						</Card>
					</div>
					<div className="col-xl-3 col-md-6">
						<Card theme={1} icon={<UserIcon/>} color="blue">
							<p className="color-grey font-16 font-book">Validators</p>
							<p className="h-2 font-secondary-bold">135 / 244</p>
						</Card>
					</div>
					<div className="col-xl-3 col-md-6">
						<Card theme={1} icon={<UnionIcon/>} color="orange">
							<p className="color-grey font-16 font-book">Bonded Tokens</p>
							<NumberFormat
								value={122118103}
								displayType="text"
								thousandSeparator={true}
								renderText={(value, props) => {
									return <p className="h-2 font-secondary-bold" {...props}>{value}</p>;
								}}/>
						</Card>
					</div>
					<div className="col-xl-3 col-md-6">
						<Card theme={1} icon={<RepeatIcon/>} color="violet">
							<p className="color-grey font-16 font-book">Block Time</p>
							<p className="h-2 font-secondary-bold">6,54 s</p>
						</Card>
					</div>
				</div>
				<div className="table-box">
					<div className="table">
						<div className="table-header">
							<div className="row">
								<div className="col-6">
									<div className="btns-group">
										<Button size="sm" color="blue">Active</Button>
										<Button size="sm">Unactive</Button>
									</div>
								</div>
								<div className="col-lg-4 offset-lg-2 col-md-6">
									<Input search placeholder="Search Validator"/>
								</div>
							</div>
						</div>
						<table className="table">
							<thead>
								<tr>
									<th>Rank</th>
									<th><SortButton label="Validator"/></th>
									<th><SortButton label="Voting Power"/></th>
									<th>Cumulative Share %</th>
									<th><SortButton label="Participation"/></th>
									<th><SortButton label="Uptime"/></th>
									<th><SortButton label="Commission"/></th>
								</tr>
							</thead>
							<tbody>
							{
								Array.from({length: 10}).map((_, index) => (
									<tr key={index}>
										<td>
											<span>{index + 1}</span>
										</td>
										<td>
											<div className="d-inline-flex align-items-center">
												<div className="thumb size-30 position-left">
													<img src="https://seeklogo.com/images/C/coinmarketcap-logo-064D167A0E-seeklogo.com.png" alt="Ping"/>
												</div>
												<span className="font-secondary-bold">Farbole</span>
											</div>
										</td>
										<td>
											<p className="font-bold">14, 312,787</p>
											<p className="font-12 font-bold color-grey">11, 72%</p>
										</td>
										<td>
											<Progress value={7 * ( index + 2 )}/>
										</td>
										<td>
											<p className="status">
												<span className="font-12 color-grey font-bold">145 / 174</span>
											</p>
										</td>
										<td>
											<span className="font-bold">100%</span>
										</td>
										<td>
											<span className="font-bold">5.00%</span>
										</td>
									</tr>
								))
							}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	)
}