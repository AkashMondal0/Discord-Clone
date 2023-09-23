import ChatHeader from '@/components/chat/chat-header';
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

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader serverId={serverId} name={channel.name} type={'channel'}
      //  imageUrl={channel.}
        />
    </div>
  );
};

export default ChannelId;