import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import MainPage from "routes/Main";

export default function Home() {
  
  const { t } = useTranslation();
  
  return (
    <>
      <Head>
        <title>InterBloc - {t('common:page-home')}</title>
      </Head>
      <MainPage/>
    </>
  )
}
