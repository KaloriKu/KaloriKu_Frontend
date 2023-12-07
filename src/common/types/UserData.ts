export interface UserData {
  id: number;
  user: User;
  nama: string;
  umur: number;
  gender: Gender;
  berat_badan: number;
  tinggi_badan: number;
  role: Role;
  tingkat_aktivitas: ActivityLevel;
}

interface User {
  id: number
  username: string;
  email: string;
}

enum Role {
  REGISTERED_USER = 'Registered_user',
  ADMIN = "Admin"
}

enum Gender {
  LAKI_LAKI = 'Laki-laki',
  PEREMPUAN = 'Perempuan'
}

enum ActivityLevel {
  LEVEL_1 = 'Level_1',
  LEVEL_2 = 'Level_2',
  LEVEL_3 = 'Level_3',
  LEVEL_4 = 'Level_4',
  LEVEL_5 = 'Level_5'
}