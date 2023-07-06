/**
 TM.ts
 sveltekit-tailwind-starter-template
 
 Created by Ian Thompson on June 27th 2023
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2023 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';


// export class TeachableMachine {
//     machine: tmImage.TeachableMobileNet

//     constructor() {
//         // this.initializeTeachableMachine()
//     }

//     public async initializeTeachableMachine() {
//         console.log("initializeTeeachableMachine");
        
//         return new Promise<void>(async (resolve, reject) => {
//             machine = await tmImage.createTeachable(
//                 { 
//                     tfjsVersion: tf.version.tfjs 
//                 },
//                 { 
//                     version: 2, 
//                     alpha: 0.35 
//                 }
//             );

//             machine.prepare()

//             resolve()
//         });

//         // machine = await tmImage.createTeachable(
// 		// 	{ 
//         //         tfjsVersion: tf.version.tfjs 
//         //     },
// 		// 	{ 
//         //         version: 2, 
//         //         alpha: 0.35 
//         //     }
// 		// );
//         // machine.prepare()
//     }

//     public createLabel(label: string, index: number) {
//         this.machine.setLabel(index, label)
//     }

//     get isPrepared() {
//         return this.machine.isPrepared
//     }
// }



// let machine;

export const TeachableWrapper = {
	initTeachable: async (faces: [HTMLImageElement], hands: [HTMLImageElement]) => {

        // const trainingParams = {
        //     denseUnits: 100,
        //     epochs: 50,
        //     learningRate: 0.001,
        //     batchSize: 16
        // }

        console.log('initTeachable');


        // Initialize the teachable machine model>
		let mn = await tmImage.createTeachable(
			{ 
                tfjsVersion: tf.version.tfjs 
            },
			{ 
                version: 2, 
                alpha: 0.35 
            }
		);
		// mn.setLabel(0, 'face');


		// console.log(hand);

		// console.log(face);

		// mn.setLabel(0, 'face');
        // mn.setLabel(1, 'hand')
        
        /**
         * Define the two classifications. Will be referenced later by index (ie: index 0 == "face")
         */
        mn.setLabels(["face", "hand"])
        

        // mn.prepare()
        // mn.prepareDataset()

        await tf.nextFrame().then(async () => {
            console.log("run");

            /**
             * Loop through each face and then add it as an example to the model
             */
            faces.forEach( async (face) => {
                await mn.addExample(0, face)
                console.log("training face: ", face);
                
            })

            /**
             * Loop through each hand and then add it as an example to the model
             */
            hands.forEach( async (hand) => {
                await mn.addExample(1, hand)
                console.log("training hand: ", hand);

            })
            
            // let face = document.createElement('img');
            // face.src = '/0.png';
    
            // let hand = document.createElement('img')
            // hand.src = "/1.png"

            // await mn.addExample(0, face)
            // await mn.addExample(1, hand)

            
            /**
             * Train the model. Not sure what any of this means to be honest.
             */
            
            await mn.train({
                denseUnits: 100,
                epochs: 50,
                learningRate: 0.001,
                batchSize: 16
            }, {
                onBatchBegin: (logs) => {
                    // console.log(logs);
                    
                },
                onTrainBegin: () => {
                    console.log("Training begin!");
                },
                onTrainEnd: async () => {
                    console.log("Training has ended!");

                    let modelSave = await mn.asSequentialModel.save('localstorage://my-model');
		            console.log(modelSave);
                }
            })
        })

	},

	addExample: async (img) => {
		// await machine.addExample(0, img)
	}
};
