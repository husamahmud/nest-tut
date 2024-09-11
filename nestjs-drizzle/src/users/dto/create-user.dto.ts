export class CreateUserDto {
  email: string;
  password: string;
  username: string;
  display_name: string;
  role: string;
  gender: string;
  interests: string[];
  accessability: string;
  country: string;
  language: string[];
}
