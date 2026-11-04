import type { CateringPackage } from '../types'

// Catering packages. Per-head pricing is PLACEHOLDER.
export const packages: CateringPackage[] = [
  {
    id: 'intimate',
    name: 'Intimate',
    perHead: 1200,
    guests: '10 to 25 guests',
    blurb: 'A small table of chaknas, two mains and dessert, brought to your home or office.',
    included: ['Three chaknas', 'Two mains with rice and breads', 'Dessert', 'Staff for setup and service'],
  },
  {
    id: 'celebration',
    name: 'Celebration',
    perHead: 1800,
    guests: '25 to 80 guests',
    blurb: 'A full regional spread with a cocktail counter for the evening.',
    included: ['Five chaknas', 'Three mains and two vegetarian options', 'Cocktail counter with two signatures', 'Dessert station'],
  },
  {
    id: 'grand',
    name: 'Grand',
    perHead: 2600,
    guests: '80 to 200 guests',
    blurb: 'A chef-led menu across regions, with live counters and full bar service.',
    included: ['Chef-led menu across three regions', 'Live chakna and tandoor counters', 'Full bar service and bartenders', 'Event coordinator on the day'],
  },
]

export const sampleMenus = [
  { id: 'intimate-sample', title: 'Intimate sample menu', items: ['Jaipuri Mirchi Bhajji', 'Pahadi Paneer Tikka', 'Nadru Yakhni', 'Dal Bukhara', 'Malpua with Rabri'] },
  { id: 'celebration-sample', title: 'Celebration sample menu', items: ['Malvani Prawn Koliwada', 'Galouti Trio', 'Belgaum Chicken Curry', 'Saraswat Fish Thali', 'Tandoor Chocolate Cake'] },
  { id: 'grand-sample', title: 'Grand sample menu', items: ['Sol Kadhi Shots', 'Pahadi Paneer Tikka', 'Rogan Josh of Lamb', 'Kolhapuri Veg Kadhai', 'Kesar Pista Kulfi'] },
]

