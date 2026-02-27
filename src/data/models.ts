import janel1 from "@/assets/janel_periera/janel_1.jpeg";
import janel2 from "@/assets/janel_periera/janel_2.jpeg";
import riya1 from "@/assets/riya_balliyan/riya1.jpeg";
import riya2 from "@/assets/riya_balliyan/riya2.jpeg";
import riya3 from "@/assets/riya_balliyan/riya3.jpeg";

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
  {
    id: "2",
    name: "Riya Balliyan",
    slug: "riya-balliyan",
    image: riya1,
    category: "Editorial",
    height: "5'6\"",
    bust: "33\"",
    waist: "26\"",
    hips: "35\"",
    shoeSize: "6",
    eyeColor: "Brown",
    hairColor: "Black",
    location: "Mumbai",
    bio: "Riya brings a bold, contemporary edge to every frame. Her striking features and natural poise make her a standout presence in editorial and commercial work across India's fashion scene.",
    portfolio: [riya1, riya2, riya3],
    experience: ["Fresher"],
    available: true,
  },
];

export const categories = ["All", "Editorial", "Commercial", "Runway"];
