import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PricingTable } from "@clerk/nextjs";
import { AlertCircle } from "lucide-react";


interface UpgradeModelProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  reason : string
}

export default function UpgradeModel({ open, onOpenChange,reason }: UpgradeModelProps){
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-amber-200/10 min-w-[70vw] max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <div className="flex items-start gap-2 mb-2">
                        <AlertCircle className="text-amber-400 ml-2 mt-1" />
                        <div>
                        <DialogTitle className="font-serif text-2xl">
                            Upgrade your plan
                        </DialogTitle>
                        {reason && (
                            <DialogDescription className="text-amber-400 mt-1">
                            {reason}
                            </DialogDescription>
                        )}
                        </div>
                    </div>
                </DialogHeader>
                <div className="px-2 pb-6">
                    <PricingTable/>
                </div>
            </DialogContent>
        </Dialog>
    )
}