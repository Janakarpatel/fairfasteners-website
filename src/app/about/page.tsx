import AboutPageContent from '@/components/AboutPageContent';
import { getOurStory, getTeamMembers } from '@/lib/team';

export const metadata = {
  title: 'About — Fair Fasteners',
  description:
    'Specification-grade fasteners and supply programs for industries where failure is not an option.',
};

export default function AboutPage() {
  const story = getOurStory();
  const members = getTeamMembers();

  return <AboutPageContent story={story} members={members} />;
}
