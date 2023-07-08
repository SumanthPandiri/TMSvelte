/**
 /src/util/TM.ts
 TM.ts
 teachable-svelte
 
 Created by Ian Thompson on June 27th 2023
 icthomp@clemson.edu
 ianthompson@nicelion.com
 
 https://iancthompson.dev
 https://idealab.sites.clemson.edu
 
 MIT License
 
 Copyright (c) 2023 Nice Lion Technologies LLC
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
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

		mn.setName('Hand vs Face');
		// mn.setLabel(0, 'face');

		// console.log(hand);

		// console.log(face);

		// mn.setLabel(0, 'face');
		// mn.setLabel(1, 'hand')

		/**
		 * Define the two classifications. Will be referenced later by index (ie: index 0 == "face")
		 */
		mn.setLabels(['face', 'hand']);

		// mn.prepare()
		// mn.prepareDataset()

		await tf.nextFrame().then(async () => {
			console.log('run');

			/**
			 * Loop through each face and then add it as an example to the model
			 */
			faces.forEach(async (face) => {
				await mn.addExample(0, face);
				console.log('training face: ', face);
			});

			/**
			 * Loop through each hand and then add it as an example to the model
			 */
			hands.forEach(async (hand) => {
				await mn.addExample(1, hand);
				console.log('training hand: ', hand);
			});

			// let face = document.createElement('img');
			// face.src = '/0.png';

			// let hand = document.createElement('img')
			// hand.src = "/1.png"

			// await mn.addExample(0, face)
			// await mn.addExample(1, hand)

			/**
			 * Train the model. Not sure what any of this means to be honest.
			 */

			await mn.train(
				{
					denseUnits: 100,
					epochs: 50,
					learningRate: 0.001,
					batchSize: 16
				},
				{
					onBatchBegin: (logs) => {
						// console.log(logs);
					},
					onTrainBegin: () => {
						console.log('Training begin!');
					},
					onTrainEnd: async () => {
						console.log('Training has ended!');

						/**
						 * Training has ended, and now we can save the model. The model is saved to localstorage (as a cookie essentially).
						 * This can be viewed by opening up DevTools in Chrome and looking under the "application" tab. Then, under "storage", you
						 * should see a "local storage" tab with the url of the localhost running. Then, you can see the model saved there.
						 *
						 * This still isnt giving us exactly what we want, but looks to be really close.
						 */

						// let modelSave = await mn.save('downloads://my-model');
						// let test = mn.model.compile({
						// 	optimizer: 'adam',
						// 	// Use the correct loss function. If 2 classes of data, must use binaryCrossentropy.
						// 	// Else categoricalCrossentropy is used if more than 2 classes.
						// 	loss: 'binaryCrossentropy' ,
						// 	// As this is a classification problem you can record accuracy in the logs too!
						// 	metrics: ['accuracy']
						// })

						// console.log(test);

						// console.log(modelSave);
					},
					onBatchEnd: () => {
						console.log('batch ended');
					}
				}
			);

			// let modelSave = await mn.save('downloads://model');
			// let metadata = JSON.stringify(mn.getMetadata())

			// var a = document.createElement("a");
			// document.body.appendChild(a);

			// var blob = new Blob([metadata], {type : 'text/json'}); // the blob
			// var url = window.URL.createObjectURL(blob);
			// a.href = url;
			// a.download = "metadata.json";
			// a.click();
			// mn.getMetadata()
		});
	},

	addExample: async (img) => {
		// await machine.addExample(0, img)
	}
};
