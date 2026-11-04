import type { CareerRole } from '../types'

export const roles: CareerRole[] = [
  {
    id: 'line-cook',
    department: 'Kitchen',
    title: 'Line Cook',
    summary: 'Work the tandoor and the grill station for a busy dinner service.',
    responsibilities: ['Prep and cook to the recipe card', 'Keep mise en place tidy and labelled', 'Hold station standards through peak service'],
    requirements: ['1 year in a professional kitchen', 'Comfortable with tandoor and grill work', 'Food safety certification or willingness to get one'],
  },
  {
    id: 'sous-chef',
    department: 'Kitchen',
    title: 'Sous Chef',
    summary: 'Run the pass on busy nights and help build the regional menus.',
    responsibilities: ['Lead the brigade on service', 'Train and roster the line', 'Help develop regional menus with the chef'],
    requirements: ['4+ years in a kitchen, 1+ as sous or senior cook', 'Strong knowledge of Indian regional cooking', 'Calm under pressure'],
  },
  {
    id: 'host',
    department: 'Front of House',
    title: 'Host',
    summary: 'The first and last face of Reeth. Seating, timing and warmth.',
    responsibilities: ['Manage reservations and walk-ins', 'Keep the floor moving smoothly', 'Welcome guests with genuine warmth'],
    requirements: ['Previous hospitality experience preferred', 'Good spoken English and Hindi or Marathi', 'Organised and unflappable'],
  },
  {
    id: 'server',
    department: 'Front of House',
    title: 'Server',
    summary: 'Guide guests through chaknas, mains and drinks with confidence.',
    responsibilities: ['Take orders and recommend pairings', 'Explain the menu and regional stories', 'Keep tables turning with care'],
    requirements: ['1 year in fine dining or casual dining', 'Knowledge of food and drink basics', 'Team player'],
  },
  {
    id: 'bartender',
    department: 'Bar',
    title: 'Bartender',
    summary: 'Shake, stir and tell the story behind every glass.',
    responsibilities: ['Craft signature and classic cocktails', 'Run the bar during service', 'Keep stock and garnishes ready'],
    requirements: ['1 year behind a professional bar', 'Working knowledge of classic cocktails', 'Curious about spices and infusions'],
  },
  {
    id: 'bar-lead',
    department: 'Bar',
    title: 'Bar Lead',
    summary: 'Own the cocktail list, the team and the bar budget.',
    responsibilities: ['Write and refresh the cocktail menu', 'Train and schedule the bar team', 'Control costs and waste'],
    requirements: ['3+ years behind a bar, 1+ in a lead role', 'Creative with flavour and seasonal produce', 'Clear communicator'],
  },
]

