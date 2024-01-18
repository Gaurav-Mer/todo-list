const extractDataFromToken = require("../commonFunc/getToken");
const { TodoSchema } = require("../models/todo");


const getAllTodos = async (req, res) => {
    const { DO_NOT_SHARE } = req.cookies;
    const { filter, todoType } = req.query;
    if (DO_NOT_SHARE) {
        const respData = await extractDataFromToken(DO_NOT_SHARE);
        if (respData && respData?.hasOwnProperty("status") && respData?.status === 200) {
            try {
                const queries = { 'associateWith.email': respData?.data?.email };
                if (filter) {
                    queries["level"] = filter
                }
                
                //todoType = all todo with TEAM
                if (todoType) {
                    queries["assignTo"] = todoType
                }

                const allData = await TodoSchema.find(queries);
                if (allData) {
                    return res.status(200).json({ success: true, rData: allData });
                }
                return res.status(400).json({ success: false })
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(400).json({ success: false })
            }

        } else {
            res.status(400).json({ success: false })
        }
    }
}


module.exports = { getAllTodos };