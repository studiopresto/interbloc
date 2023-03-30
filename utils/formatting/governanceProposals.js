export const formatProposalStatus = s => {
    let color = "#2BBF6F"
    let proposalStatus = "Undefined";

    if (s === "PROPOSAL_STATUS_DEPOSIT_PERIOD"){
        color = "#9a0bad";
        proposalStatus = "Deposit Period";

    } else if ( s === "PROPOSAL_STATUS_VOTING_PERIOD"){
        color = "#329DB5";
        proposalStatus = "Voting Period";

    } else if ( s === "PROPOSAL_STATUS_PASSED"){
        color = "#009900";
        proposalStatus = "Passed";

    } else if ( s === "PROPOSAL_STATUS_REJECTED"){
        color = "#c55507";
        proposalStatus = "Rejected";

    } else if ( s === "PROPOSAL_STATUS_FAILED"){
        color = "#bc9701";
        proposalStatus = "Failed";

    }

    return {
        color,
        proposalStatus
    }
}