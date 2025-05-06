import {City, Facilities, HouseType, Offer, User, UserType} from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewPath,
    imagePaths,
    isPremium,
    isFavorites,
    rating,
    houseType,
    roomsCount,
    guestCount,
    rentalCost,
    facilities,
    commentsCount,
    coordinates,
    username,
    email,
    avatarPath,
    userType
  ] = offerData.replace('\n', '').split('\t');

  const user: User = {
    name: username,
    email,
    avatarPath,
    type: UserType[userType as 'Pro' | 'Base'],
    password: ''
  };

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: City[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
    previewPath,
    imagePaths: imagePaths.split('; '),
    isPremium: isPremium === 'true',
    isFavorites: isFavorites === 'true',
    rating: Number(rating),
    houseType: HouseType[houseType as 'apartament' | 'house' | 'room' | 'hotel' ],
    roomsCount: Number(roomsCount),
    guestCount: Number(guestCount),
    rentalCost: Number(rentalCost),
    facilities: facilities as Facilities,
    user,
    commentsCount: Number(commentsCount),
    coordinates: coordinates.split('; ').map(Number) as [number, number]
  };
}
