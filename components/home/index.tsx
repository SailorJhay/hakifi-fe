import Banner from "./Banner";
import CountStatistic from "./CountStatistic";
import MapComponent from "./MapComponent";
import WhyChooseLanding from "./WhyChooseLanding";
import StepLanding from "./StepLanding";
import AboutUsLanding from "./AboutUsLanding";
import OnchainActivity from "./OnchainActivity";
import StyledComponentsRegistry from "@/components/common/StyleProvider";
import DevTeamLanding from "./DevTeamLanding";
type TProps = {
  lang: string;
};
async function HomePage({ lang }: TProps) {
  return (
    <StyledComponentsRegistry>
      <Banner lang={lang} />
      <div className="w-full lg:px-0 px-4 lg:py-0 py-6"><CountStatistic /></div>
      <MapComponent lang={lang} />
      <WhyChooseLanding lang={lang} />
      <StepLanding lang={lang} />
      <AboutUsLanding lang={lang} />
      <OnchainActivity lang={lang} />
      <DevTeamLanding lang={lang}/>
    </StyledComponentsRegistry>
  );
}

export default HomePage;
