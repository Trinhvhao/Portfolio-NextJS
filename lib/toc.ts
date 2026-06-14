export type TocItem = {
  id: string;
  title: string;
  depth: 2 | 3;
};

export type TocGroup = {
  id: string;
  title: string;
  children: Array<{ id: string; title: string }>;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function extractHeadings(source: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(source)) !== null) {
    const depth = match[1].length as 2 | 3;
    const title = match[2].trim();
    const id = slugify(title);
    headings.push({ id, title, depth });
  }

  return headings;
}

export function buildTocGroups(items: TocItem[]): TocGroup[] {
  const groups: TocGroup[] = [];
  let currentGroup: TocGroup | null = null;

  items.forEach((item) => {
    if (item.depth === 2) {
      currentGroup = {
        id: item.id,
        title: item.title,
        children: [],
      };
      groups.push(currentGroup);
      return;
    }

    if (currentGroup) {
      currentGroup.children.push({ id: item.id, title: item.title });
    }
  });

  return groups;
}

export { slugify };
