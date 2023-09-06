'use client'
import { FC, useEffect, useState } from 'react';
import CreateServerModel from '../modals/create-server-modal';

interface ModelProviderProps {
}
const ModelProvider: FC<ModelProviderProps> = ({

}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) return null


    return (
        <>
            <CreateServerModel />
        </>
    );
};

export default ModelProvider;