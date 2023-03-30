import dynamic from 'next/dynamic';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {useRouter} from "next/router";
/*
Components
 */
import Hash from '~ui/components/Hash';
import Preloader from '~ui/components/Preloader';
import ProgressMultiple from '~ui/components/ProgressMultiple';
import Box from '~ui/components/Box';
import Button from '~ui/components/Button';
import Datepicker from "~ui/components/Datepicker";
import Dot from "~ui/components/Dot";
import Tooltip from '~ui/components/Tooltip';
/*
Icons
 */
import DirectoryIcon from '~ui/icons/Directory';
import SortDirectionIcon from '~ui/icons/SortDirection';
import EyeIcon from '~ui/icons/Eye';
import InfoIcon from '~ui/icons/Info';
import SortIcon from "~ui/icons/Sort";
import coinConfig from "../../coin.config";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAccount, selectAccount} from "~store/slices/getAccount";
import {STATUS} from "~config/constants";
import {isEmptyObject} from "~utils/object/detectEmptyObject";
import {formatCoinArrayToString, formatDenomToString, formatFromBaseDenom} from "~utils/formatting/coins";
import {fetchTransactionsByAccount, selectTransactionsByAccount} from "~store/slices/getTransactionsByAccountSlice";
import {getDateDifferent} from "~utils/date/getDateDifferent";
import {formatMessageToReadableArray} from "~utils/formatting/transactions";
import {getInfoForDenom} from "~utils/formatting/chain";
import routes from "~config/routes";
import Link from "next/link";
import TransactionList from "~components/TransactionList";
import {fetchChainStats, selectChainStats} from "~store/slices/getChainStats";
/*
Lazy components
 */
const Assets = dynamic(async () => {
    return await import('~components/Assets');
}, {ssr: false, loading: () => <Preloader/>});


export default function AccountPage() {

    const per_page = 10;

    const router = useRouter();
    const dispatch = useDispatch()

    const {addressSlug} = router.query;
    const {data, status} = useSelector(selectAccount)
    const {data: transactionData, status: transactionsStatus} = useSelector(selectTransactionsByAccount)
    const {data: chainData, status: chainStatus} = useSelector(selectChainStats)

    useEffect(() => {
        if (!!addressSlug) {
            dispatch(fetchAccount({accountSlug: addressSlug}))
            dispatch(fetchTransactionsByAccount({addressSlug: addressSlug, per_page: per_page}))
        }
        dispatch(fetchChainStats());

    }, [dispatch, addressSlug])

    if (isEmptyObject(data) && status === STATUS.PENDING) {
        return <Preloader/>;
    }
    if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
        const delegationsProgress = () => {
            const unbondings = data.unbondings.reduce((pv, cv) => pv + Number(cv.amount), 0);
            const delegations = data.delegations.reduce((pv, cv) => pv + Number(cv.amount), 0);
            const redelegations = data.redelegations.reduce((pv, cv) => pv + Number(cv.amount), 0);
            const total = unbondings + delegations + redelegations
            return [
                {
                    title: 'Delegated',
                    value: (delegations > 0) ? Math.round((delegations / total) * 10000) / 100 : 0,
                },
                {
                    title: 'Unbondings',
                    value: (unbondings > 0) ? Math.round((unbondings / total) * 10000) / 100 : 0,

                },
                {
                    title: 'Redelegations',
                    value: (redelegations > 0) ? Math.round((redelegations / total) * 10000) / 100 : 0,
                },
            ];
        }

        const balanceProgress = () => {
            let rawBalances = [];
            let totalBalance = 0;
            Object.entries(data.balances).map(([index, value]) => {
                const assetData = getInfoForDenom(index)
                if(assetData.ticker !== index){
                    rawBalances.push({
                        title: assetData.ticker,
                        value: value / (10 ** assetData.exponent)
                    })
                    totalBalance = totalBalance + (value / (10 ** assetData.exponent))
                }
            })

            rawBalances.map((element, index) => {
                element.value = Math.round((element.value / totalBalance) * 10000 ) / 100;
                rawBalances[index] = element;
            })
            return rawBalances
        }

        return (
            <>
                <div className="page-header-inner">
                    <div className="page-header-thumb __violet">
                        <DirectoryIcon/>
                    </div>
                    <div>
                        <h1 className="h-2">{addressSlug}</h1>
                        <p className="font-16 font-secondary-bold">{coinConfig.ticker}: <span
                            className="color-violet">${chainStatus === STATUS.FULFILLED ? chainData.fiatPrice : "Loading"}</span></p>
                    </div>
                </div>
                <div className="page-body">
                    <Hash title="Address" value={addressSlug}/>
                    <div className="row">
                        <div className="col-6">
                            <Assets balances={data.balances}/>
                        </div>
                        <div className="col-6">
                            <div className="h-100">
                                <Box>
                                    <Tabs className="tabs">
                                        <TabList className="tabs-buttons">
                                            <Tab className="tabs-buttons-item">
                                                <div className="tabs-button">Delegations</div>
                                            </Tab>
                                            <Tab className="tabs-buttons-item">
                                                <div className="tabs-button">Unbondings</div>
                                            </Tab>
                                            <Tab className="tabs-buttons-item">
                                                <div className="tabs-button">Redelegations</div>
                                            </Tab>
                                            <Tab className="tabs-buttons-item">
                                                <div className="tabs-button">Vestings</div>
                                            </Tab>
                                        </TabList>
                                        <TabPanel className="tabs-content pt-2">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>Validator</th>
                                                    <th>Amount</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {

                                                    data.delegations.map((delegation, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <span
                                                                        className="font-secondary-bold">Everstake</span>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className="font-bold">{formatFromBaseDenom(delegation.amount)} {coinConfig.ticker}</span>
                                                                </td>

                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </TabPanel>
                                        <TabPanel className="tabs-content pt-2">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>Validator</th>
                                                    <th>Amount</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    data.unbondings.map((delegation, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <span
                                                                        className="font-secondary-bold">Everstake</span>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className="font-bold">{formatFromBaseDenom(delegation.amount)} {coinConfig.ticker}</span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </TabPanel>
                                        <TabPanel className="tabs-content pt-2">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>Validator</th>
                                                    <th>Amount</th>
                                                    <th>Reward</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {

                                                    data.redelegations.map((delegation, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <span
                                                                        className="font-secondary-bold">Everstake</span>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className="font-bold">{formatFromBaseDenom(delegation.amount)} {coinConfig.ticker}</span>
                                                                </td>
                                                                <td>
                                                                    <span className="font-bold">0,00001 ATOM</span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </TabPanel>
                                        <TabPanel className="tabs-content pt-2">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>Validator</th>
                                                    <th>Amount</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    Array.from({length: 0}).map((_, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <span className="font-secondary-bold">Digital</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-bold">5,5000 ATOM</span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                        </TabPanel>
                                    </Tabs>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <ProgressMultiple data={balanceProgress()} label="bottom"/>
                        </div>
                        <div className="col-6">
                            <ProgressMultiple data={delegationsProgress()} label="bottom"/>
                        </div>
                    </div>
                    <div className="row">
                        <TransactionList transactionData={transactionData} address={addressSlug}></TransactionList>
                    </div>

                </div>
            </>
        )
    }
}
