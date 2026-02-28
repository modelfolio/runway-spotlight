import janel1 from "@/assets/janel_periera/janel_1.jpeg";
import janel2 from "@/assets/janel_periera/janel_2.jpeg";
import riya1 from "@/assets/riya_balliyan/riya1.jpeg";
import riya2 from "@/assets/riya_balliyan/riya2.jpeg";
import riya3 from "@/assets/riya_balliyan/riya3.jpeg";
import nihanya1 from "@/assets/nihanya/one.jpeg";
import nihanya2 from "@/assets/nihanya/two.jpeg";
import nihanya3 from "@/assets/nihanya/three.jpeg";
import bhumi1 from "@/assets/bhumi/one.jpeg";
import bhumi2 from "@/assets/bhumi/two.jpeg";
import bhumi3 from "@/assets/bhumi/three.jpeg";
import roshni1 from "@/assets/roshni/one.jpeg";
import roshni2 from "@/assets/roshni/two.jpeg";
import roshni3 from "@/assets/roshni/three.jpeg";

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
    location: "Delhi",
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
    location: "Delhi",
    bio: "Riya brings a bold, contemporary edge to every frame. Her striking features and natural poise make her a standout presence in editorial and commercial work across India's fashion scene.",
    portfolio: [riya1, riya2, riya3],
    experience: ["Fresher"],
    available: true,
  },
  {
    id: "3",
    name: "Nihanya",
    slug: "nihanya",
    image: nihanya1,
    category: "Editorial",
    height: "5'5\"",
    bust: "33\"",
    waist: "27\"",
    hips: "34\"",
    shoeSize: "6",
    eyeColor: "Brown",
    hairColor: "Black",
    location: "Kolkata",
    bio: "Nihanya commands attention with her striking presence and effortless poise. Her versatility across editorial and commercial work, paired with an innate ability to connect with the camera, makes her a compelling force in India's modeling landscape.",
    portfolio: [nihanya1, nihanya2, nihanya3],
    experience: ["Fresher"],
    available: true,
  },
  {
    id: "4",
    name: "Bhumi",
    slug: "bhumi",
    image: bhumi1,
    category: "Commercial",
    height: "5'4\"",
    bust: "36\"",
    waist: "30\"",
    hips: "35\"",
    shoeSize: "7",
    eyeColor: "Dark Brown",
    hairColor: "Dark Brown",
    location: "Kolkata",
    bio: "Bhumi carries a warm, grounded energy that translates beautifully on camera. Her natural expressiveness and confident presence make her a versatile talent across commercial and lifestyle campaigns.",
    portfolio: [bhumi1, bhumi2, bhumi3],
    experience: ["No Experience"],
    available: true,
  },
  {
    id: "5",
    name: "Roshni",
    slug: "roshni",
    image: roshni1,
    category: "Commercial",
    height: "5'4\"",
    bust: "32\"",
    waist: "28\"",
    hips: "35\"",
    shoeSize: "9",
    eyeColor: "Dark Brown",
    hairColor: "Black",
    location: "Kolkata",
    bio: "Roshni brings a radiant and composed energy to every frame. Her natural elegance and expressive depth make her a compelling presence across commercial and editorial work.",
    portfolio: [roshni1, roshni2, roshni3],
    experience: ["Fresher"],
    available: true,
  },
];

export const categories = ["All", "Editorial", "Commercial", "Runway"];
