import AboutPageContent from '@/components/AboutPageContent';
import { pageMetadata } from '@/lib/seo';
import { getOurStory, getTeamMembers } from '@/lib/team';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'About Fair Fasteners, an Ahmedabad supplier of specification-grade bolts, screws, nuts, washers, rivets, and industrial fastener programs.',
  path: '/about',
});

export default function AboutPage() {
  const story = getOurStory();
  const members = getTeamMembers();

  return <AboutPageContent story={story} members={members} />;
}
