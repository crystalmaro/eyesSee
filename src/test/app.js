function sum(n1, n2) {
	if (typeof n1 !== 'number' || typeof n2 !== 'number') {
		return null;
	} else {
		return n1 + n2;
	}
}
module.exports = sum;
