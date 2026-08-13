const Meeting = require("../models/meeting");

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
        const meetingCode = "CM-" + Math.random().toString(36).substring(2, 8).toUpperCase();

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

exports.joinMeeting = async (req, res) => {

    try {

        const { meetingCode } = req.body;

        if (!meetingCode) {
            return res.status(400).json({
                success: false,
                message: "Meeting code is required"
            });
        }

        const meeting = await Meeting.findOne({ meetingCode });

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting not found"
            });
        }

        const alreadyJoined = meeting.participants.some(
            participant => participant.toString() === req.user.id
        );

        if (!alreadyJoined) {
            meeting.participants.push(req.user.id);
            await meeting.save();
        }

        if (alreadyJoined) {
  return res.status(200).json({
    success: true,
    message: "Already joined this meeting",
    meeting,
  });
}

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

exports.getMyMeetings = async (req, res) => {

    try {

        const meetings = await Meeting.find({
            host: req.user.id
        }).populate("host", "fullName email");

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

// ================= Meeting Details =================

exports.getMeetingDetails = async (req, res) => {

    try {

        const { meetingId } = req.params;

        const meetings = await Meeting.find({
    host: req.user.id
})
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

// ================= Update Meeting =================

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

        if (meetingTitle) meeting.meetingTitle = meetingTitle;
        if (status) meeting.status = status;

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

exports.leaveMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    meeting.participants = meeting.participants.filter(
      (participant) => participant.toString() !== req.user.id
    );

    await meeting.save();

    return res.status(200).json({
      success: true,
      message: "Left meeting successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.searchMeetings = async (req, res) => {
  try {

    const { title = "" } = req.query;

    const meetings = await Meeting.find({
  meetingTitle: {
    $regex: title,
    $options: "i",
  },
});

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
