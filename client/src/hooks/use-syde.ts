import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// FAQs
export function useFaqs() {
  return useQuery({
    queryKey: [api.faqs.list.path],
    queryFn: async () => {
      const res = await fetch(api.faqs.list.path);
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      return api.faqs.list.responses[200].parse(await res.json());
    },
  });
}

// Team Members
export function useTeam() {
  return useQuery({
    queryKey: [api.team.list.path],
    queryFn: async () => {
      const res = await fetch(api.team.list.path);
      if (!res.ok) throw new Error("Failed to fetch Team");
      return api.team.list.responses[200].parse(await res.json());
    },
  });
}

// Guides
export function useGuides() {
  return useQuery({
    queryKey: [api.guides.list.path],
    queryFn: async () => {
      const res = await fetch(api.guides.list.path);
      if (!res.ok) throw new Error("Failed to fetch Guides");
      return api.guides.list.responses[200].parse(await res.json());
    },
  });
}

export function useGuide(slug: string) {
  return useQuery({
    queryKey: [api.guides.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.guides.get.path, { slug });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch Guide");
      return api.guides.get.responses[200].parse(await res.json());
    },
  });
}
