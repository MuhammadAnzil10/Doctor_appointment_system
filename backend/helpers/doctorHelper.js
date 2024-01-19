export const formatTime = (startTime, endTime) => {
  const startTimeSplit = startTime.split(":");
  const startTimeHour = startTimeSplit[0];
  const startTimeMin = startTimeSplit[1];
  let updatedStartTime = `${startTime} AM`;
  if (startTimeHour > 12) {
    let formattedStartTime = startTimeHour - 12;
    formattedStartTime += `:${startTimeMin} PM`;
    updatedStartTime = formattedStartTime;
  }

  const endTimeSplit = endTime.split(":");
  const endTimeHour = endTimeSplit[0];
  const endTimeMin = endTimeSplit[1];
  let updatedEndTime = `${endTime} AM`;
  if (endTimeHour > 12) {
    let formattedEndTime = endTimeHour - 12;
    formattedEndTime += `:${endTimeMin} PM`;
    updatedEndTime = formattedEndTime;
  }

  return { updatedStartTime, updatedEndTime };
};
