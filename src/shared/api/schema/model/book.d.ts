interface Volume {
  title: string;
  subtitle?: string;
  authors: string[];
  publisher?: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];
  readingModes: {
    text: boolean;
    image: boolean;
  };
  pageCount: number;
  dimensions?: {
    height: string;
    width: string;
    thickness: string;
  };
  printType: string;
  mainCategory?: string;
  categories: string[];
  maturityRating: string;
  averageRating?: number;
  ratingsCount?: number;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
  };
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

interface SalesInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice?: {
    amount: number;
    currencyCode: string;
  };
  retailPrice?: {
    amount: number;
    currencyCode: string;
  };
  buyLink?: string;
}

interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: {
    isAvailable: boolean;
    acsTokenLink?: string;
  };
  pdf: {
    isAvailable: boolean;
  };
  webReaderLink?: string;
  accessViewStatus: string;
  quoteSharingAllowed?: boolean;
}

interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: Volume;
  saleInfo: SalesInfo;
  accessInfo: AccessInfo;
  searchInfo?: {
    textSnippet: string;
  };
}

interface SearchBookListRes {
  kind: string;
  totalItems: number;
  items: Book[];
}
