'use client'
import { UploadDropzone } from '@/lib/uploadthing';
import { FC } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import "@uploadthing/react/styles.css";
import { Button } from './ui/button';

interface FileUploadProps {
    onChange: (url?: string) => void
    endpoint: "messageFile" | "serverImage"
    value?: string
}
const FileUpload: FC<FileUploadProps> = ({
    onChange,
    endpoint,
    value
}) => {

    const fileType = value?.split('.').pop()

    if (value && fileType !== "pdf") {
        return (
            <div className='relative h-20 w-20'>
                <Image
                    src={value}
                    fill
                    className='rounded-full'
                    alt={'Upload'} />
                <Button
                    className='bg-red-500 text-white rounded-full
                     absolute top-0 right-0 shadow-md p-1 w-6 h-6'
                    onClick={() => onChange('')}>
                    <X className='h-4 w-4' />
                </Button>
            </div>
        )
    }

    return (
        <UploadDropzone
            onClientUploadComplete={(res) => {
                onChange(res?.[0].fileUrl)
            }}
            onUploadError={(err) => {
                console.log(err)
            }}
            endpoint={endpoint} />
    );
};

export default FileUpload;
