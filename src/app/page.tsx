'use client'
import ZoneTabs from "@/components/zone_tabs";
import {useSearchParams} from "next/navigation";
import EmptyZone from "@/components/empty_zone";
import {Suspense} from "react";

export default function Home() {
    const params = useSearchParams();
    const zone = params.get('zone');

    return (
        <main>
            {zone ? <ZoneTabs/> : <EmptyZone/>}
        </main>
    );
}
