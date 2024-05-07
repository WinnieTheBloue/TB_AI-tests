# Emergency Plan AI Integration

This project explores the integration of artificial intelligence (AI) models in creating emergency plans for various risks. The project specifically compares the performance of OpenAI and Mistral AI models in generating emergency plans based on given risk parameters.

## Installation

To run this project locally, follow these steps:

Clone the repository:

    git clone https://github.com/your-username/emergency-plan-ai.git

Install the dependencies:

    npm install

Create a .env file by copying the .env.example file and adding your OpenAI and Mistral API keys:

    VITE_OPENAI_API_KEY=your_openai_api_key
    VITE_MISTRAL_API_KEY=your_mistral_api_key

Run the project:

    npm run dev
    
## Usage

The project provides a simple interface to input risk parameters and company information, and then generate an emergency plan using either OpenAI or Mistral AI. The generated emergency plan includes a list of information to gather and tasks to accomplish to overcome the risk.
Pages

The project consists of the following pages:

- `src/App.vue`: The main page where users can input risk parameters and company information, and select an AI model to generate an emergency plan.
- `src/utils/openAI.js` : A JavaScript file containing functions to communicate with the OpenAI API and generate emergency plans. It exports a single function askEmergencyPlan that takes a risk object and company information object as parameters and returns a promise that resolves to an object containing the generated emergency plan.
- `src/utils/mistral.js` : A JavaScript file containing functions to communicate with the Mistral AI API and generate emergency plans. It exports a single function askEmergencyPlan that takes a risk object and company information object as parameters and returns a promise that resolves to an object containing the generated emergency plan.

## Future Work

While this project uses Vue.js for the frontend, the final project will use Laravel with Inertia and Vue.js for the frontend. This project serves as a proof-of-concept for AI integration and a comparison of AI models for emergency plan generation.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
