export interface MySummary {
  id: number;
  backdrop_image: string;
  profile_image: string;
  nickname: string;
  name: string;
  phone_number: string;
  email: string;
  social_link: string;
  description: string;
  platforms: {
    created: string;
    platform: string;
  };
}
