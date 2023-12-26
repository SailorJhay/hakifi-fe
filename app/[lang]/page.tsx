/* eslint-disable react-hooks/rules-of-hooks */
import { Metadata } from 'next';
import { useTranslation } from '@/i18n';
import { BASE_URL } from '@/utils/constant';
import HomePage from '@/components/home';

type TProps = {
  params: { lang: string };
};

export const generateMetadata = async ({
  params: { lang },
}: TProps): Promise<Metadata> => {
  const { t } = await useTranslation(lang, 'common');
  return {
    // title: t("title"),
    description: t('description'),
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        en: '/en',
        vi: '/vi',
      },
    },
  };
};

const Home = ({ params: { lang } }: TProps) => {
  return <HomePage lang={lang} />;
};

export default Home;
