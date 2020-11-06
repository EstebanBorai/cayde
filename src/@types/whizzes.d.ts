declare namespace Whizzes {
  interface Entity {
    createdAt: Date;
    updatedAt: Date;
  }

  namespace Users {
    interface User extends Entity {
      id: string;
      email: string;
      name: string;
      firstName: string;
      surname: string;
      follows: User[];
      followerCount: number;
      posts: Whizzes.Posts.Post[];
    }
  }

  namespace Posts {
    interface Post extends Entity {
      id: string;
      content: string;
      author: Whizzes.Users.User;
    }
  }

  namespace Auth {
    interface Secret extends Entity {
      id: string;
      hash: string;
      user: Whizzes.Users.User;
    }

    interface SignUpPayload {
      email: string;
      name: string;
      firstName: string;
      surname: string;
      password: string;
    }
  }
}
