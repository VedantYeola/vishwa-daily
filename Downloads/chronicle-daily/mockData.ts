
import { Article, CategoryType } from './types';

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Rise of Generative AI in Creative Industries',
    excerpt: 'How large language models and diffusion techniques are reshaping the landscape for artists and designers globally.',
    content: 'Generative AI is no longer a futuristic concept but a daily reality for millions. From generating high-fidelity images with tools like Midjourney to drafting scripts with LLMs, the creative process is undergoing a seismic shift. Critics argue about the "soul" of art, while proponents see a new era of democratized creativity where technical skill is less of a barrier than vision. In the past year alone, the industry has seen a 400% increase in the use of AI-assisted design tools in professional workflows...',
    author: 'Sarah Chen',
    publishedAt: '2024-05-15',
    category: CategoryType.TECH,
    imageUrl: 'https://picsum.photos/seed/tech1/800/600',
    readTime: '6 min'
  },
  {
    id: '2',
    title: 'Global Climate Summit Reaches Historic Agreement',
    excerpt: 'World leaders commit to aggressive carbon reduction targets as planetary temperatures reach record highs.',
    content: 'In a marathon session that lasted through the night, delegates from 190 nations finalized a pact to phase out fossil fuels significantly faster than previously planned. The agreement includes a $100 billion annual fund for developing nations to transition to green energy. "We are at a crossroads," said the UN Secretary-General. "This agreement shows that despite our differences, the survival of the planet remains our common goal." Environmental groups have expressed cautious optimism...',
    author: 'James Wilson',
    publishedAt: '2024-05-14',
    category: CategoryType.WORLD,
    imageUrl: 'https://picsum.photos/seed/world1/800/600',
    readTime: '8 min'
  },
  {
    id: '3',
    title: 'Modern Minimalism: Why Less is More in 2024',
    excerpt: 'The psychological benefits of decluttering and how it is influencing modern architecture and lifestyle.',
    content: 'The "Scandi-Minimalist" movement has evolved. Today, it is less about having nothing and more about having only what matters. Experts are calling it "Curated Living." Research suggests that reduced visual clutter in living spaces leads to a 25% decrease in cortisol levels. Architects are responding with modular homes that emphasize light, space, and natural materials. We talked to five leading interior designers about how to achieve this balance without making a home feel cold...',
    author: 'Elena Rossi',
    publishedAt: '2024-05-13',
    category: CategoryType.LIFESTYLE,
    imageUrl: 'https://picsum.photos/seed/life1/800/600',
    readTime: '5 min'
  },
  {
    id: '4',
    title: 'Rookie Star Shakes Up the League in Stunning Debut',
    excerpt: 'Analysis of the game-changing performance that has everyone talking about the next generation of athletes.',
    content: 'It was the debut heard round the world. Coming off the bench in the second half, the 19-year-old phenom scored 30 points and secured 10 rebounds, leading the underdog team to a victory over the reigning champions. Scouting reports had praised his speed, but his situational awareness surpassed all expectations. "I just wanted to help the team," he said in a post-game interview that has since gone viral. We look back at the greatest debuts in league history to see how this one stacks up...',
    author: 'Marcus Jordon',
    publishedAt: '2024-05-12',
    category: CategoryType.SPORTS,
    imageUrl: 'https://picsum.photos/seed/sports1/800/600',
    readTime: '4 min'
  },
  {
    id: '5',
    title: 'The Quantum Computing Breakthrough You Missed',
    excerpt: 'Scientists achieve stable qubit coherence at room temperature, bringing us closer to a computing revolution.',
    content: 'Quantum computing has long been restricted to specialized labs with temperatures colder than deep space. However, a team of researchers in Tokyo has successfully demonstrated qubit coherence at room temperature using a novel crystalline structure. This breakthrough removes one of the most significant engineering hurdles for commercial quantum computers. Imagine a world where complex drug discovery takes minutes instead of decades. We are on the precipice of a new era of human understanding...',
    author: 'Dr. Aris Thorne',
    publishedAt: '2024-05-11',
    category: CategoryType.SCIENCE,
    imageUrl: 'https://picsum.photos/seed/sci1/800/600',
    readTime: '10 min'
  }
];
