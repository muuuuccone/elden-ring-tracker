'use client';
import React, {ReactNode} from "react";
import createCache, {Options} from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {eldenRingTheme} from "@/theme/eldenRingTheme";

type ThemeRegistryProps = {
    options: Options,
    children: ReactNode
}

export default function ThemeRegistry({options, children}: ThemeRegistryProps) {

    const [{ cache, flush }] = React.useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: any[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={eldenRingTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}