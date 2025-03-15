import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 py-3 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-lime-400 text-xs sm:text-sm">
          {t("All Rights Reserved")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
