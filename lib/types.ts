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
  sections: sectionSchema[];
  tags: string[];
  userId: string;
  createdAt: Date;
  lastUpdated: Date;
};
export type sectionSchema = {
  indexN: number;
  title: string;
  description: string;
};
