"use client";

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {GlobeIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

const LocaleToggle = () => {
	const router = useRouter();
	const [locale, setLocale] = useState<string>("");
	
	useEffect(() => {
		const cookieLocale = document.cookie.split("; ").find((row) => row.startsWith("MYNEXTAPP_LOCALE="))?.split("=")[1];
		
		if (cookieLocale) {
			setLocale(cookieLocale)
		} else {
			const browserLocale = navigator.language.slice(0, 2);
			setLocale(browserLocale);
			document.cookie = `MYNEXTAPP_LOCALE=${browserLocale};`;
			router.refresh()
		}
		
	}, [router]);
	
	const changeLocale = (locale: string) => {
		setLocale(locale);
		document.cookie = `MYNEXTAPP_LOCALE=${locale};`;
		router.refresh()
	}
	
	console.log(locale);
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="focus-visible:ring-0 focus-visible:ring-offset-0"
				>
					<GlobeIcon/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => changeLocale("en")}>
					English
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => changeLocale("ru")}>
					Русский
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LocaleToggle;
