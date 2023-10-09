
import { ChatInput } from '@/components/chat/chat-Input';
import ChatHeader from '@/components/chat/chat-header';
import { ChatMessages } from '@/components/chat/chat-messages';
import { currentProfile } from '@/lib/current-profile';
import db from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface ChannelIdProps {
  params: {
    serverId: string;
    channelId: string;
  }
}
const ChannelId: FC<ChannelIdProps> = async ({
  params: {
    serverId,
    channelId
  }

}) => {

  const profile = await currentProfile()
  if (!profile) {
    return redirectToSignIn()
  }

  const channel = await db.channel.findUnique({
    where: {
      id: channelId
    }
  })

  const member = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id
    }
  })

  if (!member || !channel) {
    return redirect(`/servers/${serverId}`)
  }
  // console.log(channel)
  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader serverId={serverId} name={channel.name} type={'channel'} />
      <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
      <ChatInput
       apiUrl={'/api/socket/messages'} 
       query={{
        channelId: channel.id,
        serverId: channel.serverId,
      }}
       name={channel.name} 
       type={'channel'} />
    </div>
  );
};

export default ChannelId;