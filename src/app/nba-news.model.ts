// src/app/models/nba-news.model.ts
export interface NBANews {
  header: string;
  link: {
    language: string;
    rel: string[];
    href: string;
    text: string;
    shortText: string;
    isExternal: boolean;
    isPremium: boolean;
  };
  articles: {
    dataSourceIdentifier: string;
    description: string;
    headline: string;
    byline: string;
    images: {
      dataSourceIdentifier: string;
      name: string;
      width: number;
      id: number;
      credit: string;
      type: string;
      url: string;
      height: number;
    }[];
    type: string;
    premium: boolean;
    links: {
      api: {
        news: {
          href: string;
        };
        self: {
          href: string;
        };
      };
      web: {
        href: string;
      };
      mobile: {
        href: string;
      };
    };
    categories: {
      id: number;
      description: string;
      type: string;
      sportId: number;
      topicId?: number;
      leagueId?: number;
      league?: {
        id: number;
        description: string;
        links: {
          api: {
            leagues: {
              href: string;
            };
          };
          web: {
            leagues: {
              href: string;
            };
          };
          mobile: {
            leagues: {
              href: string;
            };
          };
        };
      };
      uid?: string;
      createDate: string;
    }[];
  }[];
}
