'use client'

import { FileUploader } from "react-drag-drop-files";
import {ChangeEvent, useEffect, useState} from "react";
import {saveDataFileTypes} from "@/utils/constants";
import {readFile} from "@/utils/functions/readFile";
import fetchInventory from "@/utils/functions/fetchInventory";
import getNames from "@/utils/functions/getNames";
import useSaveData from "@/hooks/useSaveData";

export default function SaveDataUploader() {
    const {dispatch, slot} = useSaveData();
    const [file, setFile] = useState<ArrayBuffer>(new ArrayBuffer(0));
    const [inventory, setInventory] = useState<string[]>([]);
    const [names, setNames] = useState<string[]>([]);

    const handleChange = async (file: File) => {
        const _file = await readFile(file)
        setFile(_file)
        const _names = getNames(_file)
        setNames(_names)
    };

    const handleSlotChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'SET_SLOT', payload: parseInt(e.target.value)})
    }

    useEffect(() => {
        const _inventory = fetchInventory(file, slot)
        setInventory(_inventory.id_list)
    }, [slot])

    return (
        <div>
            <h1>Save Data Uploader</h1>
            <FileUploader
                handleChange={handleChange}
                multiple={false}
                types={saveDataFileTypes}
            />
            <select onChange={handleSlotChange}>
                {names.filter(n => n !== '').map((name, index) => (
                    <option key={index} value={index}>{name}</option>
                ))}
            </select>
            {slot}
            <ul>
                {inventory.map((id, index) => (
                    <li key={index}>{id}</li>
                ))}
            </ul>
        </div>
    );
}