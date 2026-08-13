import API from "./api";

export const createMeeting = async (meetingData, token) => {

    const response = await API.post(
        "/meeting/create",
        meetingData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};

export const getMyMeetings = async (token) => {
  const response = await API.get("/meeting/my-meetings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const joinMeeting = async (data, token) => {
  const response = await API.post("/meeting/join", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getMeetingDetails = async (meetingId, token) => {
  const response = await API.get(`/meeting/${meetingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteMeeting = async (meetingId, token) => {
  const response = await API.delete(
    `/meeting/delete/${meetingId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateMeeting = async (
  meetingId,
  meetingData,
  token
) => {
  const response = await API.put(
    `/meeting/update/${meetingId}`,
    meetingData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};