import type { Value, StoryChapter } from '../types'

export const values: Value[] = [
  { id: 'regional', title: 'Regional, not generic', body: 'Every dish has a home state. We cook it with its story intact.' },
  { id: 'share', title: 'Made for sharing', body: 'Chaknas on the middle of the table. Nobody eats alone here.' },
  { id: 'craft', title: 'Craft with restraint', body: 'Few ingredients, cooked properly. Drinks with a point of view.' },
  { id: 'warmth', title: 'Warm room, quiet service', body: 'Good lighting, honest pacing and a team that knows the menu cold.' },
]

export const storyChapters: StoryChapter[] = [
  { id: 'one', heading: 'It started with a question.', body: 'Why does Indian dining in most cities feel like one long list of the same dishes? Reeth began as an attempt to answer that: cook the regions as they are, and let the drinks catch up.' },
  { id: 'two', heading: 'Spice, then spirit.', body: 'A chakna is a small thing that starts a conversation. We build our bar around the same idea: a sour, a bitter or a smoky drink that makes the food taste better and the table talk longer.' },
  { id: 'three', heading: 'A room for the evening.', body: 'The room is warm, low and unhurried. Pendant lights, dark wood and arches that frame the table. We want you to stay past the last dish.' },
]
