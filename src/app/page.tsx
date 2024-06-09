'use client'
import ZoneTabs from "@/components/zone_tabs/ZoneTabs";
import {useSearchParams} from "next/navigation";
import EmptyZone from "@/components/empty_zone";

export default function Home() {
    const params = useSearchParams();
    const zone = params.get('zone');

    return (
        <main>
            {zone ? <ZoneTabs/> : <EmptyZone/>}
        </main>
    );
}
