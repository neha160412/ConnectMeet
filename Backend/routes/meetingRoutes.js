const express = require("express");
const router = express.Router();

const {
    createMeeting,
    joinMeeting,
    getMyMeetings,
    getMeetingDetails,
    updateMeeting,
    deleteMeeting,
    leaveMeeting,
    searchMeetings
} = require("../controllers/meetingController");

const { auth } = require("../middleware/authmiddleware");

// Create Meeting
router.post("/create", auth, createMeeting);

// Join Meeting
router.post("/join", auth, joinMeeting);

// My Meetings
router.get("/my-meetings", auth, getMyMeetings);

// Search Meetings (MUST COME BEFORE /:meetingId)
router.get("/search", auth, searchMeetings);

// Meeting Details
router.get("/:meetingId", auth, getMeetingDetails);

// Update Meeting
router.put("/update/:meetingId", auth, updateMeeting);

// Delete Meeting
router.delete("/delete/:meetingId", auth, deleteMeeting);

// Leave Meeting
router.delete("/leave/:id", auth, leaveMeeting);

module.exports = router;