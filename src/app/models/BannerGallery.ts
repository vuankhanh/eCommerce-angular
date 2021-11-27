import { Media } from "./ProductGallery";

export interface BannerGallery{
    _id: string,
    name: string,
    bannerName: string,
    media: Array<Media>,
    createdAt: string,
    updatedAt: string
}