function dealWithTime(time) {
  var timeDate = new Date(time*1000);
  var minutes = timeDate.getMinutes();
  var seconds = timeDate.getSeconds();
  return addZero(minutes) + ':' + addZero(seconds);
}

function addZero(time) {
  return time >= 10 ? time : ('0'+time)
}