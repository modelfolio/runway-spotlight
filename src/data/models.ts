import model1 from "@/assets/model-1.jpg";
import model2 from "@/assets/model-2.jpg";
import model3 from "@/assets/model-3.jpg";
import model4 from "@/assets/model-4.jpg";
import model5 from "@/assets/model-5.jpg";
import model6 from "@/assets/model-6.jpg";

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
    shoeSize: "8",
    eyeColor: "Green",
    hairColor: "Blonde",
    location: "New York",
    bio: "Aria brings a raw, captivating energy to every shoot. With over 5 years in high fashion, she's graced the covers of Vogue Italia and Harper's Bazaar.",
    portfolio: [model1],
    experience: ["Vogue Italia", "Harper's Bazaar", "Milan Fashion Week", "Gucci SS24"],
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
    shoeSize: "11",
    eyeColor: "Brown",
    hairColor: "Dark Brown",
    location: "Milan",
    bio: "Marco's versatility makes him a favorite for both runway and commercial work. His strong features and natural charisma captivate every audience.",
    portfolio: [model2],
    experience: ["Armani", "Zara Campaign", "GQ Magazine", "Paris Fashion Week"],
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
    shoeSize: "9",
    eyeColor: "Hazel",
    hairColor: "Auburn",
    location: "Paris",
    bio: "Elena embodies modern elegance. A runway specialist with a presence that commands attention from the first step to the last.",
    portfolio: [model3],
    experience: ["Chanel Couture", "Dior SS24", "Elle Magazine", "London Fashion Week"],
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
    shoeSize: "7.5",
    eyeColor: "Brown",
    hairColor: "Black",
    location: "London",
    bio: "Sofia's editorial work pushes boundaries. Known for her avant-garde posing and ability to transform for any creative vision.",
    portfolio: [model4],
    experience: ["Valentino", "W Magazine", "Prada Campaign", "New York Fashion Week"],
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
    shoeSize: "12",
    eyeColor: "Blue",
    hairColor: "Dark Brown",
    location: "Los Angeles",
    bio: "Liam's commanding presence on the runway is unmatched. His chiseled features and confident stride make him a top choice for luxury brands.",
    portfolio: [model5],
    experience: ["Tom Ford", "Balenciaga", "Vogue Homme", "Milan Fashion Week"],
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
    shoeSize: "8",
    eyeColor: "Green",
    hairColor: "Brown",
    location: "Sydney",
    bio: "Isabella brings warmth and relatability to commercial campaigns while maintaining the poise of a high-fashion model.",
    portfolio: [model6],
    experience: ["L'Oréal", "H&M Campaign", "Cosmopolitan", "Australian Fashion Week"],
    available: true,
  },
];

export const categories = ["All", "Editorial", "Commercial", "Runway"];
