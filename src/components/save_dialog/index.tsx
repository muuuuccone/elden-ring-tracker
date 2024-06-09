import {
    Box,
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
import {FileUploader} from "react-drag-drop-files";
import {saveDataFileTypes} from "@/utils/constants";
import useSaveData from "@/hooks/useSaveData";
import {useState} from "react";
import {readFile} from "@/utils/functions/readFile";
import getNames from "@/utils/functions/getNames";
import fetchInventory from "@/utils/functions/fetchInventory";
import styles from './index.module.css'
import {Save} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

type SaveDialogProps = {
    modalOpen: boolean;
    handleModalOpen: () => void;
}

export default function SaveDialog({modalOpen, handleModalOpen}: SaveDialogProps) {
    const {dispatch, REDUCER_ACTIONS} = useSaveData();
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

    return (
        <Dialog open={modalOpen} onClose={handleModalOpen} fullWidth maxWidth={'sm'}>
            <DialogTitle>
                Select a save file
            </DialogTitle>
            <Container>
                <Typography>
                    Load a save file to view the obtained items in the inventory of the selected character.
                </Typography>
                <Typography variant={'caption'} className={styles.location}>
                    Usually located in:
                    <br/>
                    <code>C:/Users/<i>YourName</i>/AppData/Roaming/EldenRing/<i>Number</i>/ER0000.sl2</code>
                </Typography>
                <FileUploader
                    handleChange={handleChange}
                    multiple={false}
                    types={saveDataFileTypes}
                >
                    <Box className={styles.dropZone}>
                        <Box>
                            <Save color='primary' sx={{fontSize:'4rem'}}/>
                        </Box>
                        <Box>
                            <Typography variant={'h6'}>Drag and drop a save file here</Typography>
                            <Typography variant={'h6'}>or click to select a file</Typography>
                        </Box>
                    </Box>
                </FileUploader>
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
                <Button variant='contained' onClick={() => loadSave()} disabled={!file || !name}>
                    Load
                </Button>
            </DialogActions>
        </Dialog>
    )
}