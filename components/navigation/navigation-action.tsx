'use client'

import { Plus } from 'lucide-react';
import { FC } from 'react';
import ActionTooltip from '../action-tooltip';
import { useModal } from '@/hooks/use-modal-store';

interface NavigationActionProps { }
const NavigationAction: FC<NavigationActionProps> = () => {
    const { onOpen } = useModal()
    return (
        <div>
            <ActionTooltip label='Add a server' side='right' align='center'>
                <button className='group flex item-center' onClick={() => onOpen("createServer")}>
                    <div className='flex mx-3 h-[48px] w-[48px] rounded-[48px]
                group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center
                bg-background dark:bg-neutral-700 dark:hover:bg-emerald-500
                '>
                        <Plus className='group-hover:text-white transition-all text-emerald-500' size={25} />
                    </div>
                </button>
            </ActionTooltip>

        </div>
    );
};

export default NavigationAction;