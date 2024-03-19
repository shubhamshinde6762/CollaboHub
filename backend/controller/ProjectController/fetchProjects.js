const user = require("../../model/User/user");
const project = require("../../model/Project/project");

exports.fetch = async (req, res) => {
    try {
        const email = req.body.email;
        
        if (!email) {
            res.status(400).json({
                error: "400-USER"
            });
            return;
        }
        
        // console.log(email)
        // console.log(123, email)
        const admin = await user.findOne({ email });

        if (!admin) {
            res.status(400).json({
                error: "400-USER"
            });
            return;
        }

        // console.log(admin);
        const data = [];

        for (const element of admin.projectIds) {
            const response = await project.findOne({ "_id": element });
            data.push(response);
        }

        // console.log(data);

        res.status(200).json({
            data
        });
    } catch (err) {
        res.status(500).json({
            message: "failed"
        });
    }
};



exports.invitedProject = async (req, res) => {
    try {
        const {email} = req.body;

        if (!email) {
            res.status(400).json({
                error: "400-USER"
            });
            return;
        }

        const admin = await user.findOne({ email });

        // console.log(admin)
        if (!admin) {
            res.status(400).json({
                error: "400-USER"
            });
            return;
        }

        // console.log(admin);
        const data = [];


        for (const element of admin.invitedProjectIds) {
            const response = await project.findOne({ "_id": element });
            data.push(response);
        }

        // console.log(data);

        res.status(200).json({
            data
        });
    } catch (err) {
        res.status(500).json({
            message: "failed"
        });
    }
};



exports.fetchProject = async (req, res) => {
    try {
        const {projectArray} = req.body;
        
        if (!projectArray) {
            res.status(400).json({
                error: "400-USER"
            });
            return;
        }
        

        // console.log(admin);
        const data = [];

        for (const element of projectArray) {
            const response = await project.findOne({ "_id": element });
            data.push(response);
        }

        // console.log(data);

        res.status(200).json({
            data
        });
    } catch (err) {
        res.status(500).json({
            message: "failed"
        });
    }
};

