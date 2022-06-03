import Image from 'next/image';
import Link from 'next/link';
import NumberFormat from 'react-number-format';
import placeholder from '~static/images/placeholder.svg';
/*
Components
 */
import Button from '~ui/components/Button';
import Input from '~ui/components/Input';
import Card from '~ui/components/Card';
import Progress from '~ui/components/Progress';
import Dot from '~ui/components/Dot';
/*
Icons
 */
import UserIcon from '~ui/icons/User';
import GridIcon from '~ui/icons/Grid';
import UnionIcon from '~ui/icons/Union';
import RepeatIcon from '~ui/icons/Repeat';
import SortIcon from '~ui/icons/Sort';
/*
Config
 */
import routes from '~config/routes';



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
									<th>
										<div className="d-flex align-items-center">
											Rank
											<Dot>
												<SortIcon/>
											</Dot>
										</div>
									</th>
									<th>
										<div className="d-flex align-items-center">
											Validator
											<Dot>
												<SortIcon/>
											</Dot>
										</div>
									</th>
									<th>
										<div className="d-flex align-items-center">
											Voting Power
											<Dot>
												<SortIcon/>
											</Dot>
										</div>
									</th>
									<th>
										<div className="d-flex align-items-center">
											Cumulative Share %
											<Dot>
												<SortIcon/>
											</Dot>
										</div>
									</th>
									<th>
										<div className="d-flex align-items-center">
											Participation
											<Dot>
												<SortIcon/>
											</Dot>
										</div>
									</th>
									<th>
										<div className="d-flex align-items-center">
											Uptime
											<Dot>
												<SortIcon/>
											</Dot>
										</div>
									</th>
									<th>
										<div className="d-flex align-items-center">
											Commission
											<Dot>
												<SortIcon/>
											</Dot>
										</div>
									</th>
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
											<Link href={`${routes.public.validators}/cosmos1udcdc278lsaawuznfk7g00vn9n5cl6yzzsrk0c`}>
												<a>
													<div className="d-inline-flex align-items-center">
														<div className="thumb size-30 position-left">
															<Image src={placeholder}
																		 width={30}
																		 height={30}
																		 alt="Ping"/>
														</div>
														<span className="font-secondary-bold">Farbole</span>
													</div>
												</a>
											</Link>
										</td>
										<td>
											<p className="font-bold">{(14.312787 * ( index + 1 )).toFixed(6)}</p>
											<p className="font-12 font-bold color-grey">{1.72 * ( index + 1)}%</p>
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
											<span className="font-bold">{100 - index * 4}%</span>
										</td>
										<td>
											<span className="font-bold">{5.00 * index + 1}%</span>
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