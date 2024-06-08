'use client'
import styles from "./page.module.css";
import SaveDataUploader from "@/components/file_uploader";
import {SaveDataContextProvider} from "@/context/SaveDataContet";
import ZoneTabs from "@/components/zone_tabs/ZoneTabs";

export default function Home() {
    return (
        <SaveDataContextProvider>
            <main>
                <ZoneTabs/>
            </main>
        </SaveDataContextProvider>
    );
}
