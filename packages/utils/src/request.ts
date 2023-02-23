
export const fetchRequest = async (page: number = 0, limit: number = 10) => {
 try {
  const response : any = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=${limit}`)
  const parsedData = await response.json();
  return parsedData;
 } catch (error:any) {
  console.log(error);
  throw new Error(error?.message || "Not Found") 
 }
};

export const fetchRequestById = async (id: string = '') => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const parsedData = await response.json();
  return parsedData;
};
