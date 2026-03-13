
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import LoginForm from "@/pages/auth/LoginForm";


const LoginDialog = ( {open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {

  return (
   <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Prijavi se</DialogTitle>
            <DialogDescription className="sr-only">
             Ovo je login forma. Ovde ćeš moći da se prijaviš na svoj nalog.
            </DialogDescription>
          </DialogHeader>
    
        {/* Form */}
        <LoginForm  />
          
          <DialogFooter>
          </DialogFooter>
        </DialogContent>
  
    </Dialog>
  )
  
}

export default LoginDialog;
