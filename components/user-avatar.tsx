import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from '@/lib/utils';

interface UserAvatarProps {
    src: string
    className?: string
}
const UserAvatar: FC<UserAvatarProps> = ({
    src,
    className
}) => {
    return (
        <Avatar className={cn("h-7 md:h-10 md:w-10", className)}>
            <AvatarImage src={src} />
            <AvatarFallback>Avatar image</AvatarFallback>
        </Avatar>

    );
};

export default UserAvatar;