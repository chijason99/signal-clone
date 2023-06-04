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


export  function generateConversationId(currentId:string, otherPersonId:string){
  return [currentId, otherPersonId].sort().join('')
}


// export const CHAT_DUMMY_DATA:ChatData = {
//   jason: [
//     { msg: "testing", time: "10:22", fromOthers: false },
//     { msg: "testing2", time: "11:21", fromOthers: true },
//     {
//       msg: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi autem impedit facilis, assumenda qui eveniet explicabo ut, dicta provident quisquam quo nihil illo quam magni odio fugiat dolorum nisi quasi et eius est perspiciatis labore saepe? Porro, ipsum possimus animi voluptatem reiciendis impedit error dolores nisi atque aut, veritatis illo doloribus beatae laborum nesciunt vel cum quae. Voluptatibus harum totam itaque voluptate dignissimos sint natus ullam voluptas quos, provident voluptatum, accusamus doloribus aut tempora! Et harum voluptatem necessitatibus, aliquam provident animi iure velit earum, nihil odit reprehenderit dolore distinctio eligendi veritatis dolorum quaerat veniam unde odio doloremque alias sunt debitis?",
//       time: "11:24",
//       fromOthers: false,
//     },
//     { msg: "testing3", time: "11:21", fromOthers: true },
//     { msg: "testing3", time: "11:21", fromOthers: true },
//     { msg: "testing3", time: "11:21", fromOthers: true },
//     { msg: "testing3", time: "11:21", fromOthers: true },
//     { msg: "testing3", time: "11:21", fromOthers: true },

//   ],
//   david: [
//   ],
// };
