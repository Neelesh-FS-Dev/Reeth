// Search queries for the free stock photos to use until the owner's photography arrives.
// Each entry names the local image it stands in for. Record the photographer and licence in CREDITS.md.
// Currently the repo ships generated placeholder artwork; download real photos from Unsplash or Pexels
// using these queries and run `pnpm images` to regenerate the derivatives.
export const placeholderQueries: Record<string, string> = {
  hero: 'indian restaurant dining room evening warm lights',
  intro: 'indian street food chef hands plating',
  'about-teaser': 'cocktail bar amber lights indian restaurant',
  'about-hero': 'indian kitchen brass pots warm',
  'catering-hero': 'indian banquet table celebration',
  'careers-hero': 'restaurant team kitchen smiling',
  'contact-hero': 'restaurant table set evening candles',
  'menu-hero': 'indian food platter overhead',
  'events-hero': 'live jazz band restaurant night',
  'reels-hero': 'restaurant interior night lights',
  'reserve-band': 'dark restaurant table night',
  'highlight-nadru': 'kashmiri lotus stem curry',
  'highlight-belgaum': 'coconut chicken curry bowl',
  'highlight-jaipuri': 'stuffed green chilli fritters',
  'highlight-sour': 'whiskey sour cocktail glass',
  'team-chef': 'indian chef portrait kitchen',
  'team-bar': 'bartender portrait cocktail bar',
  'team-foh': 'restaurant manager portrait smiling',
  'og-image': 'indian restaurant dinner table overhead',
}
