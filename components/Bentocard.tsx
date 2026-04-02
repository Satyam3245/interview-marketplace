import { ReactNode  } from "react"
// import { LucideIcon } from "lucide-react";

interface bentoCard {
    logo : any,
    title : string,
    desc : string,
    children: ReactNode,
    className : string
}
export const BentoCard = ({title,desc,children,className,logo}:bentoCard)=>{
    return <div className={`relative bg-[#0f0f11] border border-white/10 hover:border-amber-400/20 rounded-2xl p-9 h-full transition duration-300 overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-linear-to-br from-amber-400/5 via-transparent pointer-events-none"/>
        <span className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-xl mb-5">{logo}</span>
        <h3 className="font-serif text-xl tracking-tight mb-2">{title}</h3>
        <p className="text-sm text-stone-400 leading-relaxed">{desc}</p>
        {children}
    </div>
}