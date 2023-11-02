export type userSchema = {
  _id: string;
  email: string;
  password: string;
  userName: string;
  posts: postSchema[];
};
export type authObject = {
  authStatues: boolean;
  dataObject: {
    message: string;
    user: userSchema;
  };
};
export type postSchema = {
  _id?: string;
  title: string;
  breif: string;
  description: string;
  tags: string[];
  userId: string;
  createdAt: Date;
  lastUpdated: Date;
};

export type postInPage = {
  _id?: string;
  title: string;
  breif: string;
  description: string;
  tags: string[];
  userId: {
    _id: string;
    userName: string;
  };
  createdAt: Date;
  lastUpdated: Date;
};
