

export  interface FoodItems{
  name?: string;
}

export  interface Poll{
  category?: string;
  targetedDate?:string;
  startDateTime?:string;
  endDateTime?:string;
  title?: string;
  foodItems?: FoodItems[];
}
