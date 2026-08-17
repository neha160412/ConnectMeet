const Meeting = require("../models/meeting");

// ================= CREATE MEETING =================

exports.createMeeting = async (req, res) => {
    try {

        const { meetingTitle } = req.body;

        if (!meetingTitle) {
            return res.status(400).json({
                success: false,
                message: "Meeting title is required"
            });
        }

        // Generate a random meeting code
        const meetingCode =
            "CM-" +
            Math.random()
                .toString(36)
                .substring(2, 8)
                .toUpperCase();

        // Create meeting
        const meeting = await Meeting.create({
            meetingTitle,
            meetingCode,
            host: req.user.id
        });

        return res.status(201).json({
            success: true,
            message: "Meeting created successfully",
            meeting
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};


// ================= JOIN MEETING =================

exports.joinMeeting = async (req, res) => {
    try {

        const { meetingCode } = req.body;

        if (!meetingCode) {
            return res.status(400).json({
                success: false,
                message: "Meeting code is required"
            });
        }

        const meeting = await Meeting.findOne({
            meetingCode: meetingCode.trim().toUpperCase()
        });

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting not found"
            });
        }

        // Host cannot join their own meeting as participant
        if (meeting.host.toString() === req.user.id) {
            return res.status(200).json({
                success: true,
                message: "You are the host of this meeting",
                meeting
            });
        }

        // Check whether user already joined
        const alreadyJoined = meeting.participants.some(
            participant =>
                participant.toString() === req.user.id
        );

        if (alreadyJoined) {
            return res.status(200).json({
                success: true,
                message: "Already joined this meeting",
                meeting
            });
        }

        // Add user as participant
        meeting.participants.push(req.user.id);

        await meeting.save();

        return res.status(200).json({
            success: true,
            message: "Joined meeting successfully",
            meeting
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};


// ================= MY MEETINGS =================

exports.getMyMeetings = async (req, res) => {
    try {

        /*
          Return meetings where the logged-in user is:

          1. Host
          OR
          2. Participant
        */

        const meetings = await Meeting.find({
            $or: [
                { host: req.user.id },
                { participants: req.user.id }
            ]
        })
            .populate("host", "fullName email")
            .populate("participants", "fullName email");

        return res.status(200).json({
            success: true,
            totalMeetings: meetings.length,
            meetings
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};


// ================= MEETING DETAILS =================

exports.getMeetingDetails = async (req, res) => {
    try {

        const { meetingId } = req.params;

        const meeting = await Meeting.findById(meetingId)
            .populate("host", "fullName email")
            .populate("participants", "fullName email");

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting not found"
            });
        }

        return res.status(200).json({
            success: true,
            meeting
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};


// ================= UPDATE MEETING =================

exports.updateMeeting = async (req, res) => {
    try {

        const { meetingId } = req.params;
        const { meetingTitle, status } = req.body;

        const meeting = await Meeting.findById(meetingId);

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting not found"
            });
        }

        // Only host can update
        if (meeting.host.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this meeting"
            });
        }

        if (meetingTitle) {
            meeting.meetingTitle = meetingTitle;
        }

        if (status) {
            meeting.status = status;
        }

        await meeting.save();

        return res.status(200).json({
            success: true,
            message: "Meeting updated successfully",
            meeting
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};


// ================= DELETE MEETING =================

exports.deleteMeeting = async (req, res) => {
    try {

        const { meetingId } = req.params;

        const meeting = await Meeting.findById(meetingId);

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting not found"
            });
        }

        // Only host can delete
        if (meeting.host.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this meeting"
            });
        }

        await meeting.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Meeting deleted successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};


// ================= LEAVE MEETING =================

exports.leaveMeeting = async (req, res) => {
    try {

        const meeting = await Meeting.findById(req.params.id);

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting not found"
            });
        }

        // Host cannot leave their own meeting
        if (meeting.host.toString() === req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Host cannot leave the meeting"
            });
        }

        meeting.participants = meeting.participants.filter(
            participant =>
                participant.toString() !== req.user.id
        );

        await meeting.save();

        return res.status(200).json({
            success: true,
            message: "Left meeting successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};


// ================= SEARCH MEETINGS =================

exports.searchMeetings = async (req, res) => {
    try {

        const { title = "" } = req.query;

        const meetings = await Meeting.find({
            meetingTitle: {
                $regex: title,
                $options: "i"
            }
        })
            .populate("host", "fullName email")
            .populate("participants", "fullName email");

        return res.status(200).json({
            success: true,
            total: meetings.length,
            meetings
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};