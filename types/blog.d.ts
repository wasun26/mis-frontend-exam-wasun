export { BlogsModel, Blog };

declare global {
  interface BlogsModel {
    totalItems: number;
    rows: Blog[];
    totalPages: number;
    currentPage: number;
  }

  interface Blog {
    id: number;
    title: string;
    content: string;
    hit: number;
    img_id: number;
    user_id: number;
    pin: boolean;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    Img: Img;
  }

  interface Img {
    url: string;
  }
}
