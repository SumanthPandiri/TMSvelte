<!--
 /src/lib/components/Train.svelte
 Train.svelte
 teachable-svelte
 
 Created by Ian Thompson on July 7th 2023
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
--->


<script lang="ts">

    import * as tf from '@tensorflow/tfjs';
    import * as tmImage from '@teachablemachine/image';

	import type { Classification } from "$lib/types";
	import type { TrainingParameters } from "@teachablemachine/image/dist/teachable-mobilenet";
	import { onMount } from "svelte";
	import type { ModelOptions } from '@teachablemachine/image/dist/custom-mobilenet';
	import Terminal from './Terminal.svelte';
	import { cropTo } from '../../util/Canvas';

    export let classifications: [Classification]

    let logs: [string] = []

    const trainingParams: TrainingParameters = {
        denseUnits: 100,
        epochs: 50, 
        learningRate: 0.001,
        batchSize: 16
    }

    const teachableMetadata: tmImage.Metadata = {
        tfjsVersion: tf.version.tfjs
    }

    const modelOptions: ModelOptions = {
        version: 2,
        alpha: 0.35
    }

    onMount(async () => {
        addLog("Waiting for initialization\n")
        console.log(classifications);
        
    })

    const beginTraining = async () => {
        addLog("Initializing TeachableMachine")

        let model = await tmImage.createTeachable(teachableMetadata, modelOptions )

        
        classifications.forEach((classification, i) => {
            addLog(`Setting label ${i} to ${classification.name}`)
            model.setLabel(i, classification.name)
        })

        await tf.nextFrame().then(async () => {
            addLog("")
            addLog("Running tf.nextFrame()")

            classifications.forEach(async (c, i) => {
                c.trainingData.forEach(async (trainingImage, j) => {
                    addLog(`Adding training image ${j} of ${c.trainingData.length} as an example for ${c.name}.`)

                    
                    // let croppedImage = cropTo(trainingImage, 224, false)
                    // console.log(croppedImage);
                    
                    // console.log(trainingImage)

                    console.log(i);
                    
                    await model.addExample(i, trainingImage)
                })

                addLog("")
            })

            await model.train(trainingParams, {
                onBatchBegin: () => {
                    addLog("Batch begining!")
                }, 
                onTrainBegin: () => {
                    addLog("Training begining!")
                }, 
                onBatchEnd: () => {
                    addLog("Batch ended!")
                }, 
                onTrainEnd: () => {
                    addLog("Training ended!")
                }
            })

        })


    }

    const addLog = (message: string) => {
        logs = [...logs, message]
    }

</script>

<div class="w-full px-5">
    <button class="btn btn-success" on:click={beginTraining}>Train Model</button>
    <span class="loading loading-spinner text-info loading-lg"></span>
    <Terminal {logs}/>
</div>