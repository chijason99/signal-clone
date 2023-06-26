export type ProfileData = {
  imageSrc:string,
  name:string,
  lastSentence: string
}

export type Message = {
  msg: string,
  time: string,
  senderId: string
  receiverId: string
}
export const DUMMY_DATA:ProfileData[] = [
  {
    imageSrc: "/puppy.jpg",
    name: "Jason",
    lastSentence: "Testing last sentence",
  },
  {
    imageSrc: "/puppy.jpg",
    name: "Jason2",
    lastSentence: "Testing last sentence",
  },
  {
    imageSrc: "/puppy.jpg",
    name: "Jason3",
    lastSentence: "Testing last sentence",
  },
  {
    imageSrc: "/puppy.jpg",
    name: "Jason4",
    lastSentence: "Testing last sentence",
  },
  {
    imageSrc: "/puppy.jpg",
    name: "Jason5",
    lastSentence: "Testing last sentence",
  },
  {
    imageSrc: "/puppy.jpg",
    name: "Jason6",
    lastSentence: "Testing last sentence",
  },
  {
    imageSrc: "/puppy.jpg",
    name: "Jason7",
    lastSentence: "Testing last sentence",
  },
  {
    imageSrc: "/puppy.jpg",
    name: "Jason8",
    lastSentence: "Testing last sentence",
  },
];


export  function generateConversationId(currentUserId:string, targetUserId:string){
  return [currentUserId, targetUserId].sort().join('')
}

export function checkPhoneNumberLength(phoneNumber:string,targetLength:number):boolean{
  return phoneNumber.trim().length === targetLength;
}
