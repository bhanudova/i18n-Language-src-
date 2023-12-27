import { getLanguageData } from "@/services/i18n"
import { Locale } from "../../../i18n-config"
import Switch from "./components/Switcher"
export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  const dictionary = await getLanguageData(lang, "header")



  return (
    <>
      <div>
        <div className="m-[10rem]">
          <Switch lang={lang} />
          <div className="mt-2">
            <h1>{dictionary.h1}</h1>
            <p>{dictionary.p}</p>
          </div>
        </div>
      </div>
    </>
  )
}
