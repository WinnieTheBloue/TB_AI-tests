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
            model: "gpt-3.5-turbo",
        });
        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        throw new Error("Une erreuer est survenue, veuillez réessayer plus tard.");
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
            content: `Tu es spécialisé dans la gestion de risques pour une société. En cas de problèmes, tu peux compter sur ${companyInfos.employees} employés pour t'aider. Tu es paramétré pour répondre en JSON et en français.`,
        },
        {
            role: "user",
            content: `Établis le plan d'urgence pour ce risque : ${risk.description}. La probabilité est estimée à ${risk.probability}/4 et l'impact à ${risk.impact}/4. Le plan d'urgence doit contenir UNIQUEMENT les informations qu'il faut obtenir pour donner une image claire de la situation si ce risque s'avère et les tâches qu'il faut accomplir pour le surmonter format {informations : [{titre: "Information 1"},{titre : "Information 2"},{titre: "..."},],taches : [{titre: "Tâche 1"},{titre : "Tâche 2"},{titre: "..."},]}. Les tâches et les informations doivent être claires et utiles.`,
        },
    ];
    return await askOpenAI(message);
}

export default { askEmergencyPlan }