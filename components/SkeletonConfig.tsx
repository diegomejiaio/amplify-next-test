'use client';
import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonCardProps {
    w: string;
    h: string;
}

export default function SkeletonConfig({ w, h }: SkeletonCardProps) {
    return (
        <>
            <Skeleton className={`h-[${h}] w-[${w}] rounded-xl`} />
        </>
    )
}

