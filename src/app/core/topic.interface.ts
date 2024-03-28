

export interface Topic {
    id: number;
    name: string;
    description: string;
    title: string;
    body: string;
    includeInSitemap: boolean;
    includeInUserMenu: boolean;
    includeInUserFooter: boolean;
    order: number;
    metaKeywords: string;
    metaDescription: string;
    metaTitle: string;
    isActive: boolean;
    topicTemplateId: number;
}
