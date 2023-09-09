/* eslint-disable @next/next/no-img-element */
'use client'
import { FC, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from '@/hooks/use-modal-store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy, RefreshCcw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import axios from 'axios';



interface InviteServerModelProps { }
const InviteServerModel: FC<InviteServerModelProps> = () => {
    const { isOpen, onClose, type, data, onOpen } = useModal()
    const origin = useOrigin()
    const isModalOpen = isOpen && type === "invite"
    const { server } = data
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`
    const [copy, setCopy] = useState(false)
    const [loading, setLoading] = useState(false)

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopy(true)

        setTimeout(() => {
            setCopy(false)
        }, 1000)
    }

    const onNew = async () => {
        try {
            setLoading(true)
            const res = await axios.patch(`/api/servers/${server?.id}/invite-code`)
            onOpen('invite', { server: res.data })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Invite Friend
                    </DialogTitle>
                </DialogHeader>
                <div className='p-6'>
                    <Label className='uppercase text-xs font-bold
                    text-zinc-500 dark:text-secondary/70'>
                        Server invite link
                    </Label>
                    <div className='flex items-center mt-2 gap-x-2'>
                        <Input
                            disabled={loading}
                            className='bg-zinc-300/50 border-0 focus-visible:ring-0
                        text-black focus-visible:ring-offset-0'
                            value={inviteUrl} onChange={() => { }} />
                        <Button
                            disabled={loading}
                            size={"icon"} onClick={onCopy}>
                            {copy ?
                                <Check className='w-4 h-4' />
                                : <Copy className='w-4 h-4' />}
                        </Button>
                    </div>
                    <Button
                        disabled={loading}
                        onClick={onNew}
                        variant={"link"} size={"sm"}
                        className='text-xs text-zinc-500 mt-4'>
                        Generate a new link
                        <RefreshCcw className='w-4 h-4 ml-2' />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    );
};

export default InviteServerModel;