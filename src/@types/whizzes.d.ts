declare namespace Whizzes {
  interface User {
    id: string;
    email: string;
    name: string;
    firstName: string;
    surname: string;
    follows: User[];
    followerCount: number;
    posts: Post[];
  }

  interface Post {
    id: string;
    content: string;
    author: User;
    createdAt: Date;
    updatedAt: Date;
  }
}
