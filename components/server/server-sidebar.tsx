import { FC } from 'react';
import { ChannelType, MemberRole } from '@prisma/client';
import { currentProfile } from '@/lib/current-profile';

import db from '@/lib/db';
import { redirect } from 'next/navigation';
import ServerHeader from './server-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import ServerSearch from './server-search';
import { Hash, Mic, ShieldCheck, Video } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ServerSection from './server-section';
import ServerChannel from './server-channel';
import ServerMembers from './server-members';

interface ServerSidebarProps {
    serverId: string
}

const iconMap = {
    [ChannelType.TEXT]: <Hash className='mr-2 h-4 w-4' />,
    [ChannelType.AUDIO]: <Mic className='mr-2 h-4 w-4' />,
    [ChannelType.VIDEO]: <Video className='mr-2 h-4 w-4' />
}

const roleIconMap = {
    [MemberRole.ADMIN]: null,
    [MemberRole.GUEST]: <ShieldCheck className='mr-2 h-4 w-4 text-indigo-500' />,
    [MemberRole.MODERATOR]: <ShieldCheck className='mr-2 h-4 w-4 text-rose-500' />
}

const ServerSidebar: FC<ServerSidebarProps> = async ({
    serverId
}) => {
    const profile = await currentProfile()

    if (!profile) {
        return redirect('/')
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    })

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
    const members = server?.members.filter((member) => member.profileId !== profile.id)

    if (!server) {
        return redirect('/')
    }

    const role = server.members.find(member => member.profileId === profile.id)?.role


    return (
        <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
            <ServerHeader server={server} role={role} />
            <ScrollArea className='flex-1 px-3'>
                <div className='mt-2'>
                    <ServerSearch data={[
                        {
                            label: "Text Channels",
                            type: "channel",
                            data: textChannels?.map((textChannel) => ({
                                id: textChannel.id,
                                name: textChannel.name,
                                icon: iconMap[textChannel.type]
                            }))
                        },
                        {
                            label: "Voice Channels",
                            type: "channel",
                            data: audioChannels?.map((audioChannel) => ({
                                id: audioChannel.id,
                                name: audioChannel.name,
                                icon: iconMap[audioChannel.type]
                            }))
                        },
                        {
                            label: "Video Channels",
                            type: "channel",
                            data: videoChannels?.map((videoChannel) => ({
                                id: videoChannel.id,
                                name: videoChannel.name,
                                icon: iconMap[videoChannel.type]
                            }))
                        }
                        , {
                            label: "Members",
                            type: "member",
                            data: members?.map((member) => ({
                                id: member.id,
                                name: member.profile.name,
                                icon: roleIconMap[member.role]
                            }))
                        }
                    ]} />
                </div>
                <Separator className='bg-zinc-200 dark:bg-zinc-700 rounded-md my-2' />
                {!!textChannels?.length && (
                    <div>
                        <ServerSection
                            label={"Text Channels"}
                            channelType={ChannelType.TEXT}
                            role={role}
                            sectionType={"channels"} />
                        {textChannels.map((channel) => {
                            return <ServerChannel
                                key={channel.id}
                                role={role}
                                channel={channel}
                                server={server} />
                        })}
                    </div>
                )}
                {!!audioChannels?.length && (
                    <div>
                        <ServerSection
                            label={"Audio Channels"}
                            channelType={ChannelType.AUDIO}
                            role={role}
                            sectionType={"channels"} />
                        {audioChannels.map((channel) => {
                            return <ServerChannel
                                key={channel.id}
                                role={role}
                                channel={channel}
                                server={server} />
                        })}
                    </div>
                )}
                {!!videoChannels?.length && (
                    <div>
                        <ServerSection
                            label={"Video Channels"}
                            channelType={ChannelType.VIDEO}
                            role={role}
                            sectionType={"channels"} />
                        {videoChannels.map((channel) => {
                            return <ServerChannel
                                key={channel.id}
                                role={role}
                                channel={channel}
                                server={server} />
                        })}
                    </div>
                )}
                {!!members?.length && (
                    <div>
                        <ServerSection
                            label={"Members"}
                            channelType={ChannelType.VIDEO}
                            role={role}
                            sectionType={"members"} />
                        {members.map((member) => {
                            return <ServerMembers key={member.id}
                                member={member} server={server} />
                        })}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};

export default ServerSidebar;