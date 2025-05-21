import {useTranslations} from "next-intl";

const HomePage = () => {
	const t = useTranslations()
	return (
		<div>
			{t("Hello")}
		</div>
	);
};

export default HomePage;