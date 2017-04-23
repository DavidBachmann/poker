// import handleNextPlayerToAct from './handleNextPlayerToAct'
//
// test('Returns correctly when no one has yet to act', () => {
//   expect(
//     handleNextPlayerToAct(
//       [
//         // Minimal player objects
//         {
//           chipsCurrentlyInvested: 255,
//           hasFolded: false,
//           isAllIn: false,
//         },
//         {
//           chipsCurrentlyInvested: 0,
//           hasFolded: true,
//           isAllIn: false,
//         },
//         {
//           holeCards: [],
//           chipsCurrentlyInvested: 0,
//           hasFolded: true,
//           isAllIn: false,
//         },
//         {
//           chipsCurrentlyInvested: 255,
//           hasFolded: false,
//           isAllIn: false,
//         },
//         {
//           holeCards: [],
//           chipsCurrentlyInvested: 10,
//           hasFolded: true,
//           isAllIn: false,
//         },
//         {
//           chipsCurrentlyInvested: 20,
//           hasFolded: true,
//           isAllIn: false,
//         },
//       ],
//       5, // Next Player To Act
//       {
//         // Highest current bettor object
//         chipsCurrentlyInvested: 255,
//         hasFolded: false,
//         isAllIn: false,
//       },
//     ),
//   ).toBe(-1)
// })
//
// test('Returns next player to act', () => {
//   expect(
//     handleNextPlayerToAct(
//       [
//         // Minimal player objects
//         {
//           chipsCurrentlyInvested: 255,
//           hasFolded: false,
//           isAllIn: false,
//         },
//         {
//           chipsCurrentlyInvested: 0,
//           hasFolded: false,
//           isAllIn: false,
//         },
//         {
//           holeCards: [],
//           chipsCurrentlyInvested: 0,
//           hasFolded: false,
//           isAllIn: false,
//         },
//         {
//           chipsCurrentlyInvested: 255,
//           hasFolded: false,
//           isAllIn: false,
//         },
//         {
//           holeCards: [],
//           chipsCurrentlyInvested: 10,
//           hasFolded: false,
//           isAllIn: false,
//         },
//         {
//           chipsCurrentlyInvested: 20,
//           hasFolded: false,
//           isAllIn: false,
//         },
//       ],
//       4, // Next Player To Act
//       {
//         // Highest current bettor object
//         chipsCurrentlyInvested: 255,
//         hasFolded: false,
//         isAllIn: false,
//       },
//     ),
//   ).toBe(5)
// })
//
// test('Returns correctly when all players are all-in and no one can act', () => {
//   expect(
//     handleNextPlayerToAct(
//       [
//         // Minimal player objects
//         {
//           chipsCurrentlyInvested: 1500,
//           hasFolded: false,
//           isAllIn: true,
//         },
//         {
//           chipsCurrentlyInvested: 1500,
//           hasFolded: false,
//           isAllIn: true,
//         },
//         {
//           holeCards: [],
//           chipsCurrentlyInvested: 1500,
//           hasFolded: false,
//           isAllIn: true,
//         },
//         {
//           chipsCurrentlyInvested: 1500,
//           hasFolded: false,
//           isAllIn: true,
//         },
//         {
//           holeCards: [],
//           chipsCurrentlyInvested: 1500,
//           hasFolded: false,
//           isAllIn: true,
//         },
//         {
//           chipsCurrentlyInvested: 1500,
//           hasFolded: false,
//           isAllIn: true,
//         },
//       ],
//       4, // Next Player To Act
//       {
//         // Highest current bettor object
//         chipsCurrentlyInvested: 255,
//         hasFolded: false,
//         isAllIn: true,
//       },
//     ),
//   ).toBe(-1)
// })
