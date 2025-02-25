const { generateAIContent } = require("../utils/askAiUtil");

const askAi = async (req, res) => {
    try {
        const { prompt } = req.params;

        console.log(prompt)

        const result = await generateAIContent(`answer this question: ${prompt}. return the response in html format so that i can just insert this result directly on my webpage`);

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
