export const PrettyPrintJson = (data) => {
    return (<div><pre>{JSON.stringify(data, null, 2)}</pre></div>)
}

