import { CodeDemo } from "@/components/demo-components-animate-code";
import { StarsBackgroundDemo } from "@/components/demo-components-backgrounds-stars";
import { GoldTitle, GrayTitle, SectionHeading, SectionLabel } from "@/components/reusables";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AVATARS, LOGOS } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
   <div>
      <section className="pt-28 sm:pt-32 relative min-h-screen grid grid-cols-1 lg:grid-cols-5 px-4 sm:px-8 pb-20 overflow-hidden">
        <StarsBackgroundDemo/>

        <div className="col-span-full lg:col-span-3 flex flex-col items-center justify-center text text-center lg:rotate-2">
          <Badge variant='gold'>Power By AI - Now in Beta</Badge>

          <h1 className="font-serif relative text-5xl sm:text-6xl lg:text-7xl tracking-tighter max-w-4xl">
            <GrayTitle>Ace your next interview</GrayTitle>
            <br />
            <GoldTitle>with real experts</GoldTitle>
          </h1>

          <p className="relative text-sm sm:text-base md:text-lg text-stone-400 max-w-xl mt-6 leading-relaxed">
            Book 1:1 mock interviews with senior engineers from top companies.
            Get AI-powered feedback, role-specific questions, and the confidence
            to land your dream job.
          </p>

          <div className="relative flex justify-center gap-2 sm:gap-4 mt-10 sm:w-auto">
            <Link href='/onboarding'>
              <Button size="lg" variant="gold">
                Get started
              </Button>
            </Link>
            <Link href='/explore'>
              <Button size="lg" variant="gold">
                Browse Interviewers →
              </Button>
            </Link>
          </div>

          <div className="relative flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-16">
            <div className="flex">
              {AVATARS.map((av,i)=>(
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#0a0a0b] overflow-hidden ${
                    i > 0 ? "-ml-2" : ""
                  }`}>
                  <Image
                   src={av.src} 
                   alt="user avtar" 
                   width={32} 
                   height={32} 
                   className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <p className="text-sm text-stone-500 text-center sm:text-left">
              <strong className="text-stone-400 font-medium">
                2,400+ engineers
              </strong>{" "}
              cracked FAANG interviews via Prept
            </p>
          </div>
        </div>

        <div className="col-span-full lg:col-span-2 flex items-center justify-center lg:justify-start mt-12 lg:mt-0 lg:rotate-3">
            <CodeDemo duration={30000} writing delay={0} cursor/>
        </div>
      </section>
      <section className="relative z-10 border-y border-white/10 py-14">
          
          <p className="text-center text-xs font-medium text-stone-600 tracking-widest uppercase mb-8">
              Interviewees landed roles at
          </p>

          <div className="flex flex-wrap items-center justify-center gap-24">
              {LOGOS.map((i)=>(
                <Image 
                  src={i.src}
                  alt={i.alt}
                  width={50}
                  height={50}
                  className="h-6"
                />
              ))}
          </div>
      </section>
      <section className="relative z-10 py-28 max-w-5xl mx-auto px-6">

        <div className="text-center mb-16 text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.025em]">
              <SectionLabel>Features</SectionLabel>
              <SectionHeading
                gray = "Everything you need,"
                gold = "nothing you don't"
              />                
        </div>
        <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-7">
                  
              </div>
        </div>
      </section>
   </div>
  );
}
