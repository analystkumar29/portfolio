export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang: string; code: string };

export type Note = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  project: string;
  projectSlug: "travelling-technicians" | "immigration-timeline" | "raba-thrift";
  readingMinutes: number;
  body: NoteBlock[];
};

// Filled in with the three engineering notes before this branch merges.
export const NOTES: Note[] = [];

export function noteBySlug(slug: string): Note | undefined {
  return NOTES.find((note) => note.slug === slug);
}
