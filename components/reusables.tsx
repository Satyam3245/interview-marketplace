import React, { ReactNode } from 'react';

interface Props {
    children : ReactNode
}
interface Props1 {
    gray : ReactNode,
    gold : ReactNode
}
export const GrayTitle = ({children}:Props)=>{
    return <span className='bg-linear-to-br from-stone-100 via-stone-300 to-stone-500 bg-clip-text text-transparent'>
        {children}
    </span>
}

export const GoldTitle = ({children}:Props)=>{
    return <span className='bg-linear-to-br from-amber-300 via-amber-400 to-amber-700 bg-clip-text text-transparent'>
        {children}
    </span>
}


export const SectionLabel = ({children}:Props)=>{
    return <p className='inline-flex items-center gap-2 tet-xs font-semibold text-amber-400 tracking-[0.14em] uppercase mb-4'>
        <span className='w-4 h-px bg-amber-400'/>
        {children}
    </p>
}

export const SectionHeading = ({gray,gold}:Props1)=>{
    return <h2 className='font-serif leading-[1.1] tracking-[-0.025em]  text-[clamp(2rem,4vw,3rem)]'>
        <GrayTitle>{gray}</GrayTitle>
        <br />
        <GoldTitle>{gold}</GoldTitle>
    </h2>
}

export const PageHeader = ({label,gray,gold,description,right}:any)=>{
    return <div className='border-b border-white/8 px-8 py-10'>
        <div className='max-w-6xl mx-auto flex items-center justify-center gap-4'>
            <div>
                {label && <SectionLabel>{label}</SectionLabel>}
                <h1 className='font-serif text-5xl tracking-tight mt-1'>
                    {gray && <GrayTitle>{gray}</GrayTitle>}
                    {gold && <GoldTitle>{gold}</GoldTitle>}
                </h1>
                {description && (
                    <p className='text-sm text-stone-500 font-light mt-2'>
                        {description}
                    </p>
                )}
            </div>
            {right  && <div className='shrink-0'>{right}</div>}
        </div>
    </div>
}