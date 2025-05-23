import {APP_NAME} from "@/lib/constants";
import { useTranslations } from "next-intl";

const Footer = () => {
	const t = useTranslations();
	const currentYear = new Date().getFullYear();
	
	return (
		<footer className="border-t">
			<div className="p-5 flex-center">
				{currentYear} {APP_NAME}. {t("AllRightsReserved")}
			</div>
		</footer>
	);
};

export default Footer;