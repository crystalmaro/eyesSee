let sum = require('./app.js');
// test("Test 3 is 3",()=>{
//   expect(3).toBe(3) //確認3是3
// });
// Test Driven Development
test('Test Sum Function', () => {
	expect(sum(3, 4)).toBe(7);
	expect(sum('Hello', 3)).toBeNull();
	expect(sum()).toBeNull();
	expect(sum(null, 10)).toBeNull();
});
