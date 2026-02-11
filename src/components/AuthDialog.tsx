import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  message?: string;
}

const AuthDialog = ({ isOpen, onOpenChange, message = "Please login to continue." }: AuthDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-slate-900">
            Account Required
          </DialogTitle>
          <DialogDescription className="text-center text-slate-500 pt-2">
            {message}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Link to="/auth?mode=login" onClick={() => onOpenChange(false)}>
            <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 gap-2">
              <LogIn className="w-5 h-5" /> Login
            </Button>
          </Link>
          <Link to="/auth?mode=signup" onClick={() => onOpenChange(false)}>
            <Button variant="outline" className="w-full h-12 text-lg gap-2">
              <UserPlus className="w-5 h-5" /> Sign Up
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
