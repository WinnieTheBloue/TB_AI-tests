# Emergency plan AI integration 🤖

This project explores the integration of artificial intelligence (AI) models in creating emergency plans for various risks. The project specifically compares the performance of OpenAI and Mistral AI models in generating emergency plans based on given risk parameters.

## Installation 🛠️

### Prerequisites
- Node.js installed on your machine.
- An API key from OpenAI.
- An API key from Mistral AI.

### Steps
To run this project locally, follow these steps:

Clone the repository:

    git clone https://github.com/WinnieTheBloue/TB_AI-tests

Install the dependencies:

    npm install

Create a .env file by copying the .env.example file and adding your OpenAI and Mistral API keys:

    VITE_OPENAI_API_KEY=your_openai_api_key
    VITE_MISTRAL_API_KEY=your_mistral_api_key

Run the project:

    npm run dev
    
## Usage 💡

The project provides a simple interface to input risk parameters and company information (directly in the code), and then generate an emergency plan using either OpenAI or Mistral AI. The generated emergency plan includes a list of information to gather and tasks to accomplish to overcome the risk.
### Interface
- **Main page** `src/App.vue` : Users can submit risk parameters and select an AI model for generating the emergency plan.

### Utility Files
- **OpenAI utilities** `src/utils/openAI.js` : Handles communication with the OpenAI API and emergency plan generation.
- **Mistral utilities** `src/utils/mistral.js` : Manages interactions with the Mistral AI API for emergency plan creation.

## Future work 🚀

While this project uses Vue.js for the frontend, the final project will use Laravel with Inertia and Vue.js for the frontend. This project serves as a proof-of-concept for AI integration and a comparison of AI models for emergency plan generation.

## License 📄
This project is licensed under the MIT License. See the [LICENSE](https://github.com/WinnieTheBloue/TB_AI-tests/blob/main/LICENSE) file for details.
