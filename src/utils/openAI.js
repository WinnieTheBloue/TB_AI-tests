import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, 
    dangerouslyAllowBrowser: true,
});

/**
 * Sends a message to OpenAI and returns the response.
 *
 * @param {Array<Object>} message - An array of message objects. Each object should have 'role' and 'content' properties.
 * @param {string} message.role - The role of the message sender (either 'system' or 'user').
 * @param {string} message.content - The content of the message.
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON response from OpenAI.
 * @throws {Error} Throws an error if there's a problem with the OpenAI request.
 */
const askOpenAI = async (message) => {
    try {
        const completion = await openai.chat.completions.create({
            response_format: { type: "json_object" },
            messages: message,
            model: "gpt-4-turbo",
        });
        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        throw new Error("Une erreur est survenue, veuillez réessayer.");
    }
}

/**
 * Asks OpenAI to establish an emergency plan for a given risk.
 *
 * @param {Object} risk - The risk object containing 'description', 'probability', and 'impact'.
 * @param {string} risk.description - The description of the risk.
 * @param {number} risk.probability - The probability of the risk (between 0 and 4).
 * @param {number} risk.impact - The impact of the risk (between 0 and 4).
 * @param {Object} companyInfos - The company information object containing 'employees'.
 * @param {number} companyInfos.employees - The number of employees in the company.
 * @returns {Promise<Object>} A promise that resolves to an object containing 'informations' and 'taches'.
 * @throws {Error} Throws an error if there's a problem with the OpenAI request.
 */
const askEmergencyPlan = async (risk, companyInfos) => {
    const message = [
        {
            role: "system",
            content: `Tu es spécialiste en gestion de crise dans une entreprise ${companyInfos.country} de ${companyInfos.employees} employés, dont l'activité principale est : « ${companyInfos.type} ». Tu es paramétré pour répondre en JSON et en français.`,
        },
        {
            role: "user",
            content: `Pour développer un plan d'urgence, détermine les informations clés nécessaires pour comprendre la situation et liste les étapes essentielles pour y répondre efficacement. La crise en question est la suivante : « ${risk.description} ». Les conséquences dommageables sont les suivantes : « ${risk.consequences} ». Génère un plan contenant uniquement les informations cruciales à obtenir et les tâches à accomplir pour gérer cette crise tout en essayant de garantir la continuité des activités. Donne tes réponses UNIQUEMENT dans le format JSON suivant : {"infos":[{"titre": "Information 1"},{"titre": "Information 2"},{"titre": "Etc…"},],"tasks":[{"titre": "Tâche 1"},{"titre": "Tâche 2"},{"titre": "Etc…"},]}`,
        },
    ];
    return await askOpenAI(message);
}

export default { askEmergencyPlan }