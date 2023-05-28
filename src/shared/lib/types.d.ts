interface IDevCard {
  name: string;
  github: string;
  img: string;
  link: string;
  translationKey?: string;
}

interface IDevCardList {
  devCardList: IDevCard[];
}

interface IMatchMedia {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
