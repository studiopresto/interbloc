import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Image from 'next/image';
import NumberFormat from 'react-number-format';
import placeholder from '~static/images/placeholder.svg';
/*
Store
 */
import {fetchBlocks, selectBlocks} from '~store/slices/getBlocksSlice';
import {fetchValidatorsAddressConversion, selectValidatorsAddressConversion} from '~store/slices/getValidatorsAddressConversion';
/*
Components
 */
import Preloader from '~ui/components/Preloader';
import ErrorBlock from '~ui/components/Error';
/*
Icons
 */
import BlocksIcon from '~ui/icons/Blocks';
/*
Utils
 */
import hashShortening from '~utils/string/hashShortening';
/*
Config
 */
import {STATUS} from '~config/constants';
import {getDateDifferent} from "~utils/date/getDateDifferent";
import Link from "next/link";
import routes from "~config/routes";
import {isEmptyObject} from "~utils/object/detectEmptyObject";
import Pagination from "~components/Pagination";



export default function BlocksPage() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectBlocks);
	const { data: validatorData, status: validatorStatus } = useSelector(selectValidatorsAddressConversion);
    const [page, setPage] = useState(1)
    const per_page = 10;
	let height = 0;

    const paginationChange = p => {
        setPage(p)
    }
	useEffect(() => {
		dispatch(fetchBlocks({ items_per_page: per_page, page: page }));
		dispatch(fetchValidatorsAddressConversion({ height }));
	}, [dispatch, page]);

	if (data == null && status === STATUS.REJECTED) {
		return <ErrorBlock/>
	}

	if (isEmptyObject(data) || status === STATUS.PENDING) {
		return <Preloader/>;
	}

	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		height = data.blocks[0].header.height
		return (
			<>
				<div className="page-header-inner">
					<div className="page-header-thumb __turquoise">
						<BlocksIcon/>
					</div>
					<div>
						<h1 className="h-2">Blocks</h1>
						<p className="h-6">Last Blocks</p>
					</div>
				</div>
				<div className="page-body">
					<div className="table-box">
                        <div className="table-header">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-3">
                                    <p className="font-16 font-book mb-1"><span
                                        className="color-turquoise font-bold">{ data.pagination.total }</span> blocks found</p>
                                    <p className="font-12 font-book color-grey">(Showing the last { per_page } records)</p>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="d-flex justify-content-end left-text">
                                        <Pagination onClick={paginationChange} page={page} pageCount={data.pagination.totalPages} theme="rounded"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <table className="table">
							<thead>
							<tr>
								<th>Height</th>
								<th>Proposer</th>
								<th>Hash</th>
								{/*<th>Txs</th>*/}
								<th>Time</th>
							</tr>
							</thead>
							<tbody>
							{
								data.blocks.map((option, index) => (
									<tr key={index}>
										<td data-title="Height">
											<Link href={`${routes.public.blocks}/${option.header.height}`}>
												<a>
													<NumberFormat
														value={option.header.height}
														displayType="text"
														thousandSeparator={true}
														renderText={(value, props) => {
															return <span className="font-secondary-bold color-turquoise" {...props}>{value}</span>;
														}}/>

												</a>
											</Link>
										</td>
										<td data-title="Proposer">
											<div className="d-inline-flex align-items-center">
												<div className="thumb size-30 position-left">
													{ validatorData[option.header.proposerAddress.toUpperCase()] && validatorData[option.header.proposerAddress.toUpperCase()].description.identity ? (
														<Image
															src={process.env.API_SERVER + "validator/keybase/image/" + validatorData[option.header.proposerAddress.toUpperCase()].description.identity}
															width={30}
															height={30}
															alt={validatorData[option.header.proposerAddress.toUpperCase()].description.moniker + " logo"}
															loading={"lazy"}
														/>

													) : (
														<Image src={placeholder}
															   width={30}
															   height={30}
															   alt={option.blockproposer}
															   loading={"lazy"}
														/>


													)}

												</div>
												<span className="font-secondary-bold">
													{validatorStatus !== STATUS.FULFILLED || !(option.header.proposerAddress.toUpperCase() in validatorData) ?
														option.header.proposerAddress.toUpperCase()
													:
														validatorData[option.header.proposerAddress.toUpperCase()].description.moniker
													}
												</span>
											</div>
										</td>
										<td data-title="Hash">
											<p className="font-book">{hashShortening(option.hash)}</p>
										</td>
										{/*<td><span className="font-book">0</span></td>*/}
										<td data-title="Time"><span className="font-book">{getDateDifferent(option.header.time * 1000, new Date())} ago</span></td>
									</tr>
								))
							}
							</tbody>
						</table>
					</div>
				</div>
			</>
		)
	}

	return <ErrorBlock/>;
}
