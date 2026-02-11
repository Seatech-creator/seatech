// ==========================================
// 1. INTERFACES
// ==========================================
export interface ProductSpecification {
  name: string;
  value: string;
  category: string;
}

export interface ProductImage {
  main: string;
  thumbnail: string;
}

export interface SellerInfo {
  name: string;
  verified: boolean;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  availability: number;
  minQty: number;
  images: ProductImage[];
  specifications: ProductSpecification[];
  discount: number;
  seller: SellerInfo;
  countryOfOrigin: string;
}

// ==========================================
// 2. PRODUCT DATA
// ==========================================
export const products: Product[] = [
  // --- Category: Auditorium Chair (V2) ---
  {
    id: "5116877-34097804961",
    name: "Auditorium Chair Auto Seat Tip Up without Push Back",
    brand: "Seatech OEM",
    model: "SEATECH AUDI03",
    category: "Auditorium Chair (V2)",
    price: 4100,
    availability: 3000,
    minQty: 100,
    discount: 68,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.5 },
    images: [
      { main: "/categories/Auditorium Chair (V2)-1/Auditorium Chair (V2)-B.jpg", thumbnail: "/categories/Auditorium Chair (V2)-1/Auditorium Chair (V2)-S.jpg" },
      { main: "/categories/Auditorium Chair (V2)-1/Auditorium Chair (V2)-B copy.jpg", thumbnail: "/categories/Auditorium Chair (V2)-1/Auditorium Chair (V2)-S copy.jpg" },
      { main: "/categories/Auditorium Chair (V2)-1/Auditorium Chair (V2)-B copy 2.jpg", thumbnail: "/categories/Auditorium Chair (V2)-1/Auditorium Chair (V2)-S copy 2.jpg" }
    ],
    specifications: [{ category: "Seat Mechanism", name: "Type", value: "Auto Seat Tip Up" }, { category: "Seat Mechanism", name: "Push Back", value: "No" }, { category: "Material", name: "Seat Upholstery", value: "Fabric with PU Foam" }]
  },
  {
    id: "5116877-68500433874",
    name: "Auditorium Chair Auto Seat Tip Up with Sliding Seat & Push Back",
    brand: "Seatech OEM",
    model: "SEATECH AUDI01",
    category: "Auditorium Chair (V2)",
    price: 4500,
    availability: 5000,
    minQty: 100,
    discount: 67,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.5 },
    images: [
      { main: "/categories/Auditorium Chair (V2)-2/Auditorium Chair (V2)-B.jpg", thumbnail: "/categories/Auditorium Chair (V2)-2/Auditorium Chair (V2)-S.jpg" },
      { main: "/categories/Auditorium Chair (V2)-2/Auditorium Chair (V2)-B copy.jpg", thumbnail: "/categories/Auditorium Chair (V2)-2/Auditorium Chair (V2)-S copy.jpg" },
      { main: "/categories/Auditorium Chair (V2)-2/Auditorium Chair (V2)-B copy 2.jpg", thumbnail: "/categories/Auditorium Chair (V2)-2/Auditorium Chair (V2)-S copy 2.jpg" }
    ],
    specifications: [{ category: "Seat Mechanism", name: "Type", value: "Auto Seat Tip Up" }, { category: "Seat Mechanism", name: "Feature", value: "Sliding Seat with Push Back" }]
  },
  {
    id: "5116877-98703837844",
    name: "Auditorium Chair Auto Seat Tip Up with Writing Pad",
    brand: "Seatech OEM",
    model: "SEATECH AUDI02",
    category: "Auditorium Chair (V2)",
    price: 6500,
    availability: 2000,
    minQty: 100,
    discount: 58,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.5 },
    images: [
      { main: "/categories/Auditorium Chair (V2)-3/Auditorium Chair (V2)-B.jpg", thumbnail: "/categories/Auditorium Chair (V2)-3/Auditorium Chair (V2)-S.jpg" },
      { main: "/categories/Auditorium Chair (V2)-3/Auditorium Chair (V2)-B copy.jpg", thumbnail: "/categories/Auditorium Chair (V2)-3/Auditorium Chair (V2)-S copy.jpg" },
      { main: "/categories/Auditorium Chair (V2)-3/Auditorium Chair (V2)-B copy 2.jpg", thumbnail: "/categories/Auditorium Chair (V2)-3/Auditorium Chair (V2)-S copy 2.jpg" }
    ],
    specifications: [{ category: "Seat Mechanism", name: "Type", value: "Auto Seat Tip Up" }, { category: "Components", name: "Writing Pad", value: "Foldable (Right Side)" }]
  },
  {
    id: "5116877-14202137000",
    name: "Auditorium Chair Sliding Seat with Fabric Back Cover",
    brand: "Seatech OEM",
    model: "SEATECH AUDI08",
    category: "Auditorium Chair (V2)",
    price: 9100,
    availability: 2500,
    minQty: 40,
    discount: 39,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Auditorium Chair (V2)-4/Auditorium Chair (V2)-B.jpg", thumbnail: "/categories/Auditorium Chair (V2)-4/Auditorium Chair (V2)-S.jpg" },
      { main: "/categories/Auditorium Chair (V2)-4/Auditorium Chair (V2)-B copy.jpg", thumbnail: "/categories/Auditorium Chair (V2)-4/Auditorium Chair (V2)-S copy.jpg" },
      { main: "/categories/Auditorium Chair (V2)-4/Auditorium Chair (V2)-B copy 2.jpg", thumbnail: "/categories/Auditorium Chair (V2)-4/Auditorium Chair (V2)-S copy 2.jpg" }
    ],
    specifications: [{ category: "Seat Mechanism", name: "Type", value: "Auto Seat Tip Up" }, { category: "Construction", name: "Back Cover", value: "Fabric Upholstered" }]
  },
  {
    id: "5116877-42201428071",
    name: "Auditorium Chair Auto Seat Tip Up with Plastic Back Cover",
    brand: "Seatech OEM",
    model: "AUDI 11",
    category: "Auditorium Chair (V2)",
    price: 19500,
    availability: 1000,
    minQty: 40,
    discount: 24,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Auditorium Chair (V2)-5/Auditorium Chair (V2)-B.jpg", thumbnail: "/categories/Auditorium Chair (V2)-5/Auditorium Chair (V2)-S.jpg" },
      { main: "/categories/Auditorium Chair (V2)-5/Auditorium Chair (V2)-B copy.jpg", thumbnail: "/categories/Auditorium Chair (V2)-5/Auditorium Chair (V2)-S copy.jpg" },
      { main: "/categories/Auditorium Chair (V2)-5/Auditorium Chair (V2)-B copy 2.jpg", thumbnail: "/categories/Auditorium Chair (V2)-5/Auditorium Chair (V2)-S copy 2.jpg" }
    ],
    specifications: [{ category: "Seat Mechanism", name: "Type", value: "Auto Seat Tip Up" }, { category: "Construction", name: "Back Cover", value: "Plastic Moulded" }]
  },
  
  // --- Category: Bunk Beds ---
  {
    id: "5116877-3948376833",
    name: "Tier bunk beds (Fixed) for Adult",
    brand: "Seatech OEM",
    model: "SEATECH BBD02",
    category: "Bunk Beds as per IS 17636",
    price: 7500,
    availability: 1200,
    minQty: 30,
    discount: 35,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.5 },
    images: [
      { main: "/categories/Bunk Beds as per IS 17636/Bunk Beds as per IS 17636-B.jpg", thumbnail: "/categories/Bunk Beds as per IS 17636/Bunk Beds as per IS 17636-S.jpg" },
      { main: "/categories/Bunk Beds as per IS 17636/Bunk Beds as per IS 17636-B copy.jpg", thumbnail: "/categories/Bunk Beds as per IS 17636/Bunk Beds as per IS 17636-S copy.jpg" },
      { main: "/categories/Bunk Beds as per IS 17636/Bunk Beds as per IS 17636-B copy 2.jpg", thumbnail: "/categories/Bunk Beds as per IS 17636/Bunk Beds as per IS 17636-S copy 2.jpg" }
    ],
    specifications: [{ category: "General", name: "Type", value: "Double Tier (Fixed)" }, { category: "Material", name: "Construction", value: "Metal" }]
  },

  // --- Category: Chair for General Purpose ---
  {
    id: "5116877-5238369627",
    name: "Low-back Chair With Without Armrest",
    brand: "Seatech OEM",
    model: "SEATECHCWV06",
    category: "Chair for General Purpose",
    price: 1900,
    availability: 5000,
    minQty: 200,
    discount: 75,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-1/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-1/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-1/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-1/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-1/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-1/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Low-back" }, { category: "Features", name: "Armrest", value: "Without Armrest" }]
  },
  {
    id: "5116877-198263522",
    name: "Mid-back Chair With Fixed armrest with Padding",
    brand: "Seatech OEM",
    model: "SEATECH CWV05",
    category: "Chair for General Purpose",
    price: 1950,
    availability: 1000,
    minQty: 40,
    discount: 74,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-2/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-2/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-2/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-2/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-2/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-2/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Mid-back" }, { category: "Features", name: "Armrest", value: "Fixed armrest with Padding" }]
  },
  {
    id: "5116877-35771148436",
    name: "Mid-back Chair With Without Armrest",
    brand: "Seatech OEM",
    model: "SEATECH CWV04",
    category: "Chair for General Purpose",
    price: 3500,
    availability: 1000,
    minQty: 12,
    discount: 46,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-3/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-3/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-3/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-3/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-3/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-3/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Mid-back" }, { category: "Features", name: "Armrest", value: "Without Armrest" }]
  },
  {
    id: "5116877-61038404328",
    name: "Low-back Chair With Fixed armrest with Padding",
    brand: "Seatech OEM",
    model: "SEATECH CWV01",
    category: "Chair for General Purpose",
    price: 3500,
    availability: 1000,
    minQty: 10,
    discount: 63,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-4/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-4/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-4/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-4/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-4/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-4/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Low-back" }, { category: "Features", name: "Armrest", value: "Fixed armrest with Padding" }]
  },
  {
    id: "5116877-20313114705",
    name: "Low-back Chair With Without Armrest",
    brand: "Seatech OEM",
    model: "SEATECH LWV01",
    category: "Chair for General Purpose",
    price: 4100,
    availability: 1000,
    minQty: 21,
    discount: 57,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-5/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-5/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-5/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-5/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-5/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-5/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Low-back" }, { category: "Features", name: "Armrest", value: "Without Armrest" }]
  },
  {
    id: "5116877-69216713632",
    name: "Low-back Chair With Fixed armrest with Cushion",
    brand: "Seatech OEM",
    model: "Seatech CWV10",
    category: "Chair for General Purpose",
    price: 4500,
    availability: 5000,
    minQty: 20,
    discount: 53,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-6/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-6/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-6/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-6/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-6/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-6/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Low-back" }, { category: "Features", name: "Armrest", value: "Fixed armrest with Cushion" }]
  },
  {
    id: "5116877-10867581211",
    name: "Mid-back Chair With Fixed armrest without cushion",
    brand: "Seatech OEM",
    model: "SEATECH CWV02",
    category: "Chair for General Purpose",
    price: 4900,
    availability: 1000,
    minQty: 12,
    discount: 53,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-7/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-7/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-7/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-7/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-7/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-7/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Mid-back" }, { category: "Features", name: "Armrest", value: "Fixed armrest without cushion" }, { category: "Features", name: "Lumbar Support", value: "Yes" }]
  },
  {
    id: "5116877-4226670578",
    name: "Low-back Chair With Fixed armrest with Padding",
    brand: "Seatech OEM",
    model: "SEATECH CWV03",
    category: "Chair for General Purpose",
    price: 6500,
    availability: 1000,
    minQty: 12,
    discount: 38,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-8/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-8/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-8/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-8/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-8/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-8/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Low-back" }, { category: "Features", name: "Armrest", value: "Fixed armrest with Padding" }]
  },
  {
    id: "5116877-19625345869",
    name: "Mid-back Chair With Fixed armrest without cushion",
    brand: "Seatech OEM",
    model: "CGP301A",
    category: "Chair for General Purpose",
    price: 7500,
    availability: 500,
    minQty: 10,
    discount: 57,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-9/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-9/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-9/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-9/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-9/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-9/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Mid-back" }, { category: "Features", name: "Armrest", value: "Fixed armrest without cushion" }]
  },
  {
    id: "5116877-71226237740",
    name: "Mid-back Chair With Fixed armrest without cushion",
    brand: "Seatech OEM",
    model: "CWV MB301",
    category: "Chair for General Purpose",
    price: 8500,
    availability: 500,
    minQty: 10,
    discount: 51,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-10/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-10/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-10/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-10/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-10/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-10/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Mid-back" }, { category: "Features", name: "Armrest", value: "Fixed armrest without cushion" }]
  },
  {
    id: "5116877-9668864051",
    name: "Low-back Chair With Fixed armrest with Cushion",
    brand: "Seatech OEM",
    model: "SEATECH CWTLBR07",
    category: "Chair for General Purpose",
    price: 9100,
    availability: 500,
    minQty: 10,
    discount: 41,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-11/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-11/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-11/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-11/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-11/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-11/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Low-back" }, { category: "Features", name: "Armrest", value: "Fixed armrest with Cushion" }, { category: "Features", name: "Lumbar Support", value: "Yes" }]
  },
  {
    id: "5116877-96367899695",
    name: "Mid-back Chair With Fixed armrest with Cushion",
    brand: "Seatech OEM",
    model: "Seatech CWV07",
    category: "Chair for General Purpose",
    price: 10000,
    availability: 500,
    minQty: 10,
    discount: 43,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-12/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-12/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-12/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-12/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-12/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-12/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Mid-back" }, { category: "Features", name: "Armrest", value: "Fixed armrest with Cushion" }, { category: "Features", name: "Lumbar Support", value: "Yes" }]
  },
  {
    id: "5116877-29477886754",
    name: "Mid-back Chair With Without Armrest",
    brand: "Seatech OEM",
    model: "CWV MB11",
    category: "Chair for General Purpose",
    price: 9990,
    availability: 1000,
    minQty: 40,
    discount: 43,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-13/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-13/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-13/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-13/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-13/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-13/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Mid-back" }, { category: "Features", name: "Armrest", value: "Without Armrest" }, { category: "Features", name: "Lumbar Support", value: "Yes" }]
  },
  {
    id: "5116877-53488041209",
    name: "Mid-back Chair With Fixed armrest with Cushion",
    brand: "Seatech OEM",
    model: "CWV MB12",
    category: "Chair for General Purpose",
    price: 9995,
    availability: 1500,
    minQty: 40,
    discount: 43,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Chair for General Purpose-14/Chair for General Purpose-B.jpg", thumbnail: "/categories/Chair for General Purpose-14/Chair for General Purpose-S.jpg" },
      { main: "/categories/Chair for General Purpose-14/Chair for General Purpose-B copy.jpg", thumbnail: "/categories/Chair for General Purpose-14/Chair for General Purpose-S copy.jpg" },
      { main: "/categories/Chair for General Purpose-14/Chair for General Purpose-B copy 2.jpg", thumbnail: "/categories/Chair for General Purpose-14/Chair for General Purpose-S copy 2.jpg" }
    ],
    specifications: [{ category: "Dimensions", name: "Backrest Height", value: "Mid-back" }, { category: "Features", name: "Armrest", value: "Fixed armrest with Cushion" }, { category: "Features", name: "Lumbar Support", value: "Yes" }]
  },

  // --- Category: Classroom Stools ---
  {
    id: "5116877-81663803194",
    name: "Primer coated and Painted Square Classroom Stools (100 Kg)",
    brand: "Seatech OEM",
    model: "SEATECH CLS02",
    category: "Classroom Stools",
    price: 950,
    availability: 2000,
    minQty: 50,
    discount: 62,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Classroom Stools-1/Classroom Stools-B.jpg", thumbnail: "/categories/Classroom Stools-1/Classroom Stools-S.jpg" },
      { main: "/categories/Classroom Stools-1/Classroom Stools-B copy.jpg", thumbnail: "/categories/Classroom Stools-1/Classroom Stools-S copy.jpg" },
      { main: "/categories/Classroom Stools-1/Classroom Stools-B copy 2.jpg", thumbnail: "/categories/Classroom Stools-1/Classroom Stools-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Dimensions", name: "Size (LxBxH)", value: "350mm x 350mm x 500mm" },
      { category: "Material", name: "Top Material", value: "Ply wood (13mm)" },
      { category: "Material", name: "Frame Material", value: "MS pipe heavy duty" },
      { category: "Performance", name: "Load Capacity", value: "100 Kg" },
      { category: "Finish", name: "Paint", value: "Primer coated and Painted" }
    ]
  },
  {
    id: "5116877-94001835796",
    name: "Powder coated Square Classroom Stools (100 Kg)",
    brand: "Seatech OEM",
    model: "SEATECH CLS03",
    category: "Classroom Stools",
    price: 1500,
    availability: 100,
    minQty: 50,
    discount: 67,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Classroom Stools-2/Classroom Stools-B.jpg", thumbnail: "/categories/Classroom Stools-2/Classroom Stools-S.jpg" },
      { main: "/categories/Classroom Stools-2/Classroom Stools-B copy.jpg", thumbnail: "/categories/Classroom Stools-2/Classroom Stools-S copy.jpg" },
      { main: "/categories/Classroom Stools-2/Classroom Stools-B copy 2.jpg", thumbnail: "/categories/Classroom Stools-2/Classroom Stools-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Dimensions", name: "Size (LxBxH)", value: "400mm x 400mm x 550mm" },
      { category: "Material", name: "Top Material", value: "MDF Board (SBG II)" },
      { category: "Material", name: "Frame Material", value: "MS pipe heavy duty" },
      { category: "Performance", name: "Load Capacity", value: "100 Kg" },
      { category: "Finish", name: "Paint", value: "Powder coated" }
    ]
  },
  {
    id: "5116877-17349111611",
    name: "Primer coated and Painted Square Classroom Stools (75 Kg)",
    brand: "Seatech OEM",
    model: "SEATECH CLS01",
    category: "Classroom Stools",
    price: 2500,
    availability: 1000,
    minQty: 25,
    discount: 29,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Classroom Stools-3/Classroom Stools-B.jpg", thumbnail: "/categories/Classroom Stools-3/Classroom Stools-S.jpg" },
      { main: "/categories/Classroom Stools-3/Classroom Stools-B copy.jpg", thumbnail: "/categories/Classroom Stools-3/Classroom Stools-S copy.jpg" },
      { main: "/categories/Classroom Stools-3/Classroom Stools-B copy 2.jpg", thumbnail: "/categories/Classroom Stools-3/Classroom Stools-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Dimensions", name: "Size (LxBxH)", value: "400mm x 400mm x 600mm" },
      { category: "Material", name: "Top Material", value: "Block Board (BWP grade)" },
      { category: "Material", name: "Frame Material", value: "Wood" },
      { category: "Performance", name: "Load Capacity", value: "75 Kg" },
      { category: "Finish", name: "Paint", value: "Primer coated and Painted" }
    ]
  },
  // --- Composite Office Tables confirming to IS 8126 (V2) ---
  {
    id: "5116877-46642373865",
    name: "Composite Office Table with Locker Unit (1200x600mm)",
    brand: "Seatech OEM",
    model: "SEATECH CST07",
    category: "Composite Office Tables confirming to IS 8126 (V2)",
    price: 9500,
    availability: 105,
    minQty: 10,
    discount: 55,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Composite Office Tables confirming to IS 8126 (V2)-1/Composite Office Tables confirming to IS 8126 (V2)-B.jpg", thumbnail: "/categories/Composite Office Tables confirming to IS 8126 (V2)-1/Composite Office Tables confirming to IS 8126 (V2)-S.jpg" },
      { main: "/categories/Composite Office Tables confirming to IS 8126 (V2)-1/Composite Office Tables confirming to IS 8126 (V2)-B copy.jpg", thumbnail: "/categories/Composite Office Tables confirming to IS 8126 (V2)-1/Composite Office Tables confirming to IS 8126 (V2)-S copy.jpg" },
      { main: "/categories/Composite Office Tables confirming to IS 8126 (V2)-1/Composite Office Tables confirming to IS 8126 (V2)-B copy 2.jpg", thumbnail: "/categories/Composite Office Tables confirming to IS 8126 (V2)-1/Composite Office Tables confirming to IS 8126 (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "General", name: "Storage Type", value: "Locker unit" },
      { category: "Dimensions", name: "Size (LxWxT)", value: "1200mm x 600mm x 20mm" },
      { category: "Material", name: "Table Top", value: "Particle Boards" },
      { category: "Construction", name: "Pedestal", value: "Mild Steel Tubular" },
      { category: "Finish", name: "Color", value: "Brown" },
      { category: "Warranty", name: "Period", value: "3 Years" }
    ]
  },
  {
    id: "5116877-36072246766",
    name: "Composite Office Table with Drawer & Filing Unit (1200x600mm)",
    brand: "Seatech OEM",
    model: "SEATECH",
    category: "Composite Office Tables confirming to IS 8126 (V2)",
    price: 17000,
    availability: 1000,
    minQty: 19,
    discount: 11,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Composite Office Tables confirming to IS 8126 (V2)-2/Composite Office Tables confirming to IS 8126 (V2)-B.jpg", thumbnail: "/categories/Composite Office Tables confirming to IS 8126 (V2)-2/Composite Office Tables confirming to IS 8126 (V2)-S.jpg" },
      { main: "/categories/Composite Office Tables confirming to IS 8126 (V2)-2/Composite Office Tables confirming to IS 8126 (V2)-B copy.jpg", thumbnail: "/categories/Composite Office Tables confirming to IS 8126 (V2)-2/Composite Office Tables confirming to IS 8126 (V2)-S copy.jpg" },
      { main: "/categories/Composite Office Tables confirming to IS 8126 (V2)-2/Composite Office Tables confirming to IS 8126 (V2)-B copy 2.jpg", thumbnail: "/categories/Composite Office Tables confirming to IS 8126 (V2)-2/Composite Office Tables confirming to IS 8126 (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "General", name: "Storage Type", value: "Drawer and filing unit" },
      { category: "Dimensions", name: "Size (LxWxT)", value: "1200mm x 600mm x 20mm" },
      { category: "Material", name: "Table Top", value: "Particle Boards" },
      { category: "Construction", name: "Pedestal", value: "Mild Steel Tubular" },
      { category: "Finish", name: "Color", value: "Black" },
      { category: "Warranty", name: "Period", value: "2 Years" }
    ]
  },
  {
    id: "5116877-36318751233",
    name: "Composite Office Table with Three-Drawer Unit (1200x600mm)",
    brand: "Seatech OEM",
    model: "SEATECH CST03",
    category: "Composite Office Tables confirming to IS 8126 (V2)",
    price: 21000,
    availability: 100,
    minQty: 10,
    discount: 28,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Composite Office Tables confirming to IS 8126 (V2)-3/Composite Office Tables confirming to IS 8126 (V2)-B.jpg", thumbnail: "/categories/Composite Office Tables confirming to IS 8126 (V2)-3/Composite Office Tables confirming to IS 8126 (V2)-S.jpg" },
      { main: "/categories/Composite Office Tables confirming to IS 8126 (V2)-3/Composite Office Tables confirming to IS 8126 (V2)-B copy.jpg", thumbnail: "/categories/Composite Office Tables confirming to IS 8126 (V2)-3/Composite Office Tables confirming to IS 8126 (V2)-S copy.jpg" },
      { main: "/categories/Composite Office Tables confirming to IS 8126 (V2)-3/Composite Office Tables confirming to IS 8126 (V2)-B copy 2.jpg", thumbnail: "/categories/Composite Office Tables confirming to IS 8126 (V2)-3/Composite Office Tables confirming to IS 8126 (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "General", name: "Storage Type", value: "Three-drawer unit" },
      { category: "Dimensions", name: "Size (LxWxT)", value: "1200mm x 600mm x 20mm" },
      { category: "Material", name: "Table Top", value: "Particle Boards" },
      { category: "Construction", name: "Pedestal", value: "Mild Steel Tubular" },
      { category: "Finish", name: "Color", value: "Brown" },
      { category: "Warranty", name: "Period", value: "1 Year" }
    ]
  },
  // --- Computer Table (V2) ---
  {
    id: "5116877-1278088971",
    name: "Modular Table with MR Ply Table Top and Metal Understructure (600x750mm)",
    brand: "Seatech OEM",
    model: "MT SIDH8125",
    category: "Computer Table (V2)",
    price: 4700,
    availability: 5000,
    minQty: 100,
    discount: 51,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-1/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-1/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-1/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-1/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-1/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-1/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "MR Ply (Moisture Resistant)" },
      { category: "Dimensions", name: "Size (WxD)", value: "600mm x 750mm" },
      { category: "Construction", name: "Understructure", value: "Mild Steel (40x40mm)" },
      { category: "Features", name: "Modesty Panel", value: "No" },
      { category: "Features", name: "Storage", value: "No" }
    ]
  },
  {
    id: "5116877-77799422812",
    name: "Modular Table with Marine Ply Top and Wooden Understructure (900x600mm)",
    brand: "Seatech OEM",
    model: "SEATECH MTW01",
    category: "Computer Table (V2)",
    price: 4900,
    availability: 1000,
    minQty: 45,
    discount: 66,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-2/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-2/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-2/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-2/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-2/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-2/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Marine Ply" },
      { category: "Dimensions", name: "Size (WxD)", value: "900mm x 600mm" },
      { category: "Construction", name: "Understructure", value: "Particle Board (Wooden)" },
      { category: "Features", name: "Modesty Panel", value: "No" },
      { category: "Features", name: "Storage", value: "No" }
    ]
  },
  {
    id: "5116877-32323298921",
    name: "Modular Table with Particle Board Top and Metal Understructure (1800x750mm)",
    brand: "Seatech OEM",
    model: "SEATECH MT04",
    category: "Computer Table (V2)",
    price: 12500,
    availability: 791,
    minQty: 11,
    discount: 34,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-3/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-3/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-3/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-3/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-3/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-3/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "1800mm x 750mm" },
      { category: "Construction", name: "Understructure", value: "Mild Steel (40x40mm)" },
      { category: "Features", name: "Modesty Panel", value: "Yes" },
      { category: "Features", name: "Storage", value: "No" }
    ]
  },
  {
    id: "5116877-92767341034",
    name: "Modular Table with Particle Board Top and Metal Understructure (900x600mm)",
    brand: "Seatech OEM",
    model: "MT LK01",
    category: "Computer Table (V2)",
    price: 12500,
    availability: 500,
    minQty: 41,
    discount: 14,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-4/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-4/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-4/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-4/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-4/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-4/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "900mm x 600mm" },
      { category: "Construction", name: "Understructure", value: "Mild Steel (50x50mm)" },
      { category: "Features", name: "Modesty Panel", value: "No" },
      { category: "Features", name: "Storage", value: "No" }
    ]
  },
  {
    id: "5116877-2155067800",
    name: "Modular Table with Particle Board Top and Metal Understructure (900x600mm)",
    brand: "Seatech OEM",
    model: "Seatech MT09",
    category: "Computer Table (V2)",
    price: 14000,
    availability: 5000,
    minQty: 10,
    discount: 26,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-5/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-5/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-5/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-5/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-5/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-5/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "900mm x 600mm" },
      { category: "Construction", name: "Understructure", value: "Mild Steel (40x40mm)" },
      { category: "Features", name: "Modesty Panel", value: "No" },
      { category: "Features", name: "Storage", value: "Yes" }
    ]
  },
  {
    id: "5116877-49315880640",
    name: "Modular Table with Particle Board Top and Metal Understructure (1800x900mm)",
    brand: "Seatech OEM",
    model: "Seatech MT11",
    category: "Computer Table (V2)",
    price: 14200,
    availability: 1000,
    minQty: 40,
    discount: 25,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-6/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-6/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-6/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-6/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-6/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-6/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "1800mm x 900mm" },
      { category: "Construction", name: "Understructure", value: "Mild Steel (50x50mm)" },
      { category: "Features", name: "Modesty Panel", value: "No" },
      { category: "Features", name: "Storage", value: "No" }
    ]
  },
  {
    id: "5116877-74516472909",
    name: "Modular Table with MDF Top and Wooden Understructure (1200x750mm)",
    brand: "Seatech OEM",
    model: "Seatech MT10",
    category: "Computer Table (V2)",
    price: 14500,
    availability: 1000,
    minQty: 40,
    discount: 24,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-7/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-7/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-7/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-7/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-7/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-7/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "MDF Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "1200mm x 750mm" },
      { category: "Construction", name: "Understructure", value: "MDF Board (Wooden)" },
      { category: "Features", name: "Modesty Panel", value: "Yes" },
      { category: "Features", name: "Storage", value: "Yes" }
    ]
  },
  {
    id: "5116877-92566180604",
    name: "Modular Table with Particle Board Top and Metal Understructure (900x600mm)",
    brand: "Seatech OEM",
    model: "SEATECH MT07",
    category: "Computer Table (V2)",
    price: 14500,
    availability: 5000,
    minQty: 40,
    discount: 24,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-8/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-8/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-8/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-8/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-8/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-8/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "900mm x 600mm" },
      { category: "Construction", name: "Understructure", value: "Mild Steel (40x40mm)" },
      { category: "Features", name: "Modesty Panel", value: "No" },
      { category: "Features", name: "Storage", value: "No" }
    ]
  },
  {
    id: "5116877-71436442294",
    name: "Modular Table with Particle Board Top and Metal Understructure (1200x750mm)",
    brand: "Seatech OEM",
    model: "Seatech MT12",
    category: "Computer Table (V2)",
    price: 15000,
    availability: 350,
    minQty: 7,
    discount: 21,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-9/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-9/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-9/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-9/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-9/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-9/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "1200mm x 750mm" },
      { category: "Construction", name: "Understructure", value: "Mild Steel (40x40mm)" },
      { category: "Features", name: "Modesty Panel", value: "No" },
      { category: "Features", name: "Storage", value: "No" }
    ]
  },
  {
    id: "5116877-72462684731",
    name: "Modular Table with MDF Top and Wooden Understructure (1050x600mm)",
    brand: "Seatech OEM",
    model: "SEATECH MT08",
    category: "Computer Table (V2)",
    price: 15500,
    availability: 5000,
    minQty: 40,
    discount: 18,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-10/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-10/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-10/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-10/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-10/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-10/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "MDF Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "1050mm x 600mm" },
      { category: "Construction", name: "Understructure", value: "MDF Board (Wooden)" },
      { category: "Features", name: "Modesty Panel", value: "Yes" },
      { category: "Features", name: "Storage", value: "Yes" }
    ]
  },
  {
    id: "5116877-81482850688",
    name: "Modular Table with Particle Board Top and Metal Understructure (1800x900mm)",
    brand: "Seatech OEM",
    model: "Seatech MT15",
    category: "Computer Table (V2)",
    price: 16665,
    availability: 60,
    minQty: 60,
    discount: 66,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.8 },
    images: [
      { main: "/categories/Computer Table (V2)-11/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-11/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-11/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-11/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-11/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-11/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "1800mm x 900mm" },
      { category: "Construction", name: "Understructure", value: "Mild Steel (40x40mm)" },
      { category: "Features", name: "Modesty Panel", value: "Yes" },
      { category: "Features", name: "Storage", value: "Yes" }
    ]
  },
  {
    id: "5116877-17792425477",
    name: "Modular Table with Particle Board Top and Wooden Understructure (1800x900mm)",
    brand: "Seatech OEM",
    model: "SEATECH MT14A",
    category: "Computer Table (V2)",
    price: 19000,
    availability: 500,
    minQty: 10,
    discount: 51,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-12/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-12/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-12/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-12/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-12/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-12/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "1800mm x 900mm" },
      { category: "Construction", name: "Understructure", value: "Particle Board (Wooden)" },
      { category: "Features", name: "Modesty Panel", value: "Yes" },
      { category: "Features", name: "Storage", value: "Yes" }
    ]
  },
  {
    id: "5116877-99456516683",
    name: "Modular Table with Particle Board Top and Wooden Understructure (600x750mm)",
    brand: "Seatech OEM",
    model: "SEATECH MT03",
    category: "Computer Table (V2)",
    price: 19000,
    availability: 1000,
    minQty: 10,
    discount: 34,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-13/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-13/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-13/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-13/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-13/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-13/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "600mm x 750mm" },
      { category: "Construction", name: "Understructure", value: "Particle Board (Wooden)" },
      { category: "Features", name: "Modesty Panel", value: "Yes" },
      { category: "Features", name: "Storage", value: "Yes" }
    ]
  },
  {
    id: "5116877-27221498491",
    name: "Modular Table with BWP Ply Top and Metal Understructure (1200x600mm)",
    brand: "Seatech OEM",
    model: "Seatech MT19",
    category: "Computer Table (V2)",
    price: 19000,
    availability: 1000,
    minQty: 10,
    discount: 51,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-14/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-14/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-14/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-14/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-14/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-14/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "BWP Ply" },
      { category: "Dimensions", name: "Size (WxD)", value: "1200mm x 600mm" },
      { category: "Construction", name: "Understructure", value: "Mild Steel (40x40mm)" },
      { category: "Features", name: "Modesty Panel", value: "No" },
      { category: "Features", name: "Storage", value: "No" }
    ]
  },
  {
    id: "5116877-2399884314",
    name: "Modular Table with Particle Board Top and Metal Understructure (1200x900mm)",
    brand: "Seatech OEM",
    model: "SEATECH MT01",
    category: "Computer Table (V2)",
    price: 19500,
    availability: 1000,
    minQty: 20,
    discount: 22,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-15/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-15/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-15/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-15/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-15/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-15/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "1200mm x 900mm" },
      { category: "Construction", name: "Understructure", value: "Mild Steel (40x40mm)" },
      { category: "Features", name: "Modesty Panel", value: "No" },
      { category: "Features", name: "Storage", value: "No" }
    ]
  },
  {
    id: "5116877-72323100072",
    name: "Modular Table with BWP Ply Top and Wooden Understructure (1200x750mm)",
    brand: "Seatech OEM",
    model: "Seatech MT17",
    category: "Computer Table (V2)",
    price: 21500,
    availability: 351,
    minQty: 4,
    discount: 56,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-16/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-16/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-16/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-16/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-16/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-16/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "BWP Ply" },
      { category: "Dimensions", name: "Size (WxD)", value: "1200mm x 750mm" },
      { category: "Construction", name: "Understructure", value: "BWP Ply (Wooden)" },
      { category: "Features", name: "Modesty Panel", value: "Yes" },
      { category: "Features", name: "Storage", value: "Yes" }
    ]
  },
  {
    id: "5116877-97694322079",
    name: "Modular Table with Particle Board Top and Wooden Understructure (1800x900mm)",
    brand: "Seatech OEM",
    model: "Seatech MT18",
    category: "Computer Table (V2)",
    price: 24500,
    availability: 51,
    minQty: 3,
    discount: 49,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-17/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-17/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-17/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-17/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-17/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-17/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "1800mm x 900mm" },
      { category: "Construction", name: "Understructure", value: "Particle Board (Wooden)" },
      { category: "Features", name: "Modesty Panel", value: "Yes" },
      { category: "Features", name: "Storage", value: "Yes" }
    ]
  },
  {
    id: "5116877-58195571908",
    name: "Modular Table with Particle Board Top and Wooden Understructure (600x600mm)",
    brand: "Seatech OEM",
    model: "SEATECH MT5",
    category: "Computer Table (V2)",
    price: 25000,
    availability: 500,
    minQty: 10,
    discount: 36,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-18/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-18/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-18/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-18/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-18/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-18/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "600mm x 600mm" },
      { category: "Construction", name: "Understructure", value: "Particle Board (Wooden)" },
      { category: "Features", name: "Height Adjustable", value: "Yes" },
      { category: "Features", name: "Storage", value: "Yes" }
    ]
  },
  {
    id: "5116877-99347438720",
    name: "Modular Table with Particle Board Top and Metal Understructure (1800x1200mm)",
    brand: "Seatech OEM",
    model: "SEATECH MT21",
    category: "Computer Table (V2)",
    price: 26659,
    availability: 500,
    minQty: 20,
    discount: 15,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V2)-19/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-19/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-19/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-19/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-19/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-19/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "1800mm x 1200mm" },
      { category: "Construction", name: "Understructure", value: "Mild Steel (60x30mm)" },
      { category: "Features", name: "Modesty Panel", value: "No" },
      { category: "Features", name: "Storage", value: "No" }
    ]
  },
  {
    id: "5116877-49512639890",
    name: "Modular Table with Particle Board Top and Wooden Understructure (2100x900mm)",
    brand: "Seatech OEM",
    model: "SEATECH MT23",
    category: "Computer Table (V2)",
    price: 33500,
    availability: 100,
    minQty: 10,
    discount: 32,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.8 },
    images: [
      { main: "/categories/Computer Table (V2)-20/Computer Table (V2)-B.jpg", thumbnail: "/categories/Computer Table (V2)-20/Computer Table (V2)-S.jpg" },
      { main: "/categories/Computer Table (V2)-20/Computer Table (V2)-B copy.jpg", thumbnail: "/categories/Computer Table (V2)-20/Computer Table (V2)-S copy.jpg" },
      { main: "/categories/Computer Table (V2)-20/Computer Table (V2)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V2)-20/Computer Table (V2)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Size (WxD)", value: "2100mm x 900mm" },
      { category: "Construction", name: "Understructure", value: "Particle Board (Wooden)" },
      { category: "Features", name: "Modesty Panel", value: "Yes" },
      { category: "Features", name: "Storage", value: "Yes" }
    ]
  },
  // --- Computer Table (V3) ---
  {
    id: "5116877-41508926487",
    name: "Computer Table with Footrest (900mm)",
    brand: "Seatech OEM",
    model: "CT FB01",
    category: "Computer Table (V3)",
    price: 6500,
    availability: 500,
    minQty: 10,
    discount: 74,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V3)-1/Computer Table (V3)-B.jpg", thumbnail: "/categories/Computer Table (V3)-1/Computer Table (V3)-S.jpg" },
      { main: "/categories/Computer Table (V3)-1/Computer Table (V3)-B copy.jpg", thumbnail: "/categories/Computer Table (V3)-1/Computer Table (V3)-S copy.jpg" },
      { main: "/categories/Computer Table (V3)-1/Computer Table (V3)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V3)-1/Computer Table (V3)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "General", name: "Type", value: "Computer table with footrest" },
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Length", value: "900mm" },
      { category: "Features", name: "Keyboard Tray", value: "Wood" },
      { category: "Features", name: "Modesty Panel", value: "Yes" }
    ]
  },
  {
    id: "5116877-95895699406",
    name: "Computer Table with Storage Unit (1350mm)",
    brand: "Seatech OEM",
    model: "CT LK1",
    category: "Computer Table (V3)",
    price: 9500,
    availability: 100,
    minQty: 21,
    discount: 62,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V3)-2/Computer Table (V3)-B.jpg", thumbnail: "/categories/Computer Table (V3)-2/Computer Table (V3)-S.jpg" },
      { main: "/categories/Computer Table (V3)-2/Computer Table (V3)-B copy.jpg", thumbnail: "/categories/Computer Table (V3)-2/Computer Table (V3)-S copy.jpg" },
      { main: "/categories/Computer Table (V3)-2/Computer Table (V3)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V3)-2/Computer Table (V3)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "General", name: "Type", value: "Computer table with Storage unit" },
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Length", value: "1350mm" },
      { category: "Features", name: "Keyboard Tray", value: "Wood" },
      { category: "Features", name: "Modesty Panel", value: "Yes" }
    ]
  },
  {
    id: "5116877-53936961386",
    name: "Computer Table with Storage Unit (1500mm)",
    brand: "Seatech OEM",
    model: "SEATECH CTV3 01",
    category: "Computer Table (V3)",
    price: 19000,
    availability: 150,
    minQty: 10,
    discount: 24,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V3)-3/Computer Table (V3)-B.jpg", thumbnail: "/categories/Computer Table (V3)-3/Computer Table (V3)-S.jpg" },
      { main: "/categories/Computer Table (V3)-3/Computer Table (V3)-B copy.jpg", thumbnail: "/categories/Computer Table (V3)-3/Computer Table (V3)-S copy.jpg" },
      { main: "/categories/Computer Table (V3)-3/Computer Table (V3)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V3)-3/Computer Table (V3)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "General", name: "Type", value: "Computer table with Storage unit" },
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Length", value: "1500mm" },
      { category: "Features", name: "Keyboard Tray", value: "Wood" },
      { category: "Features", name: "Modesty Panel", value: "No" }
    ]
  },
  {
    id: "5116877-45479357914",
    name: "Computer Table with Storage Unit & Footrest (900mm)",
    brand: "Seatech OEM",
    model: "CT SIDH8125",
    category: "Computer Table (V3)",
    price: 21500,
    availability: 500,
    minQty: 10,
    discount: 14,
    countryOfOrigin: "India",
    seller: { name: "Seatech OEM", verified: true, rating: 4.2 },
    images: [
      { main: "/categories/Computer Table (V3)-4/Computer Table (V3)-B.jpg", thumbnail: "/categories/Computer Table (V3)-4/Computer Table (V3)-S.jpg" },
      { main: "/categories/Computer Table (V3)-4/Computer Table (V3)-B copy.jpg", thumbnail: "/categories/Computer Table (V3)-4/Computer Table (V3)-S copy.jpg" },
      { main: "/categories/Computer Table (V3)-4/Computer Table (V3)-B copy 2.jpg", thumbnail: "/categories/Computer Table (V3)-4/Computer Table (V3)-S copy 2.jpg" }
    ],
    specifications: [
      { category: "General", name: "Type", value: "Computer table with Storage & footrest" },
      { category: "Material", name: "Table Top", value: "Particle Board" },
      { category: "Dimensions", name: "Length", value: "900mm" },
      { category: "Features", name: "Keyboard Tray", value: "Wood" },
      { category: "Features", name: "Modesty Panel", value: "Yes" }
    ]
  }

];