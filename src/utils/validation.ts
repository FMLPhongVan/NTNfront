const azReg = /[a-z]/g;
const AZReg = /[A-Z]/g;
const numReg = /[0-9]/g;
const specReg = /[_!@#$^&.]/g;
const otherReg = /[^a-zA-Z0-9._#@!&^]/g;
const emailReg = /$^|.+@.+..+/g;

function removeAscent(str: string): string {
	if (str === null || str === undefined) {
		return str;
	}
  
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	str = str.replace(/đ/g, "d");
	return str;
}

export function containaz(str: string): boolean {
	return str.length > 0 && str.match(azReg) !== null;
}

export function containAZ(str: string): boolean {
	return str.length > 0 && str.match(AZReg) !== null;
}

export function containNum(str: string): boolean {
	return str.length > 0 && str.match(numReg) !== null;
}

export function containSpec(str: string) : boolean {
	return str.length > 0 && str.match(specReg) !== null;
}

export function containOther(str: string): boolean {
	return str.length > 0 && str.match(otherReg) !== null;
}

export function isValidName(name: string) {
	const re = /^[a-zA-Z]{1,}$/g; 
	return re.test(removeAscent(name));
}

export function isValidEmail(email: string): boolean {
	return email.match(emailReg) !== null ;
}