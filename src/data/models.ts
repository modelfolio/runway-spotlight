import model1 from "@/assets/model-1.jpg";
import model2 from "@/assets/model-2.jpg";
import model3 from "@/assets/model-3.jpg";
import model4 from "@/assets/model-4.jpg";
import model5 from "@/assets/model-5.jpg";
import model6 from "@/assets/model-6.jpg";
import janel1 from "@/assets/janel_periera/janel_1.jpeg";
import janel2 from "@/assets/janel_periera/janel_2.jpeg";

export interface ModelProfile {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  height: string;
  bust: string;
  waist: string;
  hips: string;
  shoeSize: string;
  eyeColor: string;
  hairColor: string;
  location: string;
  bio: string;
  portfolio: string[];
  experience: string[];
  available: boolean;
}

export const models: ModelProfile[] = [
  {
    id: "1",
    name: "Aria Valentino",
    slug: "aria-valentino",
    image: model1,
    category: "Editorial",
    height: "5'10\"",
    bust: "32\"",
    waist: "24\"",
    hips: "34\"",
    shoeSize: "7",
    eyeColor: "Green",
    hairColor: "Blonde",
    location: "Mumbai",
    bio: "Aria brings an ethereal, captivating quality to every frame. With over 5 years in India's fashion industry, she has fronted campaigns for Myntra and Sanarée, and made a celebrated appearance on MTV Splitsvilla Season 14.",
    portfolio: [model1],
    experience: ["Myntra Editorial SS24", "Sanarée Campaign", "Lakme Fashion Week", "MTV Splitsvilla S14"],
    available: true,
  },
  {
    id: "2",
    name: "Marco De Luca",
    slug: "marco-de-luca",
    image: model2,
    category: "Commercial",
    height: "6'1\"",
    bust: "38\"",
    waist: "31\"",
    hips: "35\"",
    shoeSize: "10",
    eyeColor: "Brown",
    hairColor: "Dark Brown",
    location: "Delhi",
    bio: "Marco's commercial versatility makes him the first call for India's leading brands. A standout presence on Bigg Boss Season 17 amplified his national reach, complementing a strong portfolio with Mango India and FDCI.",
    portfolio: [model2],
    experience: ["Mango India", "Bigg Boss Season 17", "Myntra Campaign", "FDCI India Fashion Week"],
    available: true,
  },
  {
    id: "3",
    name: "Elena Rossi",
    slug: "elena-rossi",
    image: model3,
    category: "Runway",
    height: "5'11\"",
    bust: "33\"",
    waist: "24\"",
    hips: "35\"",
    shoeSize: "8",
    eyeColor: "Hazel",
    hairColor: "Auburn",
    location: "Mumbai",
    bio: "Elena commands every runway she walks. A consistent presence at India Couture Week and Lakme Fashion Week, her editorial work for Sanarée has defined a new standard for modern Indian luxury.",
    portfolio: [model3],
    experience: ["Sanarée Editorial", "FabIndia Festive", "India Couture Week", "Bombay Times Fashion Week"],
    available: false,
  },
  {
    id: "4",
    name: "Sofia Laurent",
    slug: "sofia-laurent",
    image: model4,
    category: "Editorial",
    height: "5'9\"",
    bust: "33\"",
    waist: "25\"",
    hips: "35\"",
    shoeSize: "7",
    eyeColor: "Brown",
    hairColor: "Black",
    location: "Bangalore",
    bio: "Sofia's editorial depth and commercial instinct are equally matched. She has headlined Myntra's flagship festive campaigns, walked for top Indian designers, and brought life to AND's contemporary vision.",
    portfolio: [model4],
    experience: ["Myntra Festive Edit", "W for Woman", "AND Campaign", "Lakme Fashion Week"],
    available: true,
  },
  {
    id: "5",
    name: "Liam Carter",
    slug: "liam-carter",
    image: model5,
    category: "Runway",
    height: "6'2\"",
    bust: "40\"",
    waist: "32\"",
    hips: "36\"",
    shoeSize: "11",
    eyeColor: "Blue",
    hairColor: "Dark Brown",
    location: "Pune",
    bio: "Liam's commanding runway presence earned him prime placements at FDCI and a high-profile Bigg Boss Finale wardrobe collaboration. His work with Vero Moda India showcases his effortless versatility.",
    portfolio: [model5],
    experience: ["Bigg Boss Finale Wardrobe", "Vero Moda India", "Myntra Men", "FDCI India Fashion Week"],
    available: true,
  },
  {
    id: "6",
    name: "Isabella Moore",
    slug: "isabella-moore",
    image: model6,
    category: "Commercial",
    height: "5'8\"",
    bust: "34\"",
    waist: "25\"",
    hips: "36\"",
    shoeSize: "7.5",
    eyeColor: "Green",
    hairColor: "Brown",
    location: "Hyderabad",
    bio: "Isabella's warmth and relatability make her a brand's dream for commercial campaigns. Her work with Sanarée and Mango India speaks to her range, while her MTV Splitsvilla Season 13 stint made her a recognisable face nationwide.",
    portfolio: [model6],
    experience: ["Sanarée SS24", "Mango India", "MTV Splitsvilla S13", "Anouk Campaign"],
    available: true,
  },
  {
    id: "7",
    name: "Janel Periera",
    slug: "janel-periera",
    image: janel1,
    category: "Commercial",
    height: "5'2\"",
    bust: "32\"",
    waist: "28\"",
    hips: "31\"",
    shoeSize: "5",
    eyeColor: "Black",
    hairColor: "Dark Brown",
    location: "Mumbai",
    bio: "Janel brings an effortless, magnetic energy to every shoot. Her expressive eyes and natural versatility make her equally at home in commercial campaigns and editorial features, earning her a growing presence across India's fashion and lifestyle landscape.",
    portfolio: [janel1, janel2],
    experience: ["Fresher"],
    available: true,
  },
];

export const categories = ["All", "Editorial", "Commercial", "Runway"];
