import {useContext} from "react";
import SaveDataContext from "@/context/SaveDataContet";

const useSaveData = () => {
    return useContext(SaveDataContext)
}

export default useSaveData;
