'use client'
import { FC, useEffect, useState } from 'react';
import CreateServerModel from '@/components/modals/create-server-modal';
import InviteServerModel from '@/components/modals/invite-server-modal';
import EditServerModel from '@/components/modals/edit-server-modal';
import MembersServerModel from '@/components/modals/members-server-modal';

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
            <InviteServerModel />
            <EditServerModel />
            <MembersServerModel/>
        </>
    );
};

export default ModelProvider;