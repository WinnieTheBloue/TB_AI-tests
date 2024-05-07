<script>
import OpenAI from "openai";
import MistralClient from "@mistralai/mistralai";
import { ref } from "vue";

export default {

    data() {
        return {
            isLoading: false,
            companyInfos: {
                employees: 20,
                country: "Suisse",
            },
            risk: {
                name: "Incendie",
                description: "Risque d'incendie",
                probability: 1,
                impact: 4,
            },
            openAI: import.meta.env.VITE_OPENAI_API_KEY,
            mistral: import.meta.env.VITE_MISTRAL_API_KEY,
            openAiAnswer: null,

            openAiError: false,
            mistralAnswer: null,
            mistralError: false,
        };
    },

    methods: {
        handleImageError() {
            document
                .getElementById("screenshot-container")
                ?.classList.add("!hidden");
            document.getElementById("docs-card")?.classList.add("!row-span-1");
            document
                .getElementById("docs-card-content")
                ?.classList.add("!flex-row");
            document.getElementById("background")?.classList.add("!hidden");
        },
        async askOpenAI() {
            this.isLoading = true;
            const openai = new OpenAI({
                apiKey: this.openAI,
                dangerouslyAllowBrowser: true,
            });

            try {
                const completion = await openai.chat.completions.create({
                    response_format: { type: "json_object" },
                    messages: [
                        {
                            role: "system",
                            content: `Tu es spécialisé dans la gestion de risques pour une société. En cas de problèmes, tu peux compter sur ${this.companyInfos.employees} employés pour t'aider. Tu es paramétré pour répondre en JSON et en français.`,
                        },
                        {
                            role: "user",
                            content: `Établis le plan d'urgence pour ce risque : ${this.risk.description}. La probabilité est estimée à ${this.risk.probability}/4 et l'impact à ${this.risk.impact}/4. Le plan d'urgence doit contenir UNIQUEMENT les informations qu'il faut obtenir pour donner une image claire de la situation si ce risque s'avère et les tâches qu'il faut accomplir pour le surmonter format {informations : [{titre: "Information 1"},{titre : "Information 2"},{titre: "..."},],taches : [{titre: "Tâche 1"},{titre : "Tâche 2"},{titre: "..."},]}. Les tâches et les informations doivent être claires et utiles.`,
                        },
                    ],
                    model: "gpt-3.5-turbo",
                });
                console.log(completion.choices[0].message.content);
                this.openAiError = false;
                this.openAiAnswer = JSON.parse(
                    completion.choices[0].message.content
                );
                this.isLoading = false;
            } catch (error) {
                console.error(error);
                this.openAiError = true;
                this.isLoading = false;
            }
        },
        async askMistral() {
            this.isLoading = true;
            const mistral = new MistralClient(this.mistral);

            try {
                const response = await mistral.chat({
                    model: "mistral-large-latest",
                    response_format: { type: "json_object" },
                    messages: [
                        {
                            role: "system",
                            content: `Tu es spécialisé dans la gestion de risques pour une société. En cas de problèmes, tu peux compter sur ${this.companyInfos.employees} employés pour t'aider. Tu es paramétré pour répondre en JSON et en français.`,
                        },
                        {
                            role: "user",
                            content: `Établis le plan d'urgence pour ce risque : ${this.risk.description}. La probabilité est estimée à ${this.risk.probability}/4 et l'impact à ${this.risk.impact}/4. Le plan d'urgence doit contenir UNIQUEMENT les informations qu'il faut obtenir pour donner une image claire de la situation si ce risque s'avère et les tâches qu'il faut accomplir pour le surmonter format {informations : [{titre: "Information 1"},{titre : "Information 2"},{titre: "..."},],taches : [{titre: "Tâche 1"},{titre : "Tâche 2"},{titre: "..."},]}. Les tâches et les informations doivent être claires et utiles.`,
                        },
                    ],
                });
                console.log(response.choices[0].message.content);
                this.mistralError = false;
                this.mistralAnswer = JSON.parse(
                    response.choices[0].message.content
                );
                this.isLoading = false;
            } catch (error) {
                console.error(error);
                this.mistralError = true;
                this.isLoading = false;
            }
        },
    },

    mounted() {
    },
};
</script>

<template>
    <div
        v-if="isLoading"
        class="w-screen h-screen bg-[#ffffff77] fixed flex justify-center items-center gap-5"
    >
        <span class="sr-only">Loading...</span>
        <div
            class="h-8 w-8 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.3s]"
        ></div>
        <div
            class="h-8 w-8 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.15s]"
        ></div>
        <div class="h-8 w-8 bg-blue-700 rounded-full animate-bounce"></div>
    </div>
    <div
        class="flex flex-col justify-center items-center flex-wrap h-screen w-full"
    >
        <button
            @click="askOpenAI"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
            Ask OpenAI
        </button>
        <p v-if="openAiError">Une erreure avec OpenAI est survenue</p>
        <div v-if="!openAiError && openAiAnswer">
            <div v-if="openAiAnswer.informations">
                <p>Informations :</p>
                <ul>
                    <li v-for="information in openAiAnswer.informations">
                        {{ information.titre }}
                    </li>
                </ul>
            </div>
            <div v-if="openAiAnswer.informations">
                <p>Tâches :</p>
                <ul>
                    <li v-for="tache in openAiAnswer.taches">
                        {{ tache.titre }}
                    </li>
                </ul>
            </div>
        </div>

        <button
            @click="askMistral"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
            Ask Mistral
        </button>
        <p v-if="mistralError">Une erreure avec Mistral est survenue</p>
        <div v-if="!mistralError && mistralAnswer">
            <div v-if="mistralAnswer.informations">
                <p>Informations :</p>
                <ul>
                    <li v-for="information in mistralAnswer.informations">
                        {{ information.titre }}
                    </li>
                </ul>
            </div>
            <div v-if="mistralAnswer.informations">
                <p>Tâches :</p>
                <ul>
                    <li v-for="tache in mistralAnswer.taches">
                        {{ tache.titre }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
