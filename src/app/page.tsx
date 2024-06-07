'use client'
import styles from "./page.module.css";
import SaveDataUploader from "@/components/file_uploader";
import {SaveDataContextProvider} from "@/context/SaveDataContet";

export default function Home() {
    return (
        <SaveDataContextProvider>
            <main className={styles.main}>
                <SaveDataUploader />
            </main>
        </SaveDataContextProvider>
    );
}
