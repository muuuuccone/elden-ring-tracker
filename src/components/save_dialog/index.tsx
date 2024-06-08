import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent
} from "@mui/material";
import {MouseEvent} from "react";
import {FileUploader} from "react-drag-drop-files";
import {saveDataFileTypes} from "@/utils/constants";
import useSaveData from "@/hooks/useSaveData";
import {useEffect, useState} from "react";
import {readFile} from "@/utils/functions/readFile";
import getNames from "@/utils/functions/getNames";
import fetchInventory from "@/utils/functions/fetchInventory";

type SaveDialogProps = {
    modalOpen: boolean;
    handleModalOpen: () => void;
}

export default function SaveDialog({modalOpen, handleModalOpen}: SaveDialogProps) {
    const {dispatch, REDUCER_ACTIONS, inventory} = useSaveData();
    const [file, setFile] = useState<ArrayBuffer | null>(null);
    const [names, setNames] = useState<string[]>([]);
    const [name, setName] = useState<string>('0');

    const handleChange = async (file: File) => {
        const _file = await readFile(file)
        setFile(_file)
        const _names = getNames(_file)
        setNames(_names)
    };

    const handleChangeName = (event: SelectChangeEvent) => {
        setName(event.target.value);
    };

    const loadSave = () => {
        if (!file || name === undefined) return
        const _inventory = fetchInventory(file, +name)
        const inventory: string[] = _inventory.id_list
        dispatch({type: REDUCER_ACTIONS.LOAD, payload: inventory})
        handleModalOpen()
    }

    useEffect(() => {
        console.log(inventory)
    }, [inventory]);

    return (
        <Dialog open={modalOpen} onClose={handleModalOpen}>
            <DialogTitle>
                Select a save file
            </DialogTitle>
            <Container>
                <FileUploader
                    handleChange={handleChange}
                    multiple={false}
                    types={saveDataFileTypes}
                />
                {file &&
                    <FormControl fullWidth>
                        <InputLabel>Select character</InputLabel>
                        <Select onChange={handleChangeName} label='Select character' value={name}>
                            {names.filter(n => n !== '').map((name, index) => (
                                <MenuItem key={index} value={index}>{name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                }
            </Container>
            <DialogActions>
                <Button onClick={handleModalOpen}>
                    Cancel
                </Button>
                <Button onClick={loadSave}>
                    Load
                </Button>
            </DialogActions>
        </Dialog>
    )
}