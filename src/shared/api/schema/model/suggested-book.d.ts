interface SuggestedBook {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  isEbook: boolean;
  categories: string[];
  imageLinks: {
    thumbnail: string;
  };
}

type BooksList = {
  items: SuggestedBook[];
};
