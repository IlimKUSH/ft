import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations();
	return {
		title: t("Home"),
	};
}

const HomePage = () => {
	const t = useTranslations()
	return (
		<div>
			{t("Hello")}
		</div>
	);
};

export default HomePage;