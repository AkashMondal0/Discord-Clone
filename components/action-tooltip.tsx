"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { FC } from 'react';
type Side = 'left' | 'right' | 'top' | 'bottom'
type Align = 'start' | 'center' | 'end'
interface ActionTooltipProps {
    label: string
    children: React.ReactNode
    side?: Side
    align?: Align

}
const ActionTooltip: FC<ActionTooltipProps> = ({
    label,
    children,
    align,
    side
}) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className="font-semibold text-sm capitalize">{label.toLocaleLowerCase()}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ActionTooltip;