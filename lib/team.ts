import { getPayload } from "payload";
import config from "@payload-config";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
  links?: { label: string; url: string }[];
  order?: number;
}

interface PayloadTeamDoc {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  photo?: { url?: string } | string | null;
  links?: { label: string; url: string; id?: string }[] | null;
  order?: number | null;
}

function toMember(doc: PayloadTeamDoc): TeamMember {
  const photo = doc.photo;
  const photoUrl =
    typeof photo === "object" && photo !== null ? photo.url : undefined;
  return {
    id: String(doc.id),
    name: doc.name,
    role: doc.role,
    bio: doc.bio ?? undefined,
    photoUrl,
    links: doc.links?.map((l) => ({ label: l.label, url: l.url })),
    order: doc.order ?? 100,
  };
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "team-members",
    sort: "order",
    limit: 100,
  });
  return result.docs.map((d) => toMember(d as unknown as PayloadTeamDoc));
}
