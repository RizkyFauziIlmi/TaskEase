export const truncateString = (input: string, maxLength: number): string => {
  if (input.length <= maxLength) {
    return input;
  } else {
    return input.substring(0, maxLength) + "...";
  }
};

export const generateAbbreviation = (name: string) => {
  // Memisahkan setiap kata dalam nama
  const words = name.split(" ");

  // Mengambil inisial dari setiap kata, kecuali untuk satu kata
  const abbreviation = words
    .map((word, index) => {
      // Jika kata bukan kata pertama, ambil inisialnya
      if (index !== 0) {
        return word.charAt(0).toLowerCase();
      }

      // Jika kata pertama, gunakan kata utuh tanpa singkatan
      return word.toLowerCase();
    })
    .join("");

  return abbreviation;
};

const censorString = (str: string) => {
  // Mengganti beberapa karakter terakhir dengan ***
  const censoredPart = str.slice(0, -6) + '******';
  return censoredPart;
}

export const censorEmail = (email: string = "") => {
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    const username = email.substring(0, atIndex);
    const censoredUsername = censorString(username);
    const domain = email.substring(atIndex);
    return censoredUsername + domain;
  }
  return email;
}

export const createAvatarFallback = (name: string): string => {
  // Menghilangkan spasi pada awal dan akhir nama
  name = name.trim();

  // Memisahkan kata-kata dalam nama
  const words: string[] = name.split(" ");

  // Mengambil tiga huruf pertama dari setiap kata
  const initials: string[] = words.map((word) => word[0].toUpperCase());

  // Mengambil tiga huruf pertama dari nama jika kurang dari tiga kata
  while (initials.length < 3) {
    initials.push(name[initials.length].toUpperCase());
  }

  // Menggabungkan huruf-huruf awal
  const avatarFallback: string = initials.join("");

  return avatarFallback;
}