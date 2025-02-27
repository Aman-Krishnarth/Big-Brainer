const { generateAIContent } = require("../utils/askAiUtil");

const askAi = async (req, res) => {
    try {
        const { prompt } = req.params;

        console.log(prompt)

        const result = await generateAIContent(`answer this question: ${prompt}. Return a message so that i can just directly show it on the frontend. don't use any escape characters. i just want a good response.`);

        console.log(result);

        return res.status(200).json({
            status: true,
            message: "Fetched successfully",
            result,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
    askAi,
};
