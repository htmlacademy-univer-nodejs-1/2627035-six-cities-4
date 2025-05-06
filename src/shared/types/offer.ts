import { OfferType } from './offer-type';
import { Category } from './category.type';
import { User } from './user';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  image: string;
  type: OfferType
  price: number;
  categories: Category[];
  user: User;
}
