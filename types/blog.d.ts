export { Blog };

declare global {
  interface Blog {
    totalItems: number;
    rows: Row[];
    totalPages: number;
    currentPage: number;
  }

  interface Row {
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
    img: Img;
  }

  interface Img {
    url: string;
  }
}
