// Dans controllers/groupController.js
const fs = require("fs");
const path = require("path");
function getUsersData() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../DataBase', 'users.json'), 'utf-8'));
}

exports.joinGroup = async (req, res) => {
    const username = req.user.sub;
    const groupName = req.body.groupName;

    const usersData = getUsersData();
    let user = usersData.users.find(usr => usr.username === username);

    // Check if user is already in a group
    if (user.group) {
        // If user was the owner, assign a new one or delete the group if it's empty
        if (user.isOwner) {
            let groupMembers = usersData.users.filter(usr => usr.group === user.group && usr.username !== username);
            if (groupMembers.length > 0) {
                groupMembers[0].isOwner = true; // Assign new owner
            } else {
                groupMembers.forEach(member => {
                    member.group = null; // Delete group
                    member.isOwner = false;
                });
            }
        }
        user.group = null;
        user.isOwner = false;
    }

    // Add user to group
    user.group = groupName;
    user.isOwner = !usersData.users.some(usr => usr.group === groupName && usr.isOwner);

    // Save users data
    fs.writeFileSync(path.join(__dirname, '../DataBase/users.json'), JSON.stringify(usersData, null, 2));

    res.status(200).json({ message: `You have successfully joined the group ${groupName}` });
};