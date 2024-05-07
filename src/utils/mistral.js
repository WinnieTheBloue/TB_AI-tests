import MistralClient from "@mistralai/mistralai";

const mistral = new MistralClient(import.meta.env.VITE_MISTRAL_API_KEY);

const askMistral = async (message) => {
    try {
        const completion = await mistral.chat({
            model: "mistral-large-latest",
            response_format: { type: "json_object" },
            messages: message,

        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        throw new Error("Une erreuer est survenue, veuillez réessayer plus tard.");
    }
}

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
    return await askMistral(message);
}

export default { askEmergencyPlan }

