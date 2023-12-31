'use client'
import { FC, useEffect, useState } from 'react';
import CreateServerModel from '@/components/modals/create-server-modal';
import InviteServerModel from '@/components/modals/invite-server-modal';
import EditServerModel from '@/components/modals/edit-server-modal';
import MembersServerModel from '@/components/modals/members-server-modal';
import CreateChannelModel from '@/components/modals/create-channel-modal';
import LeaveServerModel from '@/components/modals/leave-server-modal';
import DeleteServerModel from '@/components/modals/delete-server-modal';
import DeleteChannelModel from '@/components/modals/delete-channel-modal';
import EditChannelModel from '../modals/edit-channel-model';

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
            <EditChannelModel />
            <MembersServerModel />
            <CreateChannelModel />
            <LeaveServerModel />
            <DeleteServerModel/>
            <DeleteChannelModel/>
        </>
    );
};

export default ModelProvider;