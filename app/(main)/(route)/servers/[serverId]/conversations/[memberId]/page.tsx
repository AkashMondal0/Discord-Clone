import { FC } from 'react';

interface ConversationProps {
    params: {
        serverId: string;
        memberId: string;
    }
}
const Conversation: FC<ConversationProps> = ({
    params: {
        serverId,
        memberId
    }
}) => {
    return (
        <div>
            <h1>Conversation</h1>
            <p>serverId: {serverId}</p>
            <p>memberId: {memberId}</p>
        </div>
    );
};

export default Conversation;