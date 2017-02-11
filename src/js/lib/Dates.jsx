function secondsSince(date) {
	return Math.floor((new Date() - date) / 1000);
}

function timeSince(date) {
	var seconds = secondsSince(date);
	var interval;
	/*var interval = Math.floor(seconds / 31536000);
    if (interval > 1) { return new Array(interval, " anys"); }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {new Array(interval, " mesos"); }*/
	interval = Math.floor(seconds / 86400);
	if (interval > 1) { return interval + " days ago"; }
	interval = Math.floor(seconds / 3600);
	if (interval > 1) { return interval + " hours ago"; }
	interval = Math.floor(seconds / 60);
	if (interval > 1) { return interval + " min. ago"; }
	return "Just now";
}

function daysAgo(date) {
	const seconds = secondsSince(date);
	const days = Math.floor(seconds/86400) // seconds in a day
	if(days == 1) return days.toString() + " day";
	return days.toString() + " days";
}

function formatDateLen(elem, length = 2){
	return ("0" + elem).slice(length * -1);
}

function dateMake(dateTime){
	return (dateTime!=0) ? new Date(dateTime*1000): '';
}

function dateFormat(dataMostrar){
	return (dataMostrar!='') ? formatDateLen(dataMostrar.getUTCDate())+"/"+formatDateLen(dataMostrar.getUTCMonth()+1)+"/"+dataMostrar.getUTCFullYear() : '';
}

export default {
	timeSince,
	formatDateLen,
	dateMake,
	dateFormat,
	secondsSince,
	daysAgo,
}