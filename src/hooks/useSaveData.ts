import {useContext} from "react";
import SaveDataContext from "@/context/SaveDataContext";

const useSaveData = () => {
    return useContext(SaveDataContext)
}

export default useSaveData;
