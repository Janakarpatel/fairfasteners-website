import rawTeam from '@/data/team.json';

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  note: string[];
  image?: string | null;
};

function normalizeImagePath(image: unknown): string | null {
  if (typeof image !== 'string') return null;
  const trimmed = image.trim();
  if (!trimmed) return null;

  const withoutPublic = trimmed.replace(/^public\//, '');
  if (withoutPublic.startsWith('/')) return withoutPublic;
  if (withoutPublic.startsWith('http://') || withoutPublic.startsWith('https://')) {
    return withoutPublic;
  }
  return `/${withoutPublic}`;
}

function isTeamMember(x: unknown): x is Omit<TeamMember, 'image'> & { image?: unknown } {
  if (!x || typeof x !== 'object') return false;
  const v = x as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.name === 'string' &&
    typeof v.role === 'string' &&
    Array.isArray(v.note) &&
    v.note.every((p) => typeof p === 'string')
  );
}

export function getOurStory(): string {
  const story = (rawTeam as { story?: unknown }).story;
  return typeof story === 'string' ? story : '';
}

export function getTeamMembers(): TeamMember[] {
  const list = (rawTeam as { members?: unknown }).members;
  if (!Array.isArray(list)) return [];
  return list.filter(isTeamMember).map((member) => ({
    ...member,
    image: normalizeImagePath(member.image),
  }));
}
