export type TBlog = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  eventId?: number;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type TblogInitialState = {
  blog: Array<TBlog> | null;
};

export type TBlogResponse = {
  status: string;
  statusCode: number;
  message: string;
  data: Array<TBlog>;
};

export type TBlogSingleResponse = {
  status: string;
  statusCode: number;
  message: string;
  data: TBlog;
};

export type TcreateBlog = {
  title: string;
  content: string;
  thumbnail: File | null;
  eventId?: number;
  categoryId: number;
};
