export interface Gas {
    id: number;
    name: string;
    description: string;
    image_url: string;
    video_url: string;
    molar_mass: number;
    density: number;
    likes_count: number;
    attributes?: { name: string; value: string }[];
}
