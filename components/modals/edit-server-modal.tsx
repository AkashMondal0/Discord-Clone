/* eslint-disable @next/next/no-img-element */
'use client'
import { FC, useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FileUpload from '../file-upload';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Server name is required' }),
    imageUrl: z.string().min(1, { message: 'Server image is required' }),
})

interface EditServerModelProps { }
const EditServerModel: FC<EditServerModelProps> = () => {
    const router = useRouter()
    const { isOpen, onClose, type, data } = useModal()
    const { server } = data

    const isModalOpen = isOpen && type === "editServer"

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            imageUrl: '',
        }
    })


    useEffect(() => {
        if (server) {
            form.setValue("name", server.name)
            form.setValue("imageUrl", server.imageUrl)
        }
    }, [server, form])

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/servers/${server?.id}`, value)

            form.reset()
            router.refresh()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }


    const handleClose = () => {
        form.reset()
        onClose()
    }



    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Customize your server
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Give your server a name and an icon. You can always change it later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <div className='space-y-8 px-6'>
                            <div className='flex items-center justify-center text-center'>
                                <FormField control={form.control}
                                    name='imageUrl'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    endpoint="serverImage" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase 
                                        text-xs font-bold text-zinc-500 
                                        dark:text-secondary/70">
                                            Server Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                disabled={isLoading}
                                                {...field}
                                                placeholder="Enter a server name"
                                                className="bg-zinc-300/50 border-0 
                                                focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className='bg-gray-100 px-6 py-4'>
                            <Button disabled={isLoading} variant={"primary"}>
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    );
};

export default EditServerModel;