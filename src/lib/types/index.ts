/**
 /src/lib/types/index.ts
 index.ts
 teachable-svelte
 
 
*/

export interface Classification {
	/**
	 * Array of HTMLImageElements that will be used as examples to train a model
	 */
	trainingData: [HTMLImageElement];

	/**
	 * The name of training class
	 */
	name: string;
}

/**
 * Tracks the TrainingState of the model
 */
export enum TrainingStates {
	inactive,
	training,
	finish,
	error
}
