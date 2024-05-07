<script>
import openAIUtils from "./utils/openAI";
import mistralUtils from "./utils/mistral";

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
      answer: null,
      error: false,
    };
  },

  methods: {
    /**
     * Asks the specified AI for an emergency plan for the current risk.
     *
     * @param {string} ai - The AI to ask ('openAI' or 'mistral').
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if there's a problem with the AI request.
     */
    async askAI(ai) {
      this.isLoading = true;
      try {
        if (ai == "openAI") {
          const response = await openAIUtils.askEmergencyPlan(
            this.risk,
            this.companyInfos
          );

          this.error = false;
          this.answer = response;
          this.isLoading = false;
        } else if (ai == "mistral") {
          const response = await mistralUtils.askEmergencyPlan(
            this.risk,
            this.companyInfos
          );

          this.error = false;
          this.answer = response;
          this.isLoading = false;
        } else {
          this.error = "AI not found";
          this.isLoading = false;
        }
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    },
  },

  mounted() {},
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
    <div>
      <button
        @click="askAI('openAI')"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Ask OpenAI
      </button>

      <button
        @click="askAI('mistral')"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Ask Mistral
      </button>
    </div>

    <p v-if="error">{{ error }}</p>
    <div v-if="!error && answer" class="flex justify-center gap-2 mt-2">
      <div v-if="answer.informations" class="border-4 p-4 w-2/5">
        <h2 class="text-xl text-center mb-1">Informations</h2>
        <ul class="text-center">
          <li v-for="information in answer.informations">
            {{ information.titre }}
          </li>
        </ul>
      </div>
      <div v-if="answer.informations" class="border-4 p-4 w-2/5">
        <h2 class="text-xl text-center mb-1">Tâches</h2>
        <ul class="text-center">
          <li v-for="tache in answer.taches">
            {{ tache.titre }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
