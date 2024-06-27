import React from 'react';
import {useNavigate, Outlet} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Button, FormControl, InputText, LayoutOne, Textarea} from "upkit";
import TopBar from "../../components/TopBar";
import {rules} from "./validation.js";
import SelectWilayah from "../../components/SelectWilayah";
import {createAddress} from "../../api/address.js";

export default function UserAddressAdd() {
    const navigate = useNavigate();

    const {handleSubmit, register, errors, setValue, watch, getValues} = useForm();
    const allFields = watch();
    const updateValue = (field, value) => setValue(field, value, {
        shouldValidate: true,
        shouldDirty: true,
    });

    const onSubmit = async (formData) => {
        const payload = {
            nama_alamat: formData.nama_alamat,
            detail_alamat: formData.detail_alamat,
            provinsi: formData.provinsi.label,
            kabupaten: formData.kabupaten.label,
            kecamatan: formData.kecamatan.label,
            kelurahan: formData.kelurahan.label,
        }

        const {data} = await createAddress(payload);
        if (data.error) return true;

        navigate('/alamat-pengiriman', {replace: true});
    }

    React.useEffect(() => {
        register({name: 'provinsi'}, rules.provinsi);
        register({name: 'kabupaten'}, rules.kabupaten);
        register({name: 'kecamatan'}, rules.kecamatan);
        register({name: 'kelurahan'}, rules.kelurahan);
    }, [register])

    React.useEffect(() => {
        setValue("kabupaten", null);
        setValue("kecamatan", null);
        setValue("kelurahan", null);
    }, [allFields.provinsi, setValue])

    React.useEffect(() => {
        setValue("kecamatan", null);
        setValue("kelurahan", null);
    }, [allFields.kabupaten, setValue])

    React.useEffect(() => {
        setValue("kelurahan", null);
    }, [allFields.kecamatan, setValue])

    return (
        <LayoutOne>
            <TopBar />
            <br/>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl label='Nama Alamat' errorMessage={errors.nama_alamat?.message} color='black'>
                        <InputText
                            placeholder='Nama Alamat'
                            fitContainer
                            name='nama_alamat'
                            ref={register(rules.nama_alamat)}
                        />
                    </FormControl>
                    <FormControl label='Provinsi' color='black' errorMessage={errors.provinsi?.message}>
                        <SelectWilayah
                            value={getValues().provinsi}
                            name='provinsi'
                            onChange={option => updateValue('provinsi', option)}
                        />
                    </FormControl>
                    <FormControl label='Kabupaten/kota' color='black' errorMessage={errors.kabupaten?.message}>
                        <SelectWilayah
                            tingkat='kabupaten'
                            kodeInduk={getValues().provinsi?.value}
                            value={getValues().kabupaten}
                            name='kabupaten'
                            onChange={option => updateValue('kabupaten', option)}
                        />
                    </FormControl>
                    <FormControl label='Kecamatan' color='black' errorMessage={errors.kecamatan?.message}>
                        <SelectWilayah
                            tingkat='kecamatan'
                            kodeInduk={getValues().kabupaten?.value}
                            value={getValues().kecamatan}
                            name='kecamatan'
                            onChange={option => updateValue('kecamatan', option)}
                        />
                    </FormControl>
                    <FormControl label='Kelurahan' color='black' errorMessage={errors.kelurahan?.message}>
                        <SelectWilayah
                            tingkat='kelurahan'
                            kodeInduk={getValues().kecamatan?.value}
                            value={getValues().kelurahan}
                            name='kelurahan'
                            onChange={option => updateValue('kelurahan', option)}
                        />
                    </FormControl>
                    <FormControl label='Detail Alamat' color='black' errorMessage={errors.detail_alamat?.message}>
                        <Textarea
                            placeholder='Detail Alamat'
                            fitContainer
                            name='detail_alamat'
                            ref={register(rules.detail_alamat)}
                        />
                    </FormControl>
                    <Button fitContainer>
                        Simpan
                    </Button>
                </form>
            </div>
            <Outlet />
        </LayoutOne>
    )
}