'use client'
import { FC, useEffect, useState } from 'react';
import CreateServerModel from '@/components/modals/create-server-modal';
import InviteServerModel from '@/components/modals/invite-server-modal';
import EditServerModel from '@/components/modals/edit-server-modal';
import MembersServerModel from '@/components/modals/members-server-modal';
import CreateChannelModel from '@/components/modals/create-channel-modal';
import LeaveServerModel from '@/components/modals/leave-server-modal';
import DeleteServerModel from '../modals/delete-server-modal';

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
            <MembersServerModel />
            <CreateChannelModel />
            <LeaveServerModel />
            <DeleteServerModel/>
        </>
    );
};

export default ModelProvider;