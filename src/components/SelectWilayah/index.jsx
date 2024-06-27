import React from 'react';
import {oneOf, oneOfType, number, string, func, shape} from 'prop-types'
import axios from "axios";
import {config} from "../../config.js";
import {Select} from "upkit";

export default function SelectWilayah({tingkat, kodeInduk, onChange, value}) {
    const [data, setData] = React.useState([]);
    const [isFetching, setIsFetching] = React.useState(false);

    React.useEffect(() => {
        setIsFetching(true)
        axios
            .get(`${config.api_host}/api/region/${tingkat}?kodeInduk=${kodeInduk}`)
            .then(({data}) => setData(data))
            .finally(() => setIsFetching(false))
    }, [kodeInduk, tingkat])

    return <Select
        options={data.map(wilayah => ({label: wilayah.nama, value: wilayah.kode}))}
        onChange={onChange}
        value={value}
        isLoading={isFetching}
        isDisabled={isFetching || !data.length}
    />

}

SelectWilayah.defaultProps = {
    tingkat: 'provinsi',
}

SelectWilayah.propTypes = {
    tingkat: oneOf(['provinsi', 'kabupaten', 'kecamatan', 'kelurahan']),
    kodeInduk: oneOfType([number, string]),
    onChange: func,
    value: shape({label: string, value: oneOfType([string, number])}),
}