import ModeToggle from "@/components/shared/header/mode-toggle";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {EllipsisVertical, MessageCircle} from "lucide-react";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import UserButton from "@/components/shared/header/user-button";
import LocaleToggle from "@/components/shared/header/locale-toggle";
import { useTranslations } from "next-intl";

const Menu = () => {
    const t = useTranslations();
    
    return (
      <div className="flex justify-end gap-3">
          <nav className="hidden md:flex w-full max-w-xs gap-1">
              <ModeToggle/>
              <LocaleToggle/>
              <Button
                asChild
                variant="ghost"
                className="w-full"
              >
                  <Link href="/chat">
                      <MessageCircle className="mr-2 h-4 w-4"/> {t("Chat")}
                  </Link>
              </Button>
              <UserButton/>
          </nav>
          <nav className="md:hidden">
              <Sheet>
                  <SheetTrigger className="align-middle">
                      <EllipsisVertical/>
                  </SheetTrigger>
                  <SheetContent className="flex flex-col items-start">
                      <SheetTitle>Menu</SheetTitle>
                      <div className="flex justify-between w-full mb-2">
                          <ModeToggle/>
                          <LocaleToggle/>
                          <UserButton/>
                      </div>
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full"
                      >
                          <Link
                            href="/chat"
                          >
                              <MessageCircle className="mr-2 h-4 w-4"/> Chat
                          </Link>
                      </Button>
                  </SheetContent>
              </Sheet>
          </nav>
      </div>
    );
};

export default Menu;