import { FC } from 'react';

interface ChannelIdProps {
  params: {
    serverId: string;
    channelId: string;
  }
}
const ChannelId: FC<ChannelIdProps> = ({
  params: {
    serverId,
    channelId
  }

}) => {


  return (
    <div>
      <h1>ChannelId</h1>
      <p>serverId: {serverId}</p>
      <p>channelId: {channelId}</p>
    </div>
  );
};

export default ChannelId;